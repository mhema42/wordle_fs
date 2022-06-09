import { useState } from "react";

function GameWon({endTime, startTime, guesses, wordLength}) {
    const [name, setName] = useState("");

    const [numGuess, setNumGuess] = useState(0);
    const [duration, setDuration] = useState(null);
    
    setDuration(Math.round((endTime - startTime) / 1000));
    setNumGuess(guesses.length);

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
        <form onSubmit={apiHighscore}>
            <div className="correctGuess">
                <p>Your guess was correct, congratulation :)</p>
                <span>Number of guesses: </span> {numGuess}
                <p>Duration: {duration}s</p>
            </div>
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
    )
}

export default GameWon;