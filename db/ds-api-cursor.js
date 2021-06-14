const knexConfig = require('../knexfile');
const knex = require('knex')(knexConfig);
const date = require('../services/date');

module.exports.dsApiCursorTable = 'ds_api_cursor';

/**
 * l'API DS nous retourne 100 éléments à chaque appel, et nous indique la page où l'on se trouve
 * en stockant la dernière page lue (cursor), on limite le nombre d'appel à l'API en ne lisant que
 * les pages necessaires
 */
module.exports.getCursorFromDB = async function getCursorFromDB () {
  try {
    const lastCursor = await knex(module.exports.dsApiCursorTable)
      .where('id', 1)
      .first();

    console.debug(`getCursorFromDB: Got the latest cursor saved in PG ${JSON.stringify(lastCursor)}`);
    if (lastCursor) {
      return lastCursor.cursor;
    }
    return undefined;
  } catch (err) {
    console.error('Impossible de récupèrer le dernier cursor de l\'api DS, le cron ne va pas utilser de cursor', err);

    return undefined; // not a blocking error
  }
};

module.exports.saveLatestCursor = async function saveLatestCursor (cursor) {
  try {
    const now = date.getDateNowPG();
    // eslint-disable-next-line func-names
    return await knex.transaction((trx) => trx.into(module.exports.dsApiCursorTable) // add transaction in case 2 cron jobs modify this cursor
      .insert({ id: 1, cursor, updatedAt: now })
      .onConflict('id')
      .merge()
    );
  } catch (err) {
    console.error(`Impossible de sauvegarder le dernier cursor ${cursor} de l'api DS`, err);
    throw new Error('Impossible de sauvegarder le dernier cursor de l\'api DS');
  }
};
