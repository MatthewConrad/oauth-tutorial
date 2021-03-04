import { Router } from "express";
import { apiTokenUrl, authorizationUrl, redirectUrl } from "./oAuthConfig";
import fetch from "node-fetch";
const oAuthRouter: Router = Router();

oAuthRouter.get("/login", (_req, res) => {
    const scopes: string[] = ["user-library-read", "user-top-read"];

    res.redirect(
        `${authorizationUrl}?response_type=code&client_id=${process.env.OAUTH_CLIENT_ID}` +
            `&scope=${encodeURIComponent(scopes.join(" "))}` +
            `&redirect_uri=${encodeURIComponent(redirectUrl)}`
    );
});

oAuthRouter.get("/callback", async (req, res) => {
    if (!req.query.code) {
        res.status(400).send("Client did not send authorization code.");
    }

    const code: string = req.query.code as string;
    const authorization: string = Buffer.from(
        `${process.env.OAUTH_CLIENT_ID}:${process.env.OAUTH_CLIENT_SECRET}`
    ).toString("base64");
    const authBody: URLSearchParams = new URLSearchParams({
        grant_type: "authorization_code",
        code: code,
        redirect_uri: redirectUrl,
    });

    await fetch(apiTokenUrl, {
        method: "POST",
        headers: {
            Authorization: `Basic ${authorization}`,
            "content-type": "application/x-www-form-urlencoded",
        },
        body: authBody,
    })
        .then((response) => {
            if (!response.ok) throw new Error("Failed to retrieve auth token.");
            return response.json();
        })
        .then((response) => {
            if (!response.access_token) throw new Error("Authorization was successful but no token was given.");
            // tokens will be handled here
            res.redirect("/"); // we could redirect elsewhere, but this is enough to tell us our token request was successful
        })
        .catch((error) => {
            res.status(500).send(error.toString());
        });
});

export default oAuthRouter;
