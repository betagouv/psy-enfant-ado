require('dotenv').config();

const dbsApiCursor = require('../db/dsApiCursor');
const dbPsychologists = require('../db/psychologists');
const demarchesSimplifiees = require('../services/demarchesSimplifiees');

/**
 * Some data can be modified after been loaded inside PG
 * We need to re import them all from time to time using boolean @param updateEverything
 */
async function importDataFromDSToPG(updateEverything = false) {
  try {
    console.log('Starting importDataFromDSToPG...');
    const latestCursorInPG = await dbsApiCursor.getLatestCursorSaved(updateEverything);

    const dsAPIData = await demarchesSimplifiees.getPsychologistList(latestCursorInPG);

    if (dsAPIData.psychologists.length > 0) {
      await dbPsychologists.savePsychologist(dsAPIData.psychologists);
      await dbsApiCursor.saveLatestCursor(dsAPIData.lastCursor);

      const numberOfPsychologists = await dbPsychologists.getNumberOfPsychologists();
      console.log('psychologists inside PG :', numberOfPsychologists);
    } else {
      console.warn('No psychologists to save');
    }

    console.log('importDataFromDSToPG done');

    return true; // must return something for cron lib
  } catch (err) {
    console.error('ERROR: Could not import DS API data to PG', err);
    return false;
  }
}

module.exports.importEveryDataFromDSToPG = async function importEveryDataFromDSToPG() {
  importDataFromDSToPG(true);
};

module.exports.importLatestDataFromDSToPG = async function importLatestDataFromDSToPG() {
  importDataFromDSToPG(false);
};
