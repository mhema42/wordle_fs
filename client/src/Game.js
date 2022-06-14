import CountUp from "react-countup"
import React from "react";
import { useState } from "react";

// import Highscore from "./Highscore"

function Game({ correctWord, unique }) {
  const [guess, setGuess] = useState("");
  const [chkWord, wordle] = useState("");
  const [name, setName] = useState("");
  const [guesses, setGuesses] = useState([]);
  const [guessesResults, SetGuessResult] = useState([]);

  // timer
  const [startTime,] = useState(new Date());
  const [gameState, setGameState] = useState("playing");
  const [endTime, setEndtime] = useState(null);

  // split correctWord to array and add object properties
  let correctLetters = correctWord.split("").map((letter, index) => ({
    ...index,
    letter: letter,
    star: "*",
    color: "boxcolor",
  }));

  //input guessed word
  const checkGuess = ev => {
    ev.preventDefault();
    setGuess("");
    setGuesses([
      ...guesses,
      {
        word: guess,
      },
    ]);

    // check if guess is correct
    if (guess === correctWord) {
      setGameState("correctGuess");
      setEndtime(new Date());
    }
    else {
      wordle("");

      // split guess to array and add object properties
      let letters = guess.split("").map((letter, index) => ({
        ...index,
        letter: letter,
        status: "incorrect",
      }));

      // check if guess contains correct amount of letters
      if (letters.length !== correctLetters.length) {
        wordle("Guess must have " + correctLetters.length + " letters");
      }

      // check if guess contains correct, incorrect or missplaced letters
      else {
        for (let i = 0; i < letters.length; i++) {
          if (letters[i].letter === correctLetters[i].letter) {
            letters[i].status = "correct"
            correctLetters[i].letter = "check"
          };
        };
        letters.forEach(element => {
          for (let j = 0; j < letters.length; j++) {
            if (element.status === "incorrect") {
              if (element.letter === correctLetters[j].letter) {
                element.status = "missplaced"
                correctLetters[j].letter = "check"
              };
            };
          };
        });

        SetGuessResult([
          ...guessesResults,
          {
            guessResult: letters,
          },
        ]);
      };
    }
  };

  const wordLengthBoxes = correctLetters.map((box, xl) => {
    return (
      <span key={xl} className={box.color}>
        {box.star}
      </span>
    )
  })

  const showGuessResult =
    guessesResults.slice(0).reverse().map((nestled, i) => {
      return (
        <li key={i}>
          {nestled.guessResult.map((letter, j) => {
            return (
              <span key={j} className={letter.status}>
                {letter.letter}
              </span>
            )
          })}
        </li>
      )
    });

  //  game is won, render result and POST Highscore
  if (gameState === "correctGuess") {
    const duration = Math.round((endTime - startTime) / 1000);
    const numGuess = guesses.length;
    const wordLength = correctLetters.length;

    async function apiHighscore() {
      await fetch("/result", {
        method: "POST",
        body: JSON.stringify({
          name,
          numGuess,
          guesses,
          duration,
          wordLength,
          unique
        }),
        headers: {
          "Content-Type": "application/json"
        },
      })
    }

    return (
      <div className="correctGuess">
        <p>Your guess was correct, congratulation :)</p>
        <span>Number of guesses: </span> {numGuess}
        <p>Duration: {duration}s</p>
        <form onSubmit={apiHighscore}>
          <div>
            <input
              autoFocus
              className="input"
              onChange={(ev) => setName(ev.target.value)}
              placeholder="Enter name"
              required
              type="text"
              value={name}
            />
          </div>
        </form>
      </div>
    )
  };

  // render game
  return (
    <div className="game">
      <div className="wordle">
        <h2>...yes game on!</h2>
        <p>try to guess wich word "i´m" thinking of</p>
        time...
        <CountUp
          className="countUp"
          end={1000}
          duration="1350"
        />
        sec
        <ul>{showGuessResult}</ul>
        <ul>{wordLengthBoxes}</ul>
        <form onSubmit={checkGuess}>
          <input
            autoFocus
            className="input"
            onChange={(ev) => setGuess(ev.target.value)}
            placeholder="Enter guess"
            required
            type="text"
            value={guess}
            title="Enter guess"
          />
        </form>
        <p>{chkWord}</p>
      </div>
    </div>
  );
}

export default Game;