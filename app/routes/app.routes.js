'use strict'

var _ = require('lodash');
var async = require('async');
var moment = require('moment');
var userController = require('../contollers/user.server.controller');
var middlewares = require('../middlewares/authorization');

var app = require('express').Router();

app.get('/', function (req, res) {
    res.send("Welcome to sample-project.")
});


module.exports = app;
