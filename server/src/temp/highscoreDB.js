import { MongoClient} from "mongodb";

/* iMLUGkTJLnCmNPS8
mf7VBEnIXGTiWHStMUZE2MeVciq12eZZ6wh1yUiT48h0xr2vAWn1dOvO8ir8ym1Q
https://data.mongodb-api.com/app/data-pflgt/endpoint/data/v1
IHpw8CC4hOKJt5dy
mongodb+srv://mats:IHpw8CC4hOKJt5dy@cluster0.88njp.mongodb.net/Wordle_DB?retryWrites=true&w=majority */

export async function postHighscore(data) {
    const client = await MongoClient.connect("mongodb+srv://mats:IHpw8CC4hOKJt5dy@cluster0.88njp.mongodb.net/Wordle_DB?retryWrites=true&w=majority");                                            
    const db = client.db();
    const highscoreCollection = db.collection("Highscore");
    const highscore = await highscoreCollection.insertOne(data);
    client.close();
    return "postHighscore"
}

export async function getHighscore(data) {
    const client = await MongoClient.connect("mongodb+srv://mats:IHpw8CC4hOKJt5dy@cluster0.88njp.mongodb.net/Wordle_DB?retryWrites=true&w=majority");     
    const db = client.db();
    const highscoreCollection = db.collection("Highscore");
    const highscore = await highscoreCollection.find({ highscore: id }).toArray();
    client.close();
    return "getHighscore"
}