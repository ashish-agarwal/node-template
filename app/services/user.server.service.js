var _ = require('lodash');
var async = require('async');
var moment = require('moment');
var Promise = require('bluebird');

var User = require('../models/user');

exports.register = function (userObject) {
    return User.findOne({
        email: userObject.email
    }).then(function (user) {
        if (!user) {
            return User.create(userObject);
        }
        return Promise.reject(new Error("User Exists With Same Email"))
    })
};

exports.authenticate = function (userDetails, deviceToken) {
    return User.findOne({
        email: userDetails.email
    }).then(function (user) {
        if (!user) {
            return Promise.reject(new Error("User Not Found"))
        }
        if (user.authenticate(userDetails.password)) {
            if (deviceToken) {
                user.devicetokens.push(deviceToken);
            }
            return user;
        } else {
            return Promise.reject(new Error("Invalid Password"))
        }
    });
};

exports.getProfile = function (user, callback) {
    return User.findOne(user, callback);
};
exports.updateProfile = function (id, user) {
    return User.findOneAndUpdate({
        _id: id,
        deleted: false
    }, user, {
        runValidators: true,
        new: true
    })
};

exports.getUsers = function (query) {
    return User.find(query);
}

exports.getUserById = function (id) {
    return User.findById(id);
}

exports.logout = function (userId, deviceToken) {
    if (deviceToken) {
        return User.findById(userId)
            .then(function (user) {
                user.devicetokens.pull(deviceToken)
                return user.save();
            }).catch(function (err) {
                return Promise.reject(err);
            })
    } else {
        return Promise.resolve({
            result: true
        });
    }
}
