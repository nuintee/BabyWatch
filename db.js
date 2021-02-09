const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

const client = MongoClient.connect('mongodb+srv://nuintee:0117@clusterbabywatcher.lgsjj.mongodb.net',{ useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    
    // let db = client.db('test');
    // let collection = db.collection("COL")
    let db = client.db('BabyChecks');
    let collection = db.collection("Time")


    collection.insertOne(
        { 
            who : "ngoose",
            what : "milk",
            when : "now",
            portion : "11" 
        }
    )

    collection.find().toArray().then(res => {
        console.log(res.pop());
    })

    //client.close();
});