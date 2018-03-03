const express = require('express');
const mongoose = require('mongoose');

const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

mongoose.connect('mongodb://159.89.175.10:27017/stupidtodo-db');

app.listen(7000, function() {
    console.log('the api is listening on port 7000!')
});


const todoPostHandler = require('./routeHandlers/todoPostHandler.js');
const toodDeleteHandle = require('./routeHandlers/todoDeleteHandler.js');
const todoGetHandler = require('./routeHandlers/todoGetHandler.js');

//end point to post a todo item
app.post('/todo', todoPostHandler);
app.delete('/todo/:id', toodDeleteHandle);
app.get('/todos', );