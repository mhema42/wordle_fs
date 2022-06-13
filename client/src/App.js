import "./App.css";
import { useState } from "react";
import Select from "react-select";

import NavBar from "./Navbar"
import Game from "./Game";

function App() {
  const [correctWord, setWord] = useState("");
  const [wordLength, setWordLength] = useState(null);
  const [unique, setUnique] = useState(false);

  const getWord = async (letters, unique) => {
    const res = await fetch("/word/" + letters + "/" + unique);
    const data = await res.json();
    setWord(data.word);
  };

  // handler for unique letters checkbox
  const checkHandler = () => {
    setUnique(!unique)
  }

  // handler for wordlength select
  const handleChange = e => {
    setWordLength(e.value);
    getWord(e.value, unique);
  }

  const options = [
    {
      label: "four letters",
      value: 4,
    },
    {
      label: "five letters",
      value: 5,
    },
    {
      label: "six letters",
      value: 6,
    },
  ];

  const Play = () => {
    if (wordLength !== null) {
      return (
        <>
          <Game correctWord={correctWord} unique={unique} />
        </>
      )
    }
    else {
      return (
        <>
          <h1>Want to play...?</h1>
        </>
      )
    }
  }

  // render game
  return (
    <div className="game">
      <div className="wordle">
        <NavBar />
        <h1>Welcome to Wordle</h1>
        Check box for only unique letters
        <input
          type="checkbox"
          id="checkbox"
          checked={unique}
          onChange={checkHandler}
        />
        <Select options={options}
          value={options.find(obj => obj.value === wordLength)}
          onChange={handleChange}
        />
        <Play />
      </div>
    </div>
  );
}

export default App;