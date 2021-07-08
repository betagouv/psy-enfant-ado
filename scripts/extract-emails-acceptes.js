/* eslint-disable no-process-exit */

const knexConfig = require('../knexfile');
const knex = require('knex')(knexConfig);
const _ = require('lodash');
// var file = fs.createWriteStream('emails-psy.csv');
//
// file.write('"Email";"FirstName";"LastName"\n');

try {
  knex.select().table('psychologists').then((all) => {
    // const accepte = _.filter(all, { state: 'accepte'});
    // const accepte = _.filter(all, { state: 'accepte', archived: false });

    all.forEach((item) => {
      if (_.filter(all, { email: item.email }).length > 1) {
        console.log('>>>>');
        console.log(item.dossierNumber, item.email);
      }
    });

    // console.log('Nombre total de dossier en accepté', accepte.length);

    setTimeout(() => {
      process.exit();
    }, 200);
  });
} catch (err) {
  console.error('Impossible de récupérer les psychologistes', err);
  throw new Error('Impossible de récupérer les psychologistes');
}
