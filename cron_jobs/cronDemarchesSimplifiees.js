require('dotenv').config();

const dbsApiCursor = require('../db/dsApiCursor');
const dbPsychologists = require('../db/psychologists');
const demarchesSimplifiees = require('../services/demarchesSimplifiees');

async function importDataFromDSToPG(cursor) {
  try {
    console.log('Starting importDataFromDSToPG...');

    const dsAPIData = await demarchesSimplifiees.getPsychologistList(cursor);

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
  return  importDataFromDSToPG();
};

module.exports.importLatestDataFromDSToPG = async function importLatestDataFromDSToPG() {
  const latestCursorInPG = await dbsApiCursor.getCursorFromDB();
  return importDataFromDSToPG(latestCursorInPG);
};
