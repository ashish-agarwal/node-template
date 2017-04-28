"use strict";

var crypto = require("crypto"), _ = require("lodash"), mongoose = require("mongoose"), Schema = mongoose.Schema;

var uniqueValidator = require("mongoose-unique-validator");

var UserSchema = new Schema(
	{
		code: String,
		firstName: {
			type: String,
			trim: true,
			required: true
		},
		lastName: {
			type: String,
			trim: true
		},
		email: {
			type: String,
			unique: true,
			required: [true, "Email is required!"],
			trim: true,
			validate: {
				validator(email) {
					const emailRegex = /^[-a-z0-9%S_+]+(\.[-a-z0-9%S_+]+)*@(?:[a-z0-9-]{1,63}\.){1,125}[a-z]{2,63}$/i;
					return emailRegex.test(email);
				},
				message: "{VALUE} is not a valid email!"
			}
		},
		phone: String,
		profilePicture: String,
		role: String,
		deleted: {
			type: Boolean,
			default: false
		},
		cards: [],
		address: {
			city: String,
			state: String,
			zipcode: String
		},
		hashed_password: String,
		salt: String,
		disabled: {
			type: Boolean,
			default: false
		},
		disabled_on: Date,
		flags: {}
	},
	{
		timestamps: true
	}
);

UserSchema.plugin(uniqueValidator, {
	message: "{VALUE} already taken!"
});

UserSchema.virtual("password")
	.set(function(password) {
		this._password = String(password);
		this.salt = this.makeSalt();
		this.hashed_password = this.encryptPassword(this._password);
	})
	.get(function() {
		return this._password;
	});

UserSchema.methods = {
	authenticate: function(plainText) {
		return this.encryptPassword(plainText) === this.hashed_password;
	},

	makeSalt: function() {
		return crypto.randomBytes(16).toString("base64");
	},

	encryptPassword: function(password) {
		if (!password || !this.salt) return "";
		var salt = new Buffer(this.salt, "base64");
		return crypto.pbkdf2Sync(password, salt, 10000, 64).toString("base64");
	}
};

module.exports = mongoose.model("User", UserSchema);
