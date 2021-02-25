# OAuth Tutorial

This repo serves as endpoints for my OAuth 2.0 tutorial using Node, Express, TypeScript, and the Spotify API.

## Quick Start

Clone the repo:

```
git clone https://github.com/MatthewConrad/oauth-tutorial.git <DIRNAME>
```

As with other Node projects, once cloned, you will need to run `npm install`. Running `npm run start` will start the server on port 5000. You should see `Hello World!` and a couple of links when visiting `localhost:5000` in your browser.

If you prefer, you can also start the server with `npm run watch`. This will use `nodemon` to watch all .ts and .json files, and restart the server and reload the browser when they change.

## Other branches

The repo has a number of branches that can be used as checkpoints throughout the tutorial:

-   `base`: the starting point for the tutorial, without any OAuth implementation; this is the default branch
-   `authorization`: includes the initial call to the Spotify API and a basic route for the authorization callback
-   `get-tokens`: adds the call to get access and refresh tokens from the API
-   `save-tokens`: adds ability to save tokens in session
-   `web-api`: uses tokens to make call to Spotify Web API
-   `refresh-tokens`: adds ability to refresh expired tokens
