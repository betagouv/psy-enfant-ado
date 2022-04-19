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
      expect(res.headers['x-robots-tag']).to.be.undefined;
    }));

  it('/static/* should return a static file and have a noindex header', () => chai.request(app)
    .get('/static/images/cpam.png')
    .then(async (res) => {
      expect(res).to.have.status(200);
      expect(res.type).to.eql('image/png');
      expect(res.headers['x-robots-tag']).to.eql('noindex');
    }));
});
