/* eslint-disable camelcase */
const graphql = require('./graphql');

// @see https://demarches-simplifiees-graphql.netlify.app/dossierstate.doc.html
// eslint-disable-next-line no-unused-vars
exports.DOSSIER_STATE = {
  en_construction: 'en_construction',
  en_instruction: 'en_instruction',
  accepte: 'accepte',
  refuse: 'refuse',
  sans_suite: 'sans_suite',
};

/**
 * @param api reponse with 2 informations :
 * hasNextPage: boolean
 * endCursor : string
 */
function getNextCursor (apiResponse) {
  const { pageInfo } = apiResponse.demarche.dossiers;
  if (pageInfo.hasNextPage) {
    return pageInfo.endCursor;
  }
  return undefined;
}

function getChampValue (champData, attributeName, stringValue = true) {
  const potentialStringValue = champData.find((champ) => champ.label.includes(attributeName));

  if (typeof potentialStringValue === 'undefined') {
    console.warn(`Champ from API ${attributeName} does not exist`);

    return '';
  }
  if (stringValue) {
    return potentialStringValue.stringValue.trim();
  }
  return potentialStringValue.value.trim();
}

const FORBIDDEN_CHARS = new RegExp([' ', ';'].join('|'));

function parseWebsite (dossier, dossierNumber) {
  const website = getChampValue(dossier.champs, 'Avez-vous un site web');
  if (!website) return '';

  let formatted = website.toLowerCase().trim();

  if (FORBIDDEN_CHARS.test(formatted) || !formatted.includes('.')) {
    console.error('Error: wrong website format', website, '(', dossierNumber, ')');
    return '';
  }

  if (!formatted.startsWith('http://') && !formatted.startsWith('https://')) {
    formatted = 'https://' + formatted;
  }

  return formatted;
}

/**
 * transform string to boolean
 * @param {*} inputString 'true' or 'false'
 */
function parseTeleconsultation (inputString) {
  return inputString === 'true';
}

function parseDossierMetadata (dossier) {
  const { state } = dossier;
  const { archived } = dossier;
  const lastName = dossier.demandeur.nom.trim();
  const firstNames = dossier.demandeur.prenom.trim();
  const dossierNumber = dossier.number.toString();
  const departement = dossier.groupeInstructeur.label;
  const address = getChampValue(dossier.champs, 'Adresse postale du cabinet');
  const phone = getChampValue(dossier.champs, 'Numéro de téléphone');
  const teleconsultation = parseTeleconsultation(
    getChampValue(dossier.champs, 'Proposez-vous des séances à distance ?'),
  );
  const website = parseWebsite(dossier, dossierNumber);
  const email = getChampValue(dossier.champs, 'Email de contact');

  const adeli = getChampValue(dossier.champs, 'Numéro ADELI');
  const languages = getChampValue(dossier.champs, 'Langues parlées (optionnel)');

  return {
    dossierNumber,
    state,
    archived,
    lastName,
    firstNames,
    address,
    departement,
    phone,
    website,
    email,
    teleconsultation,
    adeli,
    languages,
  };
}

function parsePsychologist (apiResponse) {
  console.debug(`Parsing ${apiResponse.demarche.dossiers.nodes.length} psychologists from DS API`);

  const dossiers = apiResponse.demarche.dossiers.nodes;

  if (dossiers.length > 0) {
    const psychologists = dossiers.map((dossier) => parseDossierMetadata(dossier));

    return psychologists;
  }
  console.error('Aucun psychologiste trouvé.');

  return [];
}

/**
 * helper function called by getPsychologistList
 * @param {*} cursor
 * @param {*} accumulator
 */
async function getAllPsychologistList (cursor, accumulator = []) {
  const apiResponse = await graphql.requestPsychologist(cursor);
  const nextCursor = getNextCursor(apiResponse);

  const nextAccumulator = accumulator.concat(
    parsePsychologist(apiResponse),
  );

  if (nextCursor) {
    return getAllPsychologistList(nextCursor, nextAccumulator);
  }

  return {
    psychologists: nextAccumulator,
    lastCursor: cursor,
  };
}

/**
 * get all psychologist from DS API
 *
 * DS API return 100 elements maximum
 * if we have more than 100 elements in DS, we have to use pagination (cursor)
 * cursor : String - next page to query the API
 */
module.exports.getPsychologistList = async function getPsychologistList (cursor) {
  const time = `Fetching all psychologists from DS (query id #${Math.random().toString()})`;

  console.time(time);
  const psychologists = await getAllPsychologistList(cursor);
  console.timeEnd(time);

  return psychologists;
};
