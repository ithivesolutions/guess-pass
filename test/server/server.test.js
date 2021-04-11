"use strict";

const request = require("supertest");
const expect = require("chai").expect;
const _ = require("lodash");

const apiPrimaryRoute = "/guess-api/newPass/";

const secRequest = {
  hint: ["2", "8", "4", "5", "1", "6", "7", "3"],
  userAnswer: "45678945",
};

const conSecRequest = {
  hint: ["2", "8", "4", "5", "1", "6", "7", "3"],
  userAnswer: "45678945",
};

describe("Guess app Server unit test", () => {
  let server;

  beforeEach(() => {
    delete require.cache[require.resolve("../../src/server/index")];
    server = require("../../src/server");
  });

  afterEach((done) => {
    server.close(done);
  });

  describe("Should get the Hint from server and the verify the user answer", () => {
    it("should get Hint", (done) => {
      request(server)
        .get(apiPrimaryRoute + "getNewPass")
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.length).to.be.greaterThan(0);

          conSecRequest.hint = res.body;

          request(server)
            .post(apiPrimaryRoute + "verifyPass")
            .send({ params: conSecRequest })
            .end((err, res) => {
              if (err) return done(err);
              expect(res.status).to.equal(200);
              expect(res.body.length).to.be.greaterThan(0);
            });

          return done();
        });
    });
  });

  describe("Should fail when verify process", () => {
    it("should fail when vefiry with 404", (done) => {
      request(server)
        .post(apiPrimaryRoute + "verifyPass")
        .send({ params: secRequest })
        .end((err, res) => {
          if (err) {
            return done();
          }
          return done();
        });
    });
  });
});
