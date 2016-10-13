

var _ = require('lodash');
var async = require('async');
var moment = require('moment');
var Promise = require('bluebird');

var User = require('../models/user');

exports.register = function (user) {
    User.findOne({email: user.email}).exec().then(function (user) {
        if (!user) {
            return User.create(user).exec();
        }
        return Promise.reject(new Error("User Exists With Same Email"))
    })
};

exports.authenticate = function (userDetails) {
    return User.findOne({email: userDetails.email}).exec().then(function (user) {
        if (!user) {
            Promise.reject(new Error("User Not Found"))
        }
        if (user.authenticate(userDetails.password)) {
            Promise.resolve(user)
        } else {
            Promise.reject(new Error("Invalid Password"))
        }
    });
};

exports.getProfile = function (user, callback) {
    return User.findOne(user, callback);
};
exports.updateProfile = function (user, callback) {
    User.findOne(user, function (err, user) {

        return user.save(callback)
    });
};
