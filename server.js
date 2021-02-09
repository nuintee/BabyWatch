const express = require('express');
const ss = require('./index.js')

const app = express();

app.set("view engine","ejs")

app.get('/', function(req,res){
    res.render("landing");
})

app.all('/api/:who/:when/:what/:how', function(req,res){
    ss.getSheetRequest(
        req.params.who,
        req.params.when,
        req.params.what,
        req.params.how
    );
    res.json({
        message:"Hello,world"
    });
})

app.listen(3000, () => console.log('Listening On 3000'))

