const dbPsychologists = require('../../db/psychologists');
const demarchesSimplifiees = require('../../services/demarches-simplifiees');
const clean = require('../helper/clean');

exports.seed = async function seed (knex) {
  console.log('Clean database information');
  await knex(dbPsychologists.psychologistsTable).del();

  const numberOfPsyToCreate = 100

  const psyList = Array(numberOfPsyToCreate).fill(0).map ( () => {
    return clean.getOnePsy(demarchesSimplifiees.DOSSIER_STATE.accepte, false);
  })

  await knex(dbPsychologists.psychologistsTable).insert(psyList);
  console.log(`inserted ${psyList.length} fake data to psychologistsTable`);
};