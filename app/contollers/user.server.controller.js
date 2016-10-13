
var _ = require('lodash');
var async = require('async');
var moment = require('moment');

var UserService = require('../services/user.server.service');

exports.registerUser = function (req, res, next) {
    var userObj = {
        "firstName": req.body.firstName,
        "lastName": req.body.lastName,
        "email": req.body.email,
        "phone": req.body.phone,
        "password": req.body.password,
        "profilePicture": req.body.profilePicture,
    };

    UserService.register(userObj).then(function (user) {
        //emailService.sendVerificationEmail(user);
        res.send(user);
    })
};

exports.authenticate = function (req, res, next) {
    var userObj = req.body;
    UserService.authenticate(userObj)
        .then(AuthService.authenticateUser)
        .then(function (result) {
            res.send(result)
        })
};

exports.getProfile = function (req, res, next) {
    var userObj = req.body;
    UserService.getProfile(userObj).then(function (user) {
        res.send(user);
    })
};

exports.updateProfile = function (req, res, next) {
    var userObj = req.body;
    UserService.updateProfile(userObj).then(function (user) {
        res.send(user);
    })
};

exports.updateProfile = function (req, res, next) {
    res.send(200)
};

exports.logout = function (req, res, next) {
    res.send(200)
};

exports.resetPassword = function (req, res, next) {
    res.send(200)
};

exports.verifyUser = function (req, res, next) {
    res.send(200)
};

exports.getAllUsers = function (req, res, next) {
    res.send(200)
};

exports.getUser = function (req, res, next) {
    res.send(200)
};

exports.forgotPassword = function (req, res, next) {
    res.send(200)
};
