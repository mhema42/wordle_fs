import express from "express";
import fs from "fs/promises";
// import { getRanWord } from "./getRanWord.js";


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

/* app.get("/ranword", (req, res) => {
    const wordLength = 5;
    const word = getRanWord(wordLength);
    // const word = "hej"
    console.log(word)
  
    res.send(word);
  
    res.json({
      word,
    });
  }); */

app.listen(5080);