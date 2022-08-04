// Imports the validate.js file to be tested.
const server = require("../register");
// Assertion (Test Driven Development) and Should,  Expect(Behaviour driven 
// development) library
const chai = require("chai");
// Chai HTTP provides an interface for live integration testing of the API's.
const chaiHttp = require("chai-http");
chai.should();
chai.use(chaiHttp);
const { assert, expect } = chai;

describe("Create Review!", () => {
    it("Creates A Valid Review", (done) => {
      chai
        .request(server)
        .post("/createReview")
        .send({"rating": 4, "txt": "hi there", "property": "1029 11th Street", "username": "jordanaevanz"})
        .end((err, res) => {
          expect(res).to.have.status(201);
          res.body.should.have.property("rating").eq(4);
          res.body.should.have.property("txt").eq("hi there");
          res.body.should.have.property("username").eq("jordanaevanz");
          res.body.should.have.property("property").eq("1029 11th Street");
          done();
        });
    });

  });


  
  