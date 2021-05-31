'use strict';

const fs = require('fs');
const knexConfig = require('../knexfile');
const knex = require('knex')(knexConfig);
const _ = require('lodash');
var file = fs.createWriteStream('files.csv');
file.write('dossierNumber,website\n');

try {
  knex.select().table('psychologists').then(function (psychologists) {
    console.log('>>>>> GOT', psychologists.length);

    _.forEach(psychologists, function (psy) {
      if (psy.website && psy.state === 'en_instruction') {
        const website = psy.website.toLowerCase();
        if (!website.includes('.')) {
          file.write(psy.dossierNumber, psy.website)
        } else if ( !website.startsWith('http') && !website.startsWith('www')) {
          if (psy.state === 'en_instruction') {
            file.write(psy.dossierNumber, website)
          }
        }
      }
    });
    process.exit();
  });

} catch (err) {
  console.error('Impossible de récupérer les psychologistes', err);
  throw new Error('Impossible de récupérer les psychologistes');
}

