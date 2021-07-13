/* eslint-disable no-process-exit */

const fs = require('fs');
const knexConfig = require('../knexfile');
const knex = require('knex')(knexConfig);
const _ = require('lodash');

fs.createWriteStream('emails-psy.csv');

let output = '"Email";"FirstName";"LastName"\n';

try {
  knex.select().table('psychologists').then((all) => {
    const accepte = _.map(_.filter(all, { state: 'accepte' }), (item) => {
      return `"${item.email}";"${item.firstName}";"${item.lastName}"`;
    });

    output += _.uniq(accepte).join('\n');
    fs.writeFileSync('emails-psy.csv', output);

    console.log('Nombre total de dossier en accepté', accepte.length);

    setTimeout(() => {
      process.exit();
    }, 200);
  });
} catch (err) {
  console.error('Impossible de récupérer les psychologistes', err);
  throw new Error('Impossible de récupérer les psychologistes');
}
