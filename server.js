const express = require('express');
const mongodb = require('mongodb')
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000
const moment = require('moment');

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
        res.render("landing",{data : doc})
    })
})

app.post('/api',function(req,res){
    //Date
    let dateTime = new Date();
    // +9 hours to make it utc
    dateTime.setTime(dateTime.getTime() + 1000 * 60 * 60 * 9)
    let month = dateTime.getMonth();
    let date = dateTime.getDate();
    let hour = dateTime.getHours();
    let minutes = dateTime.getMinutes();
    let time = `${month} / ${date} ${hour}:${minutes}`

    //console.log(moment().utc(), moment())

    //console.log(req)
    const who = req.body.who;
    const what = req.body.what;
    const when = time;
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



