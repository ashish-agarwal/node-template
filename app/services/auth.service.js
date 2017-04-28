/**
 * Created by ashok on 22/08/16.
 */


var _ = require('lodash');
var async = require('async');
var moment = require('moment');
var Promise = require('bluebird');
var jwt = require('jsonwebtoken');
var config = require('../../config');

var User = require('../models/user');
var CryptoService = require('../services/crypto.service');


exports.createToken = function (user) {
    //Create a Token and send the response
    var userDetails = {
        name: user.firstName,
        role: user.role,
        _id: CryptoService.encrypt(user._id)
    };
    var token = jwt.sign(userDetails, config.jwtSecret, {
        expiresIn: config.authExpiry
    });
    // Token.create()
    return token;
};

exports.createRefreshToken = function (user) {
    //Create a Token and send the response
    var userDetails = {
        name: user.name,
        role: user.role,
        _id: CryptoService.encrypt(user._id)
    };
    var refreshToken = jwt.sign(userDetails, config.jwtRefreshSecret, {
        expiresIn: config.refreshExpiry
    });
    // Token.create()
    return refreshToken;
};


exports.verifyToken = function (token) {
    return new Promise(function (resolve, reject) {
        jwt.verify(token, config.jwtSecret, function (err, decoded) {
            if (err) {
                return reject(err)
            }
            decoded._id = CryptoService.decrypt(decoded._id);
            return resolve(decoded);
        });
    })
}

exports.verifyRefreshToken = function (token) {
    return new Promise(function (resolve, reject) {
        jwt.verify(token, config.jwtRefreshSecret, function (err, decoded) {
            if (err) {
                return reject(err)
            }
            decoded._id = CryptoService.decrypt(decoded._id);
            return resolve(decoded);
        });
    })
}
