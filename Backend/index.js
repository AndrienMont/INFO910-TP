var express = require('express');
var app = express();
var http = require('http').Server(app);

http.listen(3000, function(){
    console.log('Server started');
});

app.get('/', function(req, res){
    res.send('Hello World');
});