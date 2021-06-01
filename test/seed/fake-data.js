const dbPsychologists = require('../../db/psychologists');
const demarchesSimplifiees = require('../../services/demarches-simplifiees');
const clean = require('../helper/clean');

exports.seed = async function seed(knex) {
  console.log('Clean database information');
  await knex(dbPsychologists.psychologistsTable).del();

  const numberOfPsyToCreate = 100;

  const randomAcceptedPsy = Array(numberOfPsyToCreate).fill(0).map(
    () => clean.getOnePsy(demarchesSimplifiees.DOSSIER_STATE.accepte, false),
  );

  const psyWithDifferentStateArchivedStatus = [
    clean.getOnePsy(demarchesSimplifiees.DOSSIER_STATE.accepte, true),
    clean.getOnePsy(demarchesSimplifiees.DOSSIER_STATE.en_construction, false),
    clean.getOnePsy(demarchesSimplifiees.DOSSIER_STATE.refuse, false),
  ];

  const psyList = psyWithDifferentStateArchivedStatus.concat(randomAcceptedPsy);

  await knex(dbPsychologists.psychologistsTable).insert(psyList);
  console.log(`inserted ${psyList.length} fake data to psychologistsTable`);
};
