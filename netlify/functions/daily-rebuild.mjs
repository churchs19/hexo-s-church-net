import { createHash } from "node:crypto";
import { getStore } from "@netlify/blobs";

const BUILD_HOOK_ENVIRONMENT_VARIABLE = "NETLIFY_BUILD_HOOK_URL";
const INSTAGRAM_PROXY_BASE_URL_ENVIRONMENT_VARIABLE =
  "INSTAGRAM_PROXY_BASE_URL";
const INSTAGRAM_PROXY_KEY_ENVIRONMENT_VARIABLE = "INSTAGRAM_PROXY_KEY";
const GIST_ID_ENVIRONMENT_VARIABLE = "GIST_ID";
const SNAPSHOT_KEY = "instagram-feed-hash";
const MAX_ITEMS = 12;
const REQUEST_TIMEOUT_MS = 15000;

const getInstagramFeed = async () => {
  const proxyBaseUrl =
    process.env[INSTAGRAM_PROXY_BASE_URL_ENVIRONMENT_VARIABLE];
  const proxyKey = process.env[INSTAGRAM_PROXY_KEY_ENVIRONMENT_VARIABLE];
  const gistId = process.env[GIST_ID_ENVIRONMENT_VARIABLE];

  if (!proxyBaseUrl || !proxyKey || !gistId) {
    throw new Error(
      `${INSTAGRAM_PROXY_BASE_URL_ENVIRONMENT_VARIABLE}, ${INSTAGRAM_PROXY_KEY_ENVIRONMENT_VARIABLE} and ${GIST_ID_ENVIRONMENT_VARIABLE} must be set`,
    );
  }

  const response = await fetch(`${proxyBaseUrl}.netlify/functions/feed`, {
    headers: {
      Accept: "application/json",
      "x-api-key": proxyKey,
      "x-gist-id": gistId,
    },
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  });
  const body = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      `Instagram proxy returned HTTP ${response.status}: ${body?.errorMessage ?? "no error message"}`,
    );
  }

  if (!Array.isArray(body)) {
    throw new Error("Instagram proxy response was not an array");
  }

  return body.slice(0, MAX_ITEMS);
};

const hashInstagramFeed = (feed) =>
  createHash("sha256").update(JSON.stringify(feed)).digest("hex");

export const handler = async () => {
  const buildHookUrl = process.env[BUILD_HOOK_ENVIRONMENT_VARIABLE];

  if (!buildHookUrl) {
    console.error(`Missing ${BUILD_HOOK_ENVIRONMENT_VARIABLE}`);
    return {
      statusCode: 500,
      body: "Netlify Build Hook URL is not configured",
    };
  }

  try {
    const instagramFeed = await getInstagramFeed();
    const currentHash = hashInstagramFeed(instagramFeed);
    const snapshotStore = getStore("daily-rebuild");
    const previousHash = await snapshotStore.get(SNAPSHOT_KEY);

    if (previousHash === currentHash) {
      console.log("Instagram data is unchanged; skipping Netlify rebuild");
      return {
        statusCode: 200,
        body: "Instagram data is unchanged; rebuild skipped",
      };
    }

    const response = await fetch(buildHookUrl, {
      method: "POST",
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });

    if (!response.ok) {
      console.error(`Build Hook returned HTTP ${response.status}`);
      return {
        statusCode: 502,
        body: "Netlify Build Hook request failed",
      };
    }

    await snapshotStore.set(SNAPSHOT_KEY, currentHash);
    console.log(`Netlify rebuild triggered with HTTP ${response.status}`);
    return {
      statusCode: 202,
      body: "Netlify rebuild triggered",
    };
  } catch (error) {
    console.error(
      `Unable to check Instagram data or trigger rebuild: ${error.message}`,
    );
    return {
      statusCode: 502,
      body: "Unable to trigger Netlify rebuild",
    };
  }
};
