"use strict";
/*
This is for testing locally. (resolves CORS issue)
*/
// require("dotenv").config();
const express = require("express"),
  bodyParser = require("body-parser"),
  app = express()
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }));

// Allow CORS on Express
app.use( (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Expose-Headers", "x-suggested-filename");
  next();
});

module.exports = app;
