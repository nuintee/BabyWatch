const express = require('express');
const exec = require('child_process').exec;
const mongodb = require('mongodb')
const app = express();
const server = require('http').Server(app)
const io = require('socket.io')(server)
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000

process.env.TZ = 'Asia/Tokyo';

const moment = require('moment-timezone');

const MongoClient = mongodb.MongoClient
//const url = 'mongodb+srv://nuintee:0117@clusterbabywatcher.lgsjj.mongodb.net'
const url = 'mongodb://127.0.0.1:27017/'
//const dbName = 'BabyChecks'
const dbName = 'dev'

const client = new MongoClient(url,{ useNewUrlParser: true })

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set("view engine","ejs")

// app.all('/', function(req,res){
//     const db = client.db(dbName)
//     const collection = db.collection('Time');
//     collection.find({}).toArray(function(err, doc){
//         res.render("index",{data : doc})
//     })
// })

app.all('/', function(req,res){
        const db = client.db(dbName)
        const collection = db.collection('devTime');
        collection.find({}).toArray(function(err, doc){
            if (err){
                console.log('failed! with' + err)
                return
            }
            else{
                res.render("index",{data : doc})
            }
        })
})

app.post('/api/upd',function(req,res){
    console.log(req.body.updated-submit)
    res.redirect('/')
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
    const collection = db.collection('devTime');
    collection.insertOne({
        who,
        when,
        what,
        portion
    }).then(reason => {
        res.redirect('/')
    });
})

io.on('connection',(socket) => {
    console.log('connected to io')
    socket.on('updated',(msg) => {
        io.emit('reload page',msg)
    })
})

client.connect(function(err){
    if (err){
        console.log(err);
    }
    else{
        console.log('connected to mongodb')
        server.listen(PORT, () => console.log(`Listening On ${ PORT }`))
    }
})
