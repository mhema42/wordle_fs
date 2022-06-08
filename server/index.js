import express from "express";
import fs from "fs/promises";

import getHighscore from "./src/get.js";
import postHighscore from "./src/post.js";
import { getWord } from "./src/word.js";

const app = express();

app.use(express.json())
app.use(express.static("../client/build/"));

app.get("/info", async (req, res) => {
  const filebuf = await fs.readFile("./public/info.html");
  res.type("html");
  res.send(filebuf);
});

app.get("/word/*", async (req, res) => {
    const fileName = req.path;
    const number = fileName.split("/")[2];
    const filebuf = await fs.readFile("./public/allwords.json");
    const word = getWord(JSON.parse(filebuf), number);
    res.status(201).json({ word });
});

app.post("/result", async (req, res) => {
  const highscore =  await postHighscore(req.body);
});

app.get("/highscore", async (req, res) => {
    const highscore =  await getHighscore(res.body);
    res.status(201).json({ highscore });
});

app.listen(5080);