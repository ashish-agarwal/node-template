var _ = require("lodash");
var async = require("async");
var moment = require("moment");

var requiresLogin = function(req, res, next) {
	next();
};

exports.requiresLogin = requiresLogin;
