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
    // app.post('/register', userController.registerUser);
    // app.post('/login', userController.authenticate);
    //
    // app.get('/logout', userController.logout);
    //
    // app.post('/reset-password', userController.resetPassword);
    // app.post('/forgot-password', userController.forgotPassword);
    //
    //
    // app.post('/profile', middlewares.requiresLogin, userController.updateProfile);
    // app.get('/profile', middlewares.requiresLogin, userController.getProfile);
    // app.get('/verify/:verificationCode', userController.verifyUser);
    //
    //
    // app.get('/users', middlewares.requiresLogin, userController.getAllUsers);
    // app.get('/user/:id', middlewares.requiresLogin, userController.getUser);

module.exports = app;
