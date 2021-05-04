/* eslint-disable func-names */
const app = require('../index')
const chai = require('chai')
const chaiHttp = require("chai-http")
const expect = require('chai').expect;

chai.use(chaiHttp)
chai.should()

describe('Home page', function () {

  it('/ should display home page', function async () {
    return chai.request(app)
      .get('/')
      .end(async (err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.text).to.contains('En parler, c’est déjà se soigner')
      });
  });
});