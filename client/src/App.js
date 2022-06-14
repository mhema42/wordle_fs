import { useState } from "react";
import Select from "react-select";

import NavBar from "./Navbar"
import Game from "./Game";
import Highscore from "./Highscore";

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
  const selectHandler = e => {
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

  const styles = {
    fontSize: 14,
    color: 'red',
  }

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
        <div>
          <h2>...ready to play?</h2>
          <div className="check">
            <input
              checked={unique}
              className="checkbox"
              onChange={checkHandler}
              title="Unique letters"
              type="checkbox"
            />
            - only unique letters
          </div>
          <Select
            autoFocus
            className="select"
            placeholder="select length of word"
            onChange={selectHandler}
            options={options}
            style={styles.select}
            title="select length of word"
            value={options.find(obj => obj.value === wordLength)}
          />
        </div>
      )
    }
  }

  // render game
  return (
    <div className="game">
      <div className="wordle">
        <NavBar className="navBar" />
        <h1>Welcome to Wordle</h1>
        <Play className="play" />
      </div>
    </div>
  );
}

export default App;