import express from "express";
import fs from "fs/promises";

const app = express();

app.get("/", async (req, res) => {
    const filebuf = await fs.readFile("./public/index.html");
    res.type("html");
    res.send(filebuf);
});

app.get("/wordle", async (req, res) => {
    const filebuf = await fs.readFile("../client/build/index.html");
    res.type("html");
    res.send(filebuf);
});

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

app.get("/*", async (req, res) => {
    try {
        const fileName = req.path;
        console.log(fileName);
        const filebuf = await fs.readFile(`./src/${fileName}`);
        const type = fileName.split(".")[1];
        res.type(type); 
        res.send(filebuf);
    } catch (err) {
        res.status(404).end();
    }
});

app.listen(5080);