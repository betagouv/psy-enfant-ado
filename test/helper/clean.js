const knexConfig = require('../../knexfile');
const knex = require('knex')(knexConfig);
const dbPsychologists = require('../../db/psychologists');
const dbDsApiCursor = require('../../db/dsApiCursor');
const uuid = require('../../services/uuid');

module.exports.getRandomInt = function getRandomInt() {
  const min = Math.ceil(1);
  const max = Math.floor(99);
  const ourRandom = Math.floor(Math.random() * (max - min) + min);
  if (ourRandom < 10) {
    return `0${ourRandom.toString()}`;
  }
  return ourRandom.toString();
};

module.exports.getOnePsy = function getOnePsy(personalEmail = 'loginemail@beta.gouv.fr',
  state = 'accepte', archived = false) {
  const dossierNumber = uuid.randomUuid();
  return {
    dossierNumber,
    firstNames: `${module.exports.getRandomInt()}First`,
    lastName: `${module.exports.getRandomInt()}Last`,
    archived,
    state,
    adeli: `${module.exports.getRandomInt()}829302942`,
    address: `${module.exports.getRandomInt()} SOLA 66110 MONTBOLO`,
    diploma: 'Psychologie clinique de la santé',
    phone: '0468396600',
    email: `${module.exports.getRandomInt()}@beta.gouv.fr`,
    personalEmail,
    website: `${module.exports.getRandomInt()}beta.gouv.fr`,
    teleconsultation: Math.random() < 0.5,
    description: 'description',
    // eslint-disable-next-line max-len
    training: '["Connaissance et pratique des outils diagnostic psychologique","Connaissance des troubles psychopathologiques du jeune adulte : dépressions","risques suicidaires","addictions","comportements à risque","troubles alimentaires","décompensation schizophrénique","psychoses émergeantes ainsi qu’une pratique de leur repérage","Connaissance et pratique des dispositifs d’accompagnement psychologique et d’orientation (CMP...)"]',
    departement: `${module.exports.getRandomInt()} - Calvados`,
    region: 'Normandie',
    languages: 'Français ,Anglais, et Espagnol',
  };
};

module.exports.psyList = function getPsyList(personalEmail = 'loginemail@beta.gouv.fr',
  state = 'accepte', archived = false) {
  const universityId = uuid.randomUuid();
  return [
    module.exports.getOnePsy(personalEmail, state, archived, universityId),
  ];
};

module.exports.cleanDataCursor = async function cleanDataCursor() {
  return knex(dbDsApiCursor.dsApiCursorTable).select('*').delete();
};

module.exports.cleanAllPsychologists = async function cleanAllPsychologists() {
  try {
    return knex(dbPsychologists.psychologistsTable).select('*').delete();
  } catch (err) {
    console.log(err);
    return undefined;
  }
};