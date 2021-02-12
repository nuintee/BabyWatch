const express = require('express');
const mongodb = require('mongodb')
//const ss = require('./index.js')
//const mdb = require('./db.js')
const app = express();

const MongoClient = mongodb.MongoClient
const url = 'mongodb+srv://nuintee:0117@clusterbabywatcher.lgsjj.mongodb.net'
const dbName = 'BabyChecks'

const client = new MongoClient(url)

app.set("view engine","ejs")

app.all('/', function(req,res){
    const db = client.db(dbName)
    const collection = db.collection('Time');
    collection.find({}).toArray(function(err, doc){
        res.render("landing",{data : doc})
    })
})

app.all('/api/:who/:when/:what/:how', function(req,res){
    const who = req.params.who
    const when = req.params.when
    const what = req.params.what
    const how = req.params.how
    const db = client.db(dbName)
    const collection = db.collection('Time');
    collection.insertOne({
        who,
        when,
        what,
        how
    }).then(reason => {
        res.redirect("/");
    });
})

client.connect(function(err){
    if (err){
        console.log(err);
    }
    else{
        console.log('connected to mongodb')
        app.listen(3000, () => console.log('Listening On 3000'))
    }
})



