const knexConfig = require('../knexfile');
const knex = require('knex')(knexConfig);
const date = require('../services/date');
const demarchesSimplifiees = require('../services/demarches-simplifiees');

module.exports.psychologistsTable = 'psychologists';

module.exports.getPsychologists = async () => {
  try {
    return knex.column(
      knex.raw('UPPER("lastName") as "lastName"'), // force to use quote otherwise knex understands it as "lastname"
      'firstNames',
      'address',
      'departement',
      'phone',
      'website',
      'teleconsultation',
      'languages'
    )
        .select()
        .from(module.exports.psychologistsTable)
        .whereNot('archived', true)
        .where('state', demarchesSimplifiees.DOSSIER_STATE.accepte)
        .orderByRaw('RANDOM ()');
  } catch (err) {
    console.error('Impossible de récupérer les psychologistes', err);
    throw new Error('Impossible de récupérer les psychologistes');
  }
};

const FRENCH = 'Français';
function addFrenchLanguageIfMissing(languages) {
  if (!languages.trim().length) return FRENCH;
  const FRENCH_REGEXP = new RegExp(/fran[çc]ais/, 'g');
  if (!FRENCH_REGEXP.test(languages.toLowerCase())) return `${FRENCH}, ${languages}`;

  return languages;
}

/**
 * Perform a UPSERT with https://knexjs.org/#Builder-merge
 * @param {*} psy
 */
module.exports.savePsychologist = async function savePsychologist(psyList) {
  console.log(`UPSERT of ${psyList.length} psychologists into PG....`);
  const updatedAt = date.getDateNowPG(); // use to perform UPSERT

  const upsertArray = psyList.map((psy) => {
    const upsertingKey = 'dossierNumber';

    psy.languages = addFrenchLanguageIfMissing(psy.languages);
    try {
      return knex(module.exports.psychologistsTable)
      .insert(psy)
      .onConflict(upsertingKey)
      .merge({
        ...psy,
        updatedAt
      });
    } catch (err) {
      console.error(`Error to insert ${psy}`, err);
      return Promise.resolve();
    }
  });

  const query = await Promise.all(upsertArray);

  console.log('UPSERT into PG : done');

  return query;
};

module.exports.getNumberOfPsychologists = async function getNumberOfPsychologists() {
  return knex(module.exports.psychologistsTable)
    .select('archived', 'state')
    .count('*')
    .groupBy('archived', 'state');
};
