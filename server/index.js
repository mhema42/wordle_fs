import express from "express";
import fs from "fs/promises";

import postHighscore from "./src/getPost.js";
import getHighscore from "./src/getPost.js";
// import getRandomWord from "./src/allWords.js";

const app = express();

app.use(express.static("../client/build/"));
app.use(express.json())

app.get("/info", async (req, res) => {
    const filebuf = await fs.readFile("./public/info.html");
    res.type("html");
    res.send(filebuf);
});

app.get("/highscorelist", async (req, res) => {
    /* const filebuf = await fs.readFile("./public/highscore.html");
    res.type("html");
    res.send(filebuf); */
    const highscore =  await getHighscore(req.body);
    console.log(highscore)
    res.status(201).json({ highscore });
});

app.post("/api/highscore", async (req, res) => {
  const highscore =  await postHighscore(req.body);
  res.status(201).json({ highscore });
});

/* app.get("/api/ranword", (req, res) => {
    const word = getRandomWord(4);

    res.send(word);
  
    res.json({
      word,
    });
});

app.get("/*", async (request, response) => {
  try {
      const fileName = request.path;
      console.log(fileName);
      const filebuf = await fs.readFile(`./${fileName}`);
      const type = fileName.split(".")[1];
      response.type(type); 
      response.send(filebuf);
  } catch (err) {
      response.status(404).end();
  }
}); */

app.listen(5080);