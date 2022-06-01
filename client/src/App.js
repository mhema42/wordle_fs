import { useState } from "react";
import "./App.css";
import React from "react";

import getWord from "./getWord";
import useToggle from "./toggle";
import CountUp from "react-countup"

function App() {
  const [correctWord, setWord] = useState("");
  const [guess, setText] = useState("");
  const [chkWord, wordle] = useState("");
  const [guesses, setGuess] = useState([]);
  const [guessesResults, SetGuessResult] = useState([]);

    // Start game
  const [isToggled, toggle] = useToggle(false);
  if (isToggled === true) {
    setWord(getWord());
    toggle(false);
  }
  
  // timer
  const [startTime] = useState(new Date());
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
  const onTextChange = (event) => {
    setText(event.target.value.toLowerCase());
  };

  const onClickOk = () => {
    setText("");
    setGuess([
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
        wordle("your guess must contain " + correctLetters.length + " letters");
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

  // set gamestate correctGuess/done and render result
  if (gameState === "correctGuess") {
    const duration = Math.round((endTime - startTime) / 1000);
    return (
      <div className="correctGuess">
        <p>Your guess was correct, congratulation :)</p>
        <span>Number of guesses: </span> {guesses.length}
        <p>Duration: {duration}s</p>
      </div>
    )
  } else if (gameState === "done") {
    return (
      <div className="done">
        <h1>You have finished the Game</h1>
      </div>
    );
  }

  // render game
  return (
    <div className="game">
      <div className="wordle">

        <h1>Welcome to Wordle</h1>
        <button onClick={toggle} autoFocus >Start game</button>
        <p>{correctWord}</p>
        <CountUp end={1000} duration="1250"/>
        <p>try to guess wich word "i´m" thinking of</p>
        <ul>{showGuessResult}</ul>
        <ul>{wordLengthBoxes}</ul>
        <br></br>
        <input className="inputGuess" type="text" value={guess} onChange={onTextChange} title="Your guess" placeholder="Your guess"/>
        <button onClick={onClickOk}>OK</button>
        <p>{chkWord}</p>
      </div>
    </div>
  );
}

export default App;