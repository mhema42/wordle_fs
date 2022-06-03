import { MongoClient} from "mongodb";

export default async function postHighscore(data) {
    const client = await MongoClient.connect("mongodb+srv://mhema:W3oLvtX4YP8zHqHl@cluster0.xrrbw.mongodb.net/Wordle_DB?retryWrites=true&w=majority");
    const db = client.db();
    const highscoreCollection = db.collection("Highscore");
    const results = await highscoreCollection.insertOne(data)
    client.close();
    return results;
}

export async function getHighscore(data) {
    
    const client = await MongoClient.connect("mongodb+srv://mhema:W3oLvtX4YP8zHqHl@cluster0.xrrbw.mongodb.net/Wordle_DB?retryWrites=true&w=majority");     
    const db = client.db();
    const highscoreCollection = db.collection("Highscore");
    const highscore = await highscoreCollection.find({ highscore: id }).toArray();
    client.close();
    console.log(highscore)
    return highscore;
}