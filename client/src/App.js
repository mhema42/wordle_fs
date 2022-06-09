import "./App.css";
import { useState } from "react";
import Select from "react-select";

import NavBar from "./Navbar"
import Game from "./Game";

function App() {
  const [correctWord, setWord] = useState("");
  const [wordLength, setWordLength] = useState(null);

  const getWord = async (value) => {
    const res = await fetch("/word/" + value);
    const data = await res.json();
    setWord(data.word);
  };

  const handleChange = e => {
    setWordLength(e.value);
    getWord(e.value);
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
          <Game correctWord={correctWord} />
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