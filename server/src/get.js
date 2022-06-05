import { MongoClient} from "mongodb";

export default async function getHighscore() {
    const client = await MongoClient.connect("mongodb+srv://mhema:W3oLvtX4YP8zHqHl@cluster0.xrrbw.mongodb.net/Wordle_DB?retryWrites=true&w=majority");     
    const db = client.db();
    const highscoreCollection = db.collection("Highscore");
    const results = await highscoreCollection.find().toArray();
    client.close();
    return results;
};