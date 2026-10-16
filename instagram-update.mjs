import fs from "fs";
import moment from "moment";
import fetch from "node-fetch";

const OUTPUT_PATH = "./source/_data/instagram.json";
const MAX_ITEMS = 12;
const TIMEOUT_MS = 15000;

const fetchFeed = async function () {
  const { INSTAGRAM_PROXY_BASE_URL, INSTAGRAM_PROXY_KEY, GIST_ID } =
    process.env;
  if (!INSTAGRAM_PROXY_BASE_URL || !INSTAGRAM_PROXY_KEY || !GIST_ID) {
    throw new Error(
      "INSTAGRAM_PROXY_BASE_URL, INSTAGRAM_PROXY_KEY and GIST_ID must be set",
    );
  }

  const proxyUrl = `${INSTAGRAM_PROXY_BASE_URL}.netlify/functions/feed`;
  console.log(`Proxy URL = ${proxyUrl}`);
  const response = await fetch(proxyUrl, {
    headers: {
      Accept: "application/json",
      "x-api-key": INSTAGRAM_PROXY_KEY,
      "x-gist-id": GIST_ID,
    },
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });

  const body = await response.json().catch(() => null);
  if (!response.ok) {
    throw new Error(
      `Proxy returned ${response.status}: ${body?.errorMessage ?? "no error message"}`,
    );
  }
  if (!Array.isArray(body)) {
    throw new Error("Proxy response was not an array");
  }
  return body.slice(0, MAX_ITEMS);
};

const updateInstagram = async function () {
  let instagramData;
  try {
    instagramData = await fetchFeed();
  } catch (e) {
    // Keep the last good data so a proxy outage doesn't block the site build.
    console.warn(`Instagram update failed: ${e.message}`);
    if (!fs.existsSync(OUTPUT_PATH)) {
      fs.writeFileSync(OUTPUT_PATH, "[]");
      console.warn(`Wrote empty ${OUTPUT_PATH}`);
    } else {
      console.warn(`Keeping existing ${OUTPUT_PATH}`);
    }
    return;
  }

  // Temp file + rename so a failed write can't corrupt the existing data.
  const tempPath = `${OUTPUT_PATH}.tmp`;
  fs.writeFileSync(tempPath, JSON.stringify(instagramData));
  fs.renameSync(tempPath, OUTPUT_PATH);
  console.log(`Wrote ${instagramData.length} items to ${OUTPUT_PATH}`);
};

updateInstagram();
