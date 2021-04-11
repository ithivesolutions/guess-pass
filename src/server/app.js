"use strict";

const express = require("express"),
  bodyParser = require("body-parser"),
  app = express()
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }));

module.exports = app;
