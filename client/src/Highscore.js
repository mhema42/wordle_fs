import { useState } from "react";
import NavBar from "./Navbar"

function Highscore() {
    const [highscore, setHighscore] = useState([]);

    const getHighscore = async (letters, unique) => {
        const res = await fetch("/highscore");
        const data = await res.json();
        setHighscore(data.highscore);
      };

    getHighscore();

    console.log(highscore);

    return (
        <>
            <NavBar
                classname="navBar"
            />
        </>
    )
}

export default Highscore;