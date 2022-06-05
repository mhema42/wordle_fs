import express from "express";
import fs from "fs/promises";

import getHighscore from "./src/get.js";
import postHighscore from "./src/post.js";

const app = express();

app.use(express.json())
app.use(express.static("../client/build/"));

app.get("/info", async (req, res) => {
    const filebuf = await fs.readFile("./public/info.html");
    res.type("html");
    res.send(filebuf);
});

app.get("/highscore", async (req, res) => {
    const highscore =  await getHighscore(res.body);
    res.status(201).json({ highscore });
});

app.post("/result", async (req, res) => {
    const highscore =  await postHighscore(req.body);
});

/* app.get("/api/ranword", (req, res) => {
    const word = getRandomWord(4);

    res.send(word);
  
    res.json({
      word,
    });
}); */

app.listen(5080);