/* eslint-disable func-names */
const app = require('../index');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = require('chai');

chai.use(chaiHttp);
chai.should();

describe('Static pages', () => {
  it('/ should display home page', () => chai.request(app)
    .get('/')
    .then(async (res) => {
      expect(res).to.have.status(200);
      expect(res.text).to.contains('En parler, c’est déjà se soigner');
    }));

  it('/faq should display the FAQ', () => chai.request(app)
    .get('/faq')
    .then(async (res) => {
      expect(res).to.have.status(200);
      expect(res.text).to.contains('J’ai moins de 18 ans');
    }));

  it('/robots.txt should display the robots.txt', () => chai.request(app)
    .get('/robots.txt')
    .then(async (res) => {
      expect(res).to.have.status(200);
      expect(res.text).to.contains('User-agent: *');
    }));

  it('/documents should return a static doc', () => chai.request(app)

    .get('/static/documents/Guide-PsyEnfantAdo-Psychologues.pdf')
    .then(async (res) => {
      expect(res).to.have.status(200);
      expect(res.type).to.eql('application/pdf');
    }));
});
