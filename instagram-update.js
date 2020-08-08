const fs = require("fs");
const moment = require("moment");
const fetch = require("node-fetch");

console.log(
  `INSTAGRAM_PROXY_BASE_URL = '${process.env.INSTAGRAM_PROXY_BASE_URL}'`
);
console.log(`INSTAGRAM_PROXY_KEY = '${process.env.INSTAGRAM_PROXY_KEY}'`);
console.log(`GIST_ID = '${process.env.GIST_ID}'`);

const updateInstagram = async function () {
  const proxyUrl = `${process.env.INSTAGRAM_PROXY_BASE_URL}.netlify/functions/feed`;
  console.log(`Proxy URL = ${proxyUrl}`);
  let instagramData = await fetch(proxyUrl, {
    headers: {
      Accept: "application/json",
      "x-api-key": process.env.INSTAGRAM_PROXY_KEY,
      "x-gist-id": process.env.GIST_ID,
    },
  }).then((response) => response.json());

  instagramData = instagramData.slice(0, Math.min(instagramData.length, 12));
  for (var index = 0; index < instagramData.length; index++) {
    try {
      const item = instagramData[index];
      var oembedData = await fetch(
        `https://api.instagram.com/oembed?url=${item.permalink}&omitscript=true`
      ).then((response) => response.json());
      item.embedHtml = oembedData.html;
      item.timestampFormatted = moment(item.timestamp).format("lll");
    } catch (e) {
      console.log(JSON.stringify(item));
      throw e;
    }
  }

  fs.writeFileSync(
    "./source/_data/instagram.json",
    JSON.stringify(instagramData)
  );
};

updateInstagram();