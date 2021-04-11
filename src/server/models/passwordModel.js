"use strict";

const _ = require("lodash");
const Pass = require("../utiils/pass.json");

const fetchNewPass = async () => {
  const newPassword = await _.sample(Pass.passwords);
  const hint = await _.shuffle(newPassword);

  return { newPassword: newPassword, hint: hint };
};

module.exports.fetchNewPass = fetchNewPass;
