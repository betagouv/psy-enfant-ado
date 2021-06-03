/* eslint-disable no-process-exit */
'use strict';

const fs = require('fs');
const knexConfig = require('../knexfile');
const knex = require('knex')(knexConfig);
const _ = require('lodash');
var file = fs.createWriteStream('departments-stats.csv');

log('Dep', 'total');

let deps = [
  { count: 0, name: '01 - Ain' },
  { count: 0, name: '02 - Aisne' },
  { count: 0, name: '03 - Allier' },
  { count: 0, name: '04 - Alpes de Haute Provence' },
  { count: 0, name: '05 - Hautes Alpes' },
  { count: 0, name: '06 - Alpes Maritimes' },
  { count: 0, name: '07 - Ardèche' },
  { count: 0, name: '08 - Ardennes' },
  { count: 0, name: '09 - Ariège' },
  { count: 0, name: '10 - Aube' },
  { count: 0, name: '11 - Aude' },
  { count: 0, name: '12 - Aveyron' },
  { count: 0, name: '13 - Bouches du Rhône' },
  { count: 0, name: '14 - Calvados' },
  { count: 0, name: '15 - Cantal' },
  { count: 0, name: '16 - Charente' },
  { count: 0, name: '17 - Charente Maritime' },
  { count: 0, name: '18 - Cher' },
  { count: 0, name: '19 - Corrèze' },
  { count: 0, name: '2A - Corse du Sud' },
  { count: 0, name: '2B - Haute Corse' },
  { count: 0, name: '21 - Côte d\'Or' },
  { count: 0, name: '22 - Côtes d\'Armor' },
  { count: 0, name: '23 - Creuse' },
  { count: 0, name: '24 - Dordogne' },
  { count: 0, name: '25 - Doubs' },
  { count: 0, name: '26 - Drôme' },
  { count: 0, name: '27 - Eure' },
  { count: 0, name: '28 - Eure et Loire' },
  { count: 0, name: '29 - Finistère' },
  { count: 0, name: '30 - Gard' },
  { count: 0, name: '31 - Haute Garonne' },
  { count: 0, name: '32 - Gers' },
  { count: 0, name: '33 - Gironde' },
  { count: 0, name: '34 - Hérault' },
  { count: 0, name: '35 - Ile et Vilaine' },
  { count: 0, name: '36 - Indre' },
  { count: 0, name: '37 - Indre et Loire' },
  { count: 0, name: '38 - Isère' },
  { count: 0, name: '39 - Jura' },
  { count: 0, name: '40 - Landes' },
  { count: 0, name: '41 - Loir et Cher' },
  { count: 0, name: '42 - Loire' },
  { count: 0, name: '43 - Haute Loire' },
  { count: 0, name: '44 - Loire Atlantique' },
  { count: 0, name: '45 - Loiret' },
  { count: 0, name: '46 - Lot' },
  { count: 0, name: '47 - Lot et Garonne' },
  { count: 0, name: '48 - Lozère' },
  { count: 0, name: '49 - Maine et Loire' },
  { count: 0, name: '50 - Manche' },
  { count: 0, name: '51 - Marne' },
  { count: 0, name: '52 - Haute Marne' },
  { count: 0, name: '53 - Mayenne' },
  { count: 0, name: '54 - Meurthe et Moselle' },
  { count: 0, name: '55 - Meuse' },
  { count: 0, name: '56 - Morbihan' },
  { count: 0, name: '57 - Moselle' },
  { count: 0, name: '58 - Nièvre' },
  { count: 0, name: '59 - Nord' },
  { count: 0, name: '60 - Oise' },
  { count: 0, name: '61 - Orne' },
  { count: 0, name: '62 - Pas de Calais' },
  { count: 0, name: '63 - Puy-de-Dôme' },
  { count: 0, name: '64 - Pyrennées Atlantiques' },
  { count: 0, name: '65 - Hautes Pyrénées' },
  { count: 0, name: '66 - Pyrénées Orientales' },
  { count: 0, name: '67 - Bas Rhin' },
  { count: 0, name: '68 - Haut Rhin' },
  { count: 0, name: '69 - Rhône' },
  { count: 0, name: '70 - Haute Saône' },
  { count: 0, name: '71 - Saône et Loire' },
  { count: 0, name: '72 - Sarthe' },
  { count: 0, name: '73 - Savoie' },
  { count: 0, name: '74 - Haute Savoie' },
  { count: 0, name: '75 - Paris' },
  { count: 0, name: '76 - Seine Maritime' },
  { count: 0, name: '77 - Seine et Marne' },
  { count: 0, name: '78 - Yvelines' },
  { count: 0, name: '79 - Deux Sèvres' },
  { count: 0, name: '80 - Somme' },
  { count: 0, name: '81 - Tarn' },
  { count: 0, name: '82 - Tarn et Garonne' },
  { count: 0, name: '83 - Var' },
  { count: 0, name: '84 - Vaucluse' },
  { count: 0, name: '85 - Vendée' },
  { count: 0, name: '86 - Vienne' },
  { count: 0, name: '87 - Haute Vienne' },
  { count: 0, name: '88 - Vosges' },
  { count: 0, name: '89 - Yonne' },
  { count: 0, name: '90 - Territoire de Belfort' },
  { count: 0, name: '91 - Essonne' },
  { count: 0, name: '92 - Hauts de Seine' },
  { count: 0, name: '93 - Seine Saint Denis' },
  { count: 0, name: '94 - Val de Marne' },
  { count: 0, name: '95 - Val d\'Oise' },
  { count: 0, name: '97 - Guadeloupe' },
  { count: 0, name: '97 - Martinique' },
  { count: 0, name: '97 - Guyane' },
  { count: 0, name: '974 - Ile de la Réunion' },
  { count: 0, name: '98 - Mayotte' },
];

function log (text, count) {
  file.write('"' + text + '";' + count + '\n');
  console.log(text, ':', count);
}

function displayList (list) {
  list.forEach((item) => {
    log(item.name, item.count);
  });
}

try {
  knex.select().table('psychologists').then((valids) => {

    valids = _.reject(_.reject(valids, { state: 'refuse' }), { state: 'sans_suite' });

    valids.forEach((psy) => {
      let dep = _.find(deps, { name: psy.departement });
      if (!dep) console.log('>>>>>>>>>', psy.departement);
      dep.count++;
    });

    const enInstruction = _.filter(valids, { state: 'en_instruction' });
    const accepte = _.filter(valids, { state: 'accepte' });
    const noDossier = _.filter(deps, { count: 0 });

    displayList(deps);

    log('', '');
    log('Nombre total de dossier déposés', valids.length);
    log('Nombre total de dossier en instruction', enInstruction.length);
    log('Nombre total de dossier en accepté', accepte.length);
    log('Nombre de départements sans dossiers', noDossier.length);

    setTimeout(() => {
      process.exit();
    }, 200);
  });

} catch (err) {
  console.error('Impossible de récupérer les psychologistes', err);
  throw new Error('Impossible de récupérer les psychologistes');
}

