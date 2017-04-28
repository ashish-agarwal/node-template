"use strict";

var app = require("express").Router();

app.get("/", function(req, res) {
	req.flash("info", "Welcome");
	res.send("Welcome to sample-pro1ject.");
});

module.exports = app;
