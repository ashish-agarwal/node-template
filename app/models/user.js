'use strict';

var crypto = require('crypto'),
    _ = require('lodash'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
    date: Date,
    code: String,
    name: String,
    email: String,
    phone: String,
    profilePicture: String,
    role: String,
    deleted: Boolean,
    cards: [],
    address: {
        city: String,
        state: String,
        zipcode: String
    },
    hashed_password: String,
    salt: String,
    disabled: Boolean,
    disabled_on: Date,
    flags: {},
});

UserSchema.virtual('password').set(function (password) {
    this._password = String(password);
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(this._password);
}).get(function () {
    return this._password;
});

UserSchema.methods = {
    authenticate: function (plainText) {
        return this.encryptPassword(plainText) === this.hashed_password;
    },

    makeSalt: function () {
        return crypto.randomBytes(16).toString('base64');
    },

    encryptPassword: function (password) {
        if (!password || !this.salt) return '';
        var salt = new Buffer(this.salt, 'base64');
        return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
    },

};

module.exports = mongoose.model('User', UserSchema);
