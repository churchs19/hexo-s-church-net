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
