# s-church.net

This repository contains the source for [s-church.net](https://www.s-church.net), Shane Church's personal website. It is a static site generated with [Hexo](https://hexo.io/) and hosted on Netlify.

## Prerequisites

- Node.js and npm

## Install

Clone the repository, then install the dependencies:

```sh
npm install
```

## Develop locally

Start Hexo's development server:

```sh
npm run serve
```

The site is available at <http://localhost:4000>. This command refreshes the Instagram data first. The refresh uses the existing cached data, or an empty data file on a fresh checkout, if the feed cannot be updated.

To refresh the Instagram data by itself, run:

```sh
npm run instagram
```

The refresh script can use these environment variables when access to the feed proxy is available:

- `INSTAGRAM_PROXY_BASE_URL`
- `INSTAGRAM_PROXY_KEY`
- `GIST_ID`

Posts are stored in `source/_posts/`. Other pages and static assets live under `source/`. The custom Hexo theme is in `themes/shane/`.

## Build

Generate the production site into `public/`:

```sh
npm run build
```

The generated `public/` directory is ignored by Git. Netlify uses the same build command and publishes that directory.

## Daily rebuild

The `daily-rebuild` Netlify Function runs at midnight UTC each day. It fetches the latest Instagram data, hashes the first 12 items, and compares that hash with the previous successful run stored in Netlify Blobs. A Netlify build is triggered only when the Instagram data has changed. The first successful run triggers a build and creates the initial snapshot.

To configure it in Netlify:

1. Open **Site configuration > Build & deploy > Continuous deployment > Build hooks**.
2. Create a build hook for the production branch.
3. Add the generated URL as the `NETLIFY_BUILD_HOOK_URL` environment variable under **Site configuration > Environment variables**.
4. Ensure these existing Instagram feed variables are also configured for the function:
    - `INSTAGRAM_PROXY_BASE_URL`
    - `INSTAGRAM_PROXY_KEY`
    - `GIST_ID`

The Build Hook URL and Instagram proxy key are secrets and must not be committed to the repository. If the Instagram feed cannot be checked, or the Build Hook fails, the previous snapshot is retained so a later run can retry. Function execution messages are available in the Netlify Functions logs, and triggered builds appear in the site's Deploys page.
