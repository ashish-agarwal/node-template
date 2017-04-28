var _ = require('lodash');
var async = require('async');
var moment = require('moment');

var UserService = require('../services/user.server.service');
var AuthService = require('../services/auth.service');

exports.registerUser = function (req, res, next) {
    var userObj = {
        "firstName": req.body.firstName,
        "lastName": req.body.lastName,
        "email": req.body.email,
        "password": req.body.password,
        "profilePicture": req.body.profilePicture,
    };
    if (req.file) {
        userObj.profilePicture = req.file.location;
    }
    UserService.register(userObj)
        .then(function (user) {

            res.send(user);
        }).catch(function (err) {
            return res.status(400).send({
                success: false,
                result: {
                    error: err.message
                }
            })
        })
};

exports.authenticate = function (req, res, next) {
    var userObj = req.body;
    UserService.authenticate(userObj, req.body.devicetoken)
        .then(function (user) {
            var tokens = {};
            tokens.authToken = AuthService.createToken(user);
            tokens.refreshToken = AuthService.createRefreshToken(user);
            res.send({
                sucess: true,
                result: user,
                tokens: tokens
            })
        }).catch(function (err) {
            return res.status(400).send({
                success: false,
                result: {
                    error: err.message
                }
            })
        })
};

exports.getProfile = function (req, res, next) {
    var userObj = req.body;
    UserService.getProfile(userObj).then(function (user) {
        res.send(user);
    }).catch(function (err) {
        return res.status(400).send({
            success: false,
            result: {
                error: err.message
            }
        })
    })
};

exports.updateProfile = function (req, res, next) {
    var userObj = req.body;
    UserService.updateProfile(userObj).then(function (user) {
        res.send(user);
    }).catch(function (err) {
        return res.status(400).send({
            success: false,
            result: {
                error: err.message
            }
        })
    })
};

exports.updateProfile = function (req, res, next) {
    res.send(200)
};

exports.logout = function (req, res, next) {
    UserService.logout(req.user._id, req.body.deviceToken)
        .then(function (user) {
            console.log({
                success: true,
                result: {
                    message: "Logged out successfully"

                }
            });

        }).catch(function (err) {
            console.log(err)
            return res.status(400).send({
                success: false,
                result: {
                    error: err.message
                }
            })

        })
    res.send(200)
};

exports.resetPassword = function (req, res, next) {
    res.send(200)
};

exports.verifyUser = function (req, res, next) {
    res.send(200)
};

exports.getAllUsers = function (req, res, next) {
    UserService.getUsers({})
        .then(function (users) {
            return res.send({
                result: users
            })
        })
};

exports.getUser = function (req, res, next) {
    UserService.getUsers({
            _id: req.params.id
        })
        .then(function (users) {
            return res.send({
                result: users[0]
            })
        })
};


exports.updateUser = function (req, res, next) {
    if (req.file) {
        req.body.profilePicture = req.file.location;
    }
    UserService.updateProfile(req.params.id, req.body)
        .then(function (user) {
            return res.send({
                result: user
            })
        })
};

exports.forgotPassword = function (req, res, next) {
    res.send(200)
};
