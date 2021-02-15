const express = require('express');
const mongodb = require('mongodb')
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000

process.env.TZ = 'Asia/Tokyo';

const moment = require('moment-timezone');

const MongoClient = mongodb.MongoClient
const url = 'mongodb+srv://nuintee:0117@clusterbabywatcher.lgsjj.mongodb.net'
const dbName = 'BabyChecks'

const client = new MongoClient(url)

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set("view engine","ejs")

app.all('/', function(req,res){
    const db = client.db(dbName)
    const collection = db.collection('Time');
    collection.find({}).toArray(function(err, doc){
        res.render("index",{data : doc})
    })
})

app.post('/api',function(req,res){
    //Date
    let dateTime = moment();
    dateTime.tz('Asia/Tokyo')
    //時差分足す
    dateTime.add(9,"hours")

    let month = dateTime.month();
    let date = dateTime.date();
    let hour = dateTime.hours();
    let minutes = dateTime.minutes();
    //let time = `${month}/${date} ${hour}:${minutes}`


    const who = req.body.who;
    const what = req.body.what;
    const when = dateTime.toISOString();
    const portion = req.body.portion;
    const db = client.db(dbName)
    const collection = db.collection('Time');
    collection.insertOne({
        who,
        when,
        what,
        portion
    }).then(reason => {
        res.redirect('/')
    });
})

client.connect(function(err){
    if (err){
        console.log(err);
    }
    else{
        console.log('connected to mongodb')
        app.listen(PORT, () => console.log(`Listening On ${ PORT }`))
    }
})



