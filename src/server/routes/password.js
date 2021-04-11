"use strict";

const _ = require("lodash");

const express = require("express");
const newPass = express.Router();
const nodeCache = require("node-cache");

const Constants = require("../utiils/Constants");

const { fetchNewPass } = require("../models/passwordModel");

const memoryStore = new nodeCache({ stdTTL: 100, checkperiod: 120 });

const getNewPass = (req, res) => {
  console.log("Get New Password and its Hint");

  return fetchNewPass()
    .then((response) => {
      memoryStore.set(response.hint.join(), response.newPassword, 100);
      return res.send(response.hint);
    })
    .catch((err) => {
      console.error(Constants.errorMessages.databaseError + "\n", err);
      return res.status(500).send(Constants.errorMessages.databaseError);
    });
};

const verifyPass = async (req, res) => {
  console.log("Verify Password ", req.body.params);

  let { hint, userAnswer } = req.body.params;

  if (!hint || !userAnswer) {
    console.error(Constants.errorMessages.invalidDataSubmission);
    return res.status(400).send(Constants.errorMessages.invalidDataSubmission);
  }

  const verifyProcess = async () => {
    try {
      const fromMemory = await memoryStore.get(hint.join());
      const isCorrect = _.isEqual(fromMemory, userAnswer);
      
      let highlightArray = [];
      [...fromMemory].forEach((element, i) => {
        highlightArray.push(_.isEqual(element, [...userAnswer][i]));
      });

      return { isCorrect, highlightArray, userAnswer: userAnswer };

    } catch (error) {
      throw "404";
    }
  };

  return verifyProcess()
    .then((response) => {
      return res.send(response);
    })
    .catch((err) => {
      if ((err = 404)) {
        console.error(Constants.errorMessages.databaseError + "\n", err);
        return res.status(404).send(Constants.errorMessages.databaseError);
      } else {
        console.error(Constants.errorMessages.databaseError + "\n", err);
        return res.status(500).send(Constants.errorMessages.databaseError);
      }
    });
};

newPass.get("/getNewPass", getNewPass);
newPass.post("/verifyPass", verifyPass);

module.exports = newPass;
