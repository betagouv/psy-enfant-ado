require('dotenv').config();
const rewire = require('rewire');
const { assert } = require('chai');
const testDossiers = require('./dossier.json');
const uuid = require('../services/uuid');
const config = require('../config');

const demarchesSimplifiees = rewire('../services/demarchesSimplifiees.js');

describe('Demarches Simplifiess', () => {
  describe('parsePsychologist', () => {
    it('should return an array of psychologists from a JSON', async () => {
      const apiResponse = testDossiers;

      const getUuidDossierNumber = demarchesSimplifiees.__get__('getUuidDossierNumber');

      const parsePsychologist = demarchesSimplifiees.__get__('parsePsychologist');
      const output = parsePsychologist(apiResponse);
      // eslint-disable-next-line max-len
      const result = [
        {
          dossierNumber: 'd6933940-657a-5c17-b478-8f34e74105df',
          lastName: 'BetaFR',
          firstNames: 'BetaE Michel',
          archived: false,
          state: 'accepté',
          adeli: '759374531',
          address: '39 Rue Saint-Fargeau 75020 Paris',
          phone: '0600000000',
          email: 'beta@beta.gouv.fr',
          website: '',
          teleconsultation: true,
          // eslint-disable-next-line max-len
          departement: '75 - Paris',
          languages: 'italien, espagnol, arabe oriental, arabe classique, anglais',
        },
        {
          dossierNumber: 'd76c571a-b3c2-577a-8ba1-d0133b045f55',
          lastName: 'BetaDU',
          firstNames: 'BetaP',
          archived: false,
          state: 'en_instruction',
          adeli: '339308207',
          address: `15 Impasse de la 4ème République 33140 Villenave-d'Ornon`,
          phone: '0600000000',
          email: 'pj@beta.beta.gouv.fr',
          website: 'beta.gouv.fr',
          teleconsultation: false,
          departement: '33 - Gironde',
          languages: '',
        },
      ];

      output.should.eql(result);
    });
  });

  describe('getNextCursor', () => {
    it('should return cursor string if there is more page to load', async () => {
      const cursor = 'MQ';
      const apiResponse = {
        demarche: {
          dossiers: {
            pageInfo: {
              hasNextPage: true,
              endCursor: cursor,
            },
          },
        },
      };

      const getNextCursor = demarchesSimplifiees.__get__('getNextCursor');
      const output = getNextCursor(apiResponse);

      output.should.equal(cursor);
    });

    it('should return undefined if there is no page to load', async () => {
      const cursor = 'MQ';
      const apiResponse = {
        demarche: {
          dossiers: {
            pageInfo: {
              hasNextPage: false,
              endCursor: cursor,
            },
          },
        },
      };

      const getNextCursor = demarchesSimplifiees.__get__('getNextCursor');

      assert.isUndefined(getNextCursor(apiResponse));
    });
  });

  describe('getUuidDossierNumber', () => {
    it('should return a uuid based on the given id', async () => {
      const dossierNumber = 1;

      const getUuidDossierNumber = demarchesSimplifiees.__get__('getUuidDossierNumber');
      const output = getUuidDossierNumber(dossierNumber);
      const result = uuid.generateUuidFromString(`${config.demarchesSimplifieesId}-${dossierNumber}`);

      output.should.equal(result);
    });
  });

  describe('getNextCursor', () => {
    it('should return cursor string if there is more page to load', async () => {
      const cursor = 'MQ';
      const apiResponse = {
        demarche: {
          dossiers: {
            pageInfo: {
              hasNextPage: true,
              endCursor: cursor,
            },
          },
        },
      };

      const getNextCursor = demarchesSimplifiees.__get__('getNextCursor');
      const output = getNextCursor(apiResponse);

      output.should.equal(cursor);
    });

    it('should return undefined if there is no page to load', async () => {
      const cursor = 'MQ';
      const apiResponse = {
        demarche: {
          dossiers: {
            pageInfo: {
              hasNextPage: false,
              endCursor: cursor,
            },
          },
        },
      };

      const getNextCursor = demarchesSimplifiees.__get__('getNextCursor');

      assert.isUndefined(getNextCursor(apiResponse));
    });
  });

  describe('getDepartementNumberFromString', () => {
    it('should return departement number from departement and number', async () => {
      const departementNumber = '55';
      const departementString = `${departementNumber} - Indre-et-Loire`;
      const output = demarchesSimplifiees.getDepartementNumberFromString(departementString);

      output.should.equal(departementNumber);
    });
  });

  describe('getChampValue', () => {
    it('should return stringValue for field Champ', async () => {
      const result = 'Psychologie clinique de la santé';
      const label = 'Intitulé ou spécialité de votre master de psychologie';

      const apiResponse = [
        {
          id: 'Q2hhbXAtMTYzMDQxNg==',
          label: 'Votre carrière et vos qualifications',
          stringValue: '',
        },
        {
          id: 'Q2hhbXAtMTYzMDQxNw==',
          label,
          stringValue: result,
        },
      ];

      const getChampValue = demarchesSimplifiees.__get__('getChampValue');
      const output = getChampValue(apiResponse, label);

      output.should.equal(result);
    });

    it('should return empty string for a field Champ that does not exist', async () => {
      const result = '';
      const label = 'Intitulé ou spécialité de votre master de psychologie';

      const apiResponse = [
        {
          id: 'Q2hhbXAtMTYzMDQxNg==',
          label: 'Votre carrière et vos qualifications',
          stringValue: '',
        },
        {
          id: 'Q2hhbXAtMTYzMDQxNw==',
          label: 'nothing',
          stringValue: result,
        },
      ];

      const getChampValue = demarchesSimplifiees.__get__('getChampValue');
      const output = getChampValue(apiResponse, label);

      output.should.equal(result);
    });

    it('should return "value" when stringValue is set to false', async () => {
      const result = 'Psychologie clinique de la santé';
      const label = 'Intitulé ou spécialité de votre master de psychologie';

      const apiResponse = [
        {
          id: 'Q2hhbXAtMTYzMDQxNg==',
          label: 'Votre carrière et vos qualifications',
          stringValue: '',
        },
        {
          id: 'Q2hhbXAtMTYzMDQxNw==',
          label,
          value: result,
        },
      ];

      const getChampValue = demarchesSimplifiees.__get__('getChampValue');
      const output = getChampValue(apiResponse, label, false);

      output.should.equal(result);
    });
  });
});
