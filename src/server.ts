import express from "express";
import dotenv from "dotenv";
import oAuthRouter from "./oAuthRoutes";

dotenv.config();
const port: number = process.env.PORT ? parseInt(process.env.PORT) : 3000;

const app: express.Application = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("build"));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", `http://localhost:${port}`);
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers");
    next();
});

app.use(oAuthRouter);

if (process.env.ENV === "local") {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const reload = require("reload");
    reload(app)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
        .then((reloadReturned: any) => {
            app.listen(port, () => {
                console.log(`Server started on port ${port}.`);
            });
        })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .catch((err: any) => {
            console.error("Reload could not start, could not start server/sample app", err);
        });
} else {
    app.listen(port, () => {
        console.log(`Server started on port ${port}.`);
    });
}
