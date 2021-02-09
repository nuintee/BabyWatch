const express = require('express');

const app = express();

app.set("view engine","ejs")

app.get('/', function(req,res){
    res.render("landing");
})

app.all('/api', function(req,res){
    res.json({
        message:"Hello,world"
    });
})

app.listen(3000, () => console.log('Listening On 3000'))

