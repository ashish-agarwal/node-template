'use strict';

var app = require('express').Router();

app.get('/', function (req, res) {
    res.send("Welcome to sample-project.");
});


module.exports = app;
