const express = require('express');
const mongoose = require('mongoose');
const config = require('../config.js');

const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    next();
});

mongoose.connect(config.mongoUrl);

app.listen(7000, function() {
    console.log('the api is listening on port 7000!')
});


const todoPostHandler = require('./routeHandlers/todoPostHandler.js');
const todoDeleteHandler = require('./routeHandlers/todoDeleteHandler.js');
const todoGetHandler = require('./routeHandlers/todoGetHandler.js');

//end point to post a todo item
app.post('/todo', todoPostHandler);
app.delete('/todo/:id', todoDeleteHandler);
app.get('/todos', todoGetHandler);