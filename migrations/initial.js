/* eslint-disable func-names */
const dbPsychologists = require('../db/psychologists');
const dbDsApiCursor = require('../db/ds-api-cursor');

exports.up = function (knex) {
  console.log(`Creating ${dbPsychologists.psychologistsTable} table`);

  return knex.schema
      .createTable(dbPsychologists.psychologistsTable, (table) => {
        table.string('dossierNumber').primary(); // to avoid duplicate when doing upsert
        table.string('adeli').notNullable(); // all therapists should be registered and have a number
        table.text('firstNames').notNullable();
        table.text('lastName').notNullable();
        table.text('email').notNullable();
        table.text('address');
        table.string('departement').notNullable();
        table.string('phone').notNullable();
        table.string('website');
        table.boolean('teleconsultation');
        table.text('languages');
        table.boolean('archived'); // archived on Demarches Simplifiees
        table.text('state'); // state on Demarches Simplifiees
        table.timestamp('createdAt').defaultTo(knex.fn.now());
        table.timestamp('updatedAt');
      }).then(() => {
        console.log(`Creating ${dbDsApiCursor.dsApiCursorTable} table`);
        return knex.schema.createTable(dbDsApiCursor.dsApiCursorTable, (table) => {
          table.integer('id').primary(); // unique
          table.text('cursor');
          table.timestamp('createdAt').defaultTo(knex.fn.now());
          table.timestamp('updatedAt');
        })
      })
};

exports.down = function (knex) {
  return knex.schema.dropTable(dbPsychologists.psychologistsTable)
  .then(() => {
    knex.schema.dropTable(dbDsApiCursor.dsApiCursorTable);
  });
};
