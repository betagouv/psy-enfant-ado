/* eslint-disable func-names */
const app = require('../index');
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);
chai.should();

describe('Static pages', function () {

  it('/ should display home page', function async () {
    return chai.request(app)
      .get('/')
      .then(async (res) => {
        expect(res).to.have.status(200);
        expect(res.text).to.contains('En parler, c’est déjà se soigner');
      });
  });

  it('/faq should display the FAQ', function async () {
    return chai.request(app)
      .get('/faq')
      .then(async (res) => {
        expect(res).to.have.status(200);
        expect(res.text).to.contains('J’ai moins de 18 ans');
      });
  });

  it('/robots.txt should display the robots.txt', function async () {
    return chai.request(app)
      .get('/robots.txt')
      .then(async (res) => {
        expect(res).to.have.status(200);
        expect(res.text).to.contains('User-agent: *');
      });
  });
});