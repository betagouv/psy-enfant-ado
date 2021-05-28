const { expect, assert } = require('chai');
const rewire = require('rewire');
require('dotenv').config();

const dbPsychologists = rewire('../db/psychologists');
const _ = require('lodash');
const knexConfig = require('../knexfile');
const knex = require('knex')(knexConfig);
const clean = require('./helper/clean');

describe('DB Psychologists', () => {
  const psyList = clean.psyList();

  async function testDataPsychologistsExist (dossierNumber) {
    return await knex(dbPsychologists.psychologistsTable)
      .where('dossierNumber', dossierNumber)
      .first();
  }

  afterEach(async () => {
    await clean.cleanAllPsychologists();
  });

  describe('savePsychologist', () => {
    it('should INsert one psychologist', async () => {
      await dbPsychologists.savePsychologist(psyList);

      const psy = await testDataPsychologistsExist(psyList[0].dossierNumber);
      const { createdAt, updatedAt, ...result } = psy;
      expect(result).to.eql(psyList[0]);
      expect(createdAt).to.be.an.instanceof(Date);
      expect(updatedAt).to.be.null;
    });

    it('should UPsert one psychologist', async () => {
      // doing a classic insert
      await dbPsychologists.savePsychologist(psyList);
      const psyInsert = await testDataPsychologistsExist(psyList[0].dossierNumber);
      expect(_.omit(psyInsert, ['createdAt', 'updatedAt'])).to.eql(psyList[0]);

      // we do it twice in a row to UPsert it (field updatedAt will change)
      await dbPsychologists.savePsychologist(psyList);
      const psyUpsert = await testDataPsychologistsExist(psyList[0].dossierNumber);
      let { updatedAt, ...resultUpsert } = psyUpsert;
      expect(resultUpsert).to.eql(psyList[0]);
      expect(updatedAt).to.be.an.instanceof(Date);
    });
  });

  describe('addFrenchLanguageIfMissing', () => {
    const addFrenchLanguageIfMissing = dbPsychologists.__get__('addFrenchLanguageIfMissing');
    it('should add french if missing with one language', async () => {
      addFrenchLanguageIfMissing('espagnol').should.equal('Français, espagnol');
    });

    it('should add french if nothing there', async () => {
      addFrenchLanguageIfMissing('').should.equal('Français');
    });

    it('should add french if empty spaces for languages', async () => {
      addFrenchLanguageIfMissing('    ').should.equal('Français');
    });

    it('should not add french if already there', async () => {
      addFrenchLanguageIfMissing('français, italien').should.equal('français, italien');
    });

    it('should not add french if \'francais\' is there', async () => {
      addFrenchLanguageIfMissing('francais').should.equal('francais');
    });

    it('should not add french (capitalized) if already there', async () => {
      addFrenchLanguageIfMissing('Français et espagnol').should.equal('Français et espagnol');
    });
  });

  describe('getPsychologists', () => {
    it('should only return not archived and accepte psychologists with capitalized lastName', async () => {
      const archivedPsy = { ...psyList[0] };
      archivedPsy.archived = true;
      archivedPsy.lastName = 'ArchivedPsy';
      archivedPsy.dossierNumber = '34e6352f-bdd0-48ce-83de-8de71cad295b';
      const constructionPsy = { ...psyList[0] };
      constructionPsy.state = 'en_construction';
      constructionPsy.lastName = 'ConstructionPsy';
      constructionPsy.dossierNumber = 'a2e447cd-2d57-4f83-8884-ab05a2633644';

      await dbPsychologists.savePsychologist([psyList[0], archivedPsy, constructionPsy]);

      const shouldBeOne = await dbPsychologists.getPsychologists();
      shouldBeOne.length.should.be.equal(1);
      shouldBeOne[0].lastName.should.be.equal(psyList[0].lastName.toUpperCase());
      assert.isUndefined(shouldBeOne[0].loginEmail);
    });
  });

});
