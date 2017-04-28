'use strict';

var config = require('../../config/'),

    // Crypto Module
    crypto = require('crypto'),

    // Secret Keys
    cryptokey = config.CRYPTOKEY;

module.exports = {

    encrypt: function (payload) {
        var cipher = crypto.createCipher('aes-256-ctr', cryptokey)
        var crypted = cipher.update(payload.toString(), 'utf8', 'hex')
        crypted += cipher.final('hex');
        return crypted;
    },

    decrypt: function (text) {
        var decipher = crypto.createDecipher('aes-256-ctr', cryptokey)
        var dec = decipher.update(text, 'hex', 'utf8')
        dec += decipher.final('utf8');
        return dec;
    }
}
