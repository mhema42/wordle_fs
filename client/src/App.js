import "./App.css";
import CountUp from "react-countup"
import React from "react";
import { useEffect, useState } from "react";
import Select from "react-select";

// import getWord from "./GetWord";
import useToggle from "./Toggle";
import { NavBar } from "./Navbar"

function App() {
  const [correctWord, setWord] = useState("");
  const [guess, setText] = useState("");
  const [chkWord, wordle] = useState("");
  const [name, setName] = useState("");
  const [guesses, setGuess] = useState([]);
  const [guessesResults, SetGuessResult] = useState([]);
  const [wordLength, setWordLength] = useState(5);
  // const correctWord=getWord();

  // timer
  const [startTime,] = useState(new Date());
  const [gameState, setGameState] = useState("playing");
  const [endTime, setEndtime] = useState(null);

  useEffect(() => {
    const getWord = async () => {
      const res = await fetch("/word/" + wordLength);
      const data = await res.json();
      setWord(data.word);
    };

    getWord();
  }, []);

  // Start game
  const [isToggled, toggle] = useToggle(false);
  if (isToggled === true) {

    toggle(false);
  }

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
    const numGuess = guesses.length;
    const wordLength = correctLetters.length;

    async function apiHighscore() {
      await fetch("/result", {
        method: "POST",
        body: JSON.stringify({
          name,
          numGuess,
          duration,
          wordLength,
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
              autoComplete="Fyll i ditt namn"
              placeholder="Namn"
              required
              type="text"
              value={name}
              onChange={(ev) => setName(ev.target.value)}
            />
          </div>
        </form>
      </div>
    )
  }

  <button onClick={toggle} autoFocus >Start game</button>


  const handleChange = e => {
    setWordLength(e.value);
  }

  const options = [
    {
      label: "Four letters",
      value: 4,
    },
    {
      label: "Five letters",
      value: 5,
    },
    {
      label: "Six letters",
      value: 6,
    },
  ];

  // render game
  return (
    <div className="game">
      <div className="wordle">
        <NavBar />
        <h1>Welcome to Wordle</h1>
        <Select options={options}
            value={options.find(obj => obj.value === wordLength)}
            onChange={handleChange}
          />
        <p>{correctWord}</p>
        <CountUp end={1000} duration="1350" />
        <p>try to guess wich word "i´m" thinking of</p>
        <ul>{showGuessResult}</ul>
        <ul>{wordLengthBoxes}</ul>
        <br></br>
        <input className="inputGuess" type="text" value={guess} onChange={onTextChange} title="Your guess" placeholder="Your guess" />
        <button onClick={onClickOk}>OK</button>
        <p>{chkWord}</p>
      </div>
    </div>
  );
}

export default App;