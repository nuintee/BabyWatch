const express = require('express');
const ss = require('./index.js')

const app = express();

app.set("view engine","ejs")

app.get('/', function(req,res){
    res.render("landing");
})

app.all('/api/:who/:what/:when/:how', function(req,res){
    ss.getSheetRequest(
        req.params.who,
        req.params.what,
        req.params.when,
        req.params.whow
    );
    res.json({
        message:"Hello,world"
    });
})

app.listen(3000, () => console.log('Listening On 3000'))

