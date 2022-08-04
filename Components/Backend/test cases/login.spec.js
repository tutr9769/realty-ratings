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
    it("Returns the default welcome message", (done) => {
      chai
        .request(server)
        .get("/login")
        .end((err, res) => {
          expect(res).to.have.status(200);
        //   expect(res.body.status).to.equals("success");
        //   assert.strictEqual(res.body.message, "Welcome!");
            assert.notEqual(res.status,401);
          done();
        });
    });
    
    

//     it('should return true if valid user id', function(){
//         var isValid = loginController.isValidUserId('abc123')
//         //assert.equal(isValid, true);
//         expect(isValid).to.be.true;
//   });
  
  });
  