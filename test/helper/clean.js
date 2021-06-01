const knexConfig = require('../../knexfile');
const knex = require('knex')(knexConfig);
const dbPsychologists = require('../../db/psychologists');
const dbDsApiCursor = require('../../db/ds-api-cursor');

module.exports.getRandomInt = function getRandomInt() {
  const min = Math.ceil(1);
  const max = Math.floor(99);
  const ourRandom = Math.floor(Math.random() * (max - min) + min);
  if (ourRandom < 10) {
    return `0${ourRandom.toString()}`;
  }
  return ourRandom.toString();
};

module.exports.getOnePsy = function getOnePsy(state = 'accepte', archived = false) {
  const dossierNumber = Math.random().toString();
  return {
    dossierNumber,
    firstNames: `${module.exports.getRandomInt()}First`,
    lastName: `${module.exports.getRandomInt()}Last`,
    archived,
    state,
    adeli: `${module.exports.getRandomInt()}829302942`,
    address: `${module.exports.getRandomInt()} SOLA 66110 MONTBOLO`,
    phone: `${module.exports.getRandomInt()}68396600`,
    email: `${module.exports.getRandomInt()}@beta.gouv.fr`,
    website: `${module.exports.getRandomInt()}beta.gouv.fr`,
    teleconsultation: Math.random() < 0.5,
    departement: `${module.exports.getRandomInt()} - Calvados`,
    languages: 'Français ,Anglais, et Espagnol',
  };
};

module.exports.psyList = function getPsyList(state = 'accepte', archived = false) {
  return [
    module.exports.getOnePsy(state, archived),
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
