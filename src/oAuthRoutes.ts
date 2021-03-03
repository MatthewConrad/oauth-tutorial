import { Router } from "express";
import { authorizationUrl, redirectUrl } from "./oAuthConfig";
const oAuthRouter: Router = Router();

oAuthRouter.get("/login", (_req, res) => {
    const scopes: string[] = ["user-library-read", "user-top-read"];

    res.redirect(
        `${authorizationUrl}?response_type=code&client_id=${process.env.OAUTH_CLIENT_ID}` +
            `&scope=${encodeURIComponent(scopes.join(" "))}` +
            `&redirect_uri=${encodeURIComponent(redirectUrl)}`
    );
});

oAuthRouter.get("/callback", (req, res) => {
    if (!req.query.code) {
        res.status(400).send("Client did not send authorization code.");
    }

    const code: string = req.query.code as string;
    res.status(200).send("Got an auth code!");
});

export default oAuthRouter;
