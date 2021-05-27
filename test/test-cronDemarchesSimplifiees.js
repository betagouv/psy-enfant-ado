require('dotenv').config();
const sinon = require('sinon');
const dbPsychologists = require('../db/psychologists');
const dbDsApiCursor = require('../db/dsApiCursor');
const demarchesSimplifiees = require('../services/demarchesSimplifiees');

const cronDemarchesSimplifiees = require('../cron_jobs/cronDemarchesSimplifiees');
const clean = require('./helper/clean');

describe('Import Data from DS to PG', () => {
  let getCursorFromDBStub;
  let getPsychologistListStub;
  let savePsychologistStub;
  let getNumberOfPsychologistsStub;
  let saveLatestCursorStub;

  afterEach(async () => {
    getCursorFromDBStub.restore();
    getPsychologistListStub.restore();
    savePsychologistStub.restore();
    getNumberOfPsychologistsStub.restore();
    saveLatestCursorStub.restore();
    return Promise.resolve();
  });

  it('should get a cursor, then all psychologist from DS API, then save cursor and psylist', async () => {

    // eslint-disable-next-line max-len
    const cursor = '{"id":1,"cursor":"test","createdAt":"2021-02-19T13:16:45.382Z","updatedAt":"2021-02-19T13:16:45.380Z"}';
    const dsApiData = {
      psychologists: clean.psyList(),
      cursor: 'test',
    };
    getCursorFromDBStub = sinon.stub(dbDsApiCursor, 'getCursorFromDB')
      .returns(Promise.resolve(cursor));
    getPsychologistListStub = sinon.stub(demarchesSimplifiees, 'getPsychologistList')
      .returns(Promise.resolve(dsApiData));
    savePsychologistStub = sinon.stub(dbPsychologists, 'savePsychologist')
      .returns(Promise.resolve());
    getNumberOfPsychologistsStub = sinon.stub(dbPsychologists, 'getNumberOfPsychologists')
      .returns(Promise.resolve([{ count: 1 }]));
    saveLatestCursorStub = sinon.stub(dbDsApiCursor, 'saveLatestCursor')
    .returns(Promise.resolve());

    await cronDemarchesSimplifiees.importLatestDataFromDSToPG();

    sinon.assert.called(getCursorFromDBStub);
    sinon.assert.called(getPsychologistListStub);
    sinon.assert.called(savePsychologistStub);
    sinon.assert.called(saveLatestCursorStub);
    sinon.assert.called(getNumberOfPsychologistsStub);
  });
});
