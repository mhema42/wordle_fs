import { MongoClient} from "mongodb";

// connect to mongoDB and INSERT game result in highscore collection
export default async function postHighscore(data) {
    const client = await MongoClient.connect("mongodb+srv://mhema:W3oLvtX4YP8zHqHl@cluster0.xrrbw.mongodb.net/Wordle_DB?retryWrites=true&w=majority");
    const db = client.db();
    const highscoreCollection = db.collection("Highscore");
    const results = await highscoreCollection.insertOne(data)
    client.close();

    return results;
};