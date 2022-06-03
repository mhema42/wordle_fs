<form onSubmit={submitHighscore}>
        <div className={classes.partial}>
          <input
            className={classes.name}
            autoComplete="Fyll i ditt namn"
            placeholder="Namn"
            required
            type="text"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
          />
        </div>
</form>

function submitHighscore(ev) {
    apiHighscore();
}

async function apiHighscore() {
    await fetch("/api/highscore", {
        method: "POST",
        body: JSON.stringify({
            name,
            rating,
            comment: review,
            movieId: props.movieId,
            date: new Date(),
        }),
        headers: {
            "Content-Type": "application/json"
        }
    })
}

app.post("/api/highscore", async (req, res) => {
    const highscore = await postHighscore(req.body);
    res.status(201).json({ highscore });
});

export default async function handler(req, res) {
    if (req.method === "POST") {
        const data = req.body;
        await postHighscore(data);
        return res.status(200).json("Highscore inskickad");
    } else {
        return res.status(405)
    }
}

export async function postHighscore(data) {
    const client = await MongoClient.connect("mongodb+srv://mhema:W3oLvtX4YP8zHqHl@cluster0.xrrbw.mongodb.net/Kino_movie_DB?retryWrites=true&w=majority");
    const db = client.db();
    const highscoreCollection = db.collection("highscore");
    const results = await highscoreCollection.insertOne(data)

    client.close();

    return results;
}