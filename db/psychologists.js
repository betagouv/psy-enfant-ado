const knexConfig = require('../knexfile');
const knex = require('knex')(knexConfig);
const date = require('../services/date');
const demarchesSimplifiees = require('../services/demarchesSimplifiees');

module.exports.psychologistsTable = 'psychologists';

module.exports.getPsychologists = async () => {
  try {
    const psychologists = knex.column(
      knex.raw('UPPER("lastName") as "lastName"'), // force to use quote otherwise knex understands it as "lastname"
      'adeli',
      'firstNames',
      'email',
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
    return psychologists;
  } catch (err) {
    console.error('Impossible de récupérer les psychologistes', err);
    throw new Error('Impossible de récupérer les psychologistes');
  }
};

function addFrenchLanguageIfMissing(languages) {
  const frenchRegexp = new RegExp(/fran[çc]ais/, 'g');
  const french = 'Français';
  if (!frenchRegexp.test(languages.toLowerCase())) {
    if (languages.trim().length === 0) {
      return french;
    }
    return `${french}, ${languages}`;
  }
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
      .merge({ // update every field and add updatedAt
        firstNames: psy.firstNames,
        lastName: psy.lastName,
        archived: psy.archived,
        state: psy.state,
        address: psy.address,
        departement: psy.departement,
        phone: psy.phone,
        website: psy.website,
        email: psy.email,
        teleconsultation: psy.teleconsultation,
        adeli: psy.adeli,
        languages: psy.languages,
        updatedAt,
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
  return await knex(module.exports.psychologistsTable)
    .select('archived', 'state')
    .count('*')
    .groupBy('archived', 'state');

};
