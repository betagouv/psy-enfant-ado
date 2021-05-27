require('dotenv').config();
const sinon = require('sinon');
const _ = require('lodash');
const dbPsychologists = require('../db/psychologists');
const dbDsApiCursor = require('../db/dsApiCursor');
const demarchesSimplifiees = require('../services/demarchesSimplifiees');
const graphql = require('../services/graphql');
const dossierResponse = require('./dossier.json');
const dossierResponseEmpty = require('./dossier-empty.json');

const cronDemarchesSimplifiees = require('../cron_jobs/cronDemarchesSimplifiees');
const clean = require('./helper/clean');

describe('Import Data from DS to PG', () => {
  let graphqlRequest;

  beforeEach(async () => {
    await clean.cleanAllPsychologists();
  });

  afterEach(async () => {
    graphqlRequest.restore();

    return Promise.resolve();
  });

  it('should get a cursor, then all psychologist from DS API, then save cursor and psylist', async () => {

    graphqlRequest = sinon.stub(graphql, 'requestPsychologist')
      .onCall(0)
      .returns(Promise.resolve(dossierResponse));

    graphqlRequest.onCall(1)
      .returns(Promise.resolve(dossierResponseEmpty));

    await cronDemarchesSimplifiees.importLatestDataFromDSToPG();

    sinon.assert.called(graphqlRequest);
    const counts = await dbPsychologists.getNumberOfPsychologists()
    const accepted = counts.find(myElement => (!myElement.archived && myElement.state === 'accepté'));
    const en_instruction = counts.find(myElement => (!myElement.archived && myElement.state === 'en_instruction'));

    accepted.count.should.be.equal('1');
    en_instruction.count.should.be.equal('1');
  });
});
