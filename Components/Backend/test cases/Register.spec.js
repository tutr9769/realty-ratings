// Imports the validate.js file to be tested.
const server = require("../index");
// Assertion (Test Driven Development) and Should,  Expect(Behaviour driven 
// development) library
const chai = require("chai");
// Chai HTTP provides an interface for live integration testing of the API's.
const chaiHttp = require("chai-http");
chai.should();
chai.use(chaiHttp);
const { assert, expect } = chai;

describe("Server!", () => {
  it("Register test", (done) => {
    chai
    .request(server)
    .post("/register")
    .send({username: "nancyyoder", password: "123456789101112"})
    .end((err, res) => {
      res.body.should.have.property("username").eq("nancyyoder")
      res.body.should.have.property("password").eq("123456789101112")
      expect(res).to.have.status(201);
    done();
    });
  }); 
});
  