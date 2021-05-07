/* eslint-disable func-names */
const app = require('../index');
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);
chai.should();

describe('Static pages', function () {

  it('/ should display coming soon page', function async () {
    return chai.request(app)
      .get('/')
      .end(async (err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.text).to.contains('Site en cours de construction');
      });
  });

  it('/ should display home page', function async () {
    return chai.request(app)
      .get('/landing')
      .end(async (err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.text).to.contains('En parler, c’est déjà se soigner');
      });
  });

  it('/faq should display the FAQ', function async () {
    return chai.request(app)
      .get('/faq')
      .end(async (err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.text).to.contains('J’ai moins de 18 ans\n');
      });
  });
});