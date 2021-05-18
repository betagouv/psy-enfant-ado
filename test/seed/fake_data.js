const dbPsychologists = require('../../db/psychologists');
const demarchesSimplifiees = require('../../services/demarchesSimplifiees');
const clean = require('../helper/clean');

exports.seed = async function seed (knex) {
  console.log('Clean database information');
  await knex(dbPsychologists.psychologistsTable).del();

  const numberOfPsyToCreate = 100

  const randomAcceptedPsy = Array(numberOfPsyToCreate).fill(0).map ( _ => {
    return clean.getOnePsy(`${clean.getRandomInt()}@beta.gouv.fr`,
      demarchesSimplifiees.DOSSIER_STATE.accepte, false);
  })

  const psyWithDifferentStateArchivedStatus = [
    clean.getOnePsy('login@beta.gouv.fr', demarchesSimplifiees.DOSSIER_STATE.accepte, false),
    clean.getOnePsy('archived@beta.gouv.fr', demarchesSimplifiees.DOSSIER_STATE.accepte, true),
    clean.getOnePsy('empty@beta.gouv.fr', demarchesSimplifiees.DOSSIER_STATE.accepte, true),
    clean.getOnePsy('construction@beta.gouv.fr', demarchesSimplifiees.DOSSIER_STATE.en_construction, false),
    clean.getOnePsy('refuse@beta.gouv.fr', demarchesSimplifiees.DOSSIER_STATE.refuse, false),
  ]

  const psyList = psyWithDifferentStateArchivedStatus.concat(randomAcceptedPsy)

  await knex(dbPsychologists.psychologistsTable).insert(psyList);
  console.log(`inserted ${psyList.length} fake data to psychologistsTable`);
};