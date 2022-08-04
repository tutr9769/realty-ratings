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

describe("Property!", () => {
    it("creating a new property", (done) => {
        chai
        .request(server)
        .post("/createProperty")
        .send({"imageUrl":"https://www.colorado.edu/sites/default/files/styles/medium/public/page/cu-boulder-share-photo.jpg?itok=DYkScila", "title":"Test House","city":"Boulder","zip":"80302","streetAddress":"1234 Test Ave","unit":"5","rent":"3000","bathrooms":"4","bedrooms":"3","leasing_company":"Test Owner"})
        .end((err, res) => {
            expect(res).to.have.status(201);
            expect(res).to.have.property("imageUrl").eq("https://www.colorado.edu/sites/default/files/styles/medium/public/page/cu-boulder-share-photo.jpg?itok=DYkScila");
            expect(res).to.have.property("title").eq("Test House");
            expect(res).to.have.property("city").eq("Boulder");
            expect(res).to.have.property("zip").eq(80302);
            expect(res).to.have.property("streetAddress").eq("1234 Test Ave");
            expect(res).to.have.property("unit").eq("5");
            expect(res).to.have.property("rent").eq(3000);
            expect(res).to.have.property("bathrooms").eq(4);
            expect(res).to.have.property("bedrooms").eq(3);
            expect(res).to.have.property("leasing_company").eq("Test Owner");
            done();
        });
    });
});