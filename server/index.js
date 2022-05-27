import express from "express";
import fs from "fs/promises";

const app = express();

app.use(express.static("../client/build/"));

app.get("/info", async (req, res) => {
    const filebuf = await fs.readFile("./public/info.html");
    res.type("html");
    res.send(filebuf);
});

app.get("/highscore", async (req, res) => {
    const filebuf = await fs.readFile("./public/highscore.html");
    res.type("html");
    res.send(filebuf);
});

app.listen(5080);