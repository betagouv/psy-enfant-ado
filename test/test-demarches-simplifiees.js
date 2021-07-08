require('dotenv').config();
const rewire = require('rewire');
const testDossiers = require('./dossier.json');

const demarchesSimplifiees = rewire('../services/demarches-simplifiees.js');

describe('Demarches Simplifiess', () => {
  describe('parsePsychologist', () => {
    it('should return an array of psychologists from a JSON', async () => {
      const apiResponse = testDossiers;

      apiResponse.demarche.dossiers.nodes[1].website = 'ss';
      const parsePsychologist = demarchesSimplifiees.__get__('parsePsychologist');
      const output = parsePsychologist(apiResponse);
      // eslint-disable-next-line max-len
      const result = [
        {
          dossierNumber: '4488284',
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
          dossierNumber: '4488079',
          lastName: 'BetaDU',
          firstNames: 'BetaP',
          archived: false,
          state: 'en_instruction',
          adeli: '339308207',
          address: '15 Impasse de la 4ème République 33140 Villenave-d\'Ornon',
          phone: '0600000000',
          email: 'pj@beta.beta.gouv.fr',
          website: 'https://beta.gouv.fr',
          teleconsultation: false,
          departement: '33 - Gironde',
          languages: '',
        },
      ];

      output.should.eql(result);
    });
  });

  describe('parseWebsite', () => {
    const parseWebsite = demarchesSimplifiees.__get__('parseWebsite');

    it('should lowercase website', async () => {
      const apiResponse = {
        champs: [{
          id: 'Q2hhbXAtMTYzOTQwMQ==',
          label: 'Avez-vous un site web ? Si oui, merci de mettre le lien (optionnel)',
          stringValue: 'https://FFF.com',
        }]
      };

      parseWebsite(apiResponse).should.equal('https://fff.com');
    });

    it('should trim website', async () => {
      const apiResponse = {
        champs: [{
          id: 'Q2hhbXAtMTYzOTQwMQ==',
          label: 'Avez-vous un site web ? Si oui, merci de mettre le lien (optionnel)',
          stringValue: '    https://fff.com  ',
        }]
      };

      parseWebsite(apiResponse).should.equal('https://fff.com');
    });

    it('should exclude if contains space in the middle', async () => {
      const apiResponse = {
        champs: [{
          id: 'Q2hhbXAtMTYzOTQwMQ==',
          label: 'Avez-vous un site web ? Si oui, merci de mettre le lien (optionnel)',
          stringValue: '    https: //fff.com  ',
        }]
      };

      parseWebsite(apiResponse).should.equal('');
    });

    it('should exclude if not contains dot', async () => {
      const apiResponse = {
        champs: [{
          id: 'Q2hhbXAtMTYzOTQwMQ==',
          label: 'Avez-vous un site web ? Si oui, merci de mettre le lien (optionnel)',
          stringValue: 'NON',
        }],
        state: 'accepte'
      };

      parseWebsite(apiResponse).should.equal('');
    });

    it('should add https:// if not their', async () => {
      const apiResponse = {
        champs: [{
          id: 'Q2hhbXAtMTYzOTQwMQ==',
          label: 'Avez-vous un site web ? Si oui, merci de mettre le lien (optionnel)',
          stringValue: 'choco.com',
        }]
      };

      parseWebsite(apiResponse).should.equal('https://choco.com');
    });
  });

  describe('parsePhone', () => {
    const parsePhone = demarchesSimplifiees.__get__('parsePhone');

    it('should return the phone if formatted', async () => {
      const apiResponse = {
        champs: [{
          label: 'Numéro de téléphone',
          stringValue: '012345678',
        }]
      };

      parsePhone(apiResponse).should.equal('012345678');
    });

    it('should remove all not needed chars', async () => {
      const apiResponse = {
        champs: [{
          label: 'Numéro de téléphone',
          stringValue: ' +33 12 34.56-78    ',
        }]
      };

      parsePhone(apiResponse).should.equal('+3312345678');
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
