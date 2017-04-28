"use strict";

var mongoose = require('mongoose'),
    config = require('./index');
mongoose.Promise = global.Promise;

// Bootstrap db connection
var db = mongoose.connect(config.db);
mongoose.connection.once('open', function callback() {
    console.log("DB connected " + config.db)
});

mongoose.set('debug', true);

mongoose.connection.on('open', function callback() {
});

mongoose.connection.on('error', function () {
    setTimeout(function () {
        if (mongoose.connection.readyState === 0) {
            db = mongoose.connect(config.db);
        }
    }, 1000);
});

mongoose.connection.on('disconnected', function () {
    setTimeout(function () {
        if (mongoose.connection.readyState === 0) {
            db = mongoose.connect(config.db);
        }
    }, 1000);
});
