/* eslint-disable func-names */
const dbPsychologists = require('../db/psychologists');
const dbDsApiCursor = require('../db/dsApiCursor');

exports.up = function (knex) {
  console.log(`Creating ${dbPsychologists.psychologistsTable} table`);

  return knex.schema
      .createTable(dbPsychologists.psychologistsTable, (table) => {
        table.uuid('dossierNumber').primary(); // to avoid duplicate when doing upsert
        table.string('adeli').notNullable(); // all therapists should be registered and have a number
        table.text('firstNames').notNullable();
        table.text('lastName').notNullable();
        table.text('email').notNullable(); // this will be the login for the user
        table.text('personalEmail').notNullable(); // login for Demarches Simplifiees
        table.text('address');
        table.string('departement');
        table.string('region');
        table.string('phone');
        table.string('website');
        table.boolean('teleconsultation');
        table.text('description');
        table.text('languages');
        table.json('training'); // Formations et expériences
        table.text('diploma');
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
}


exports.down = function (knex) {
  return knex.schema.dropTable(dbPsychologists.psychologistsTable)
  .then(() => {
    knex.schema.dropTable(dbDsApiCursor.dsApiCursorTable);
  })
};