require('dotenv').config();

module.exports = {
  appName: `Psy Enfant Ado`,
  appDescription: `En parler, c’est déjà se soigner. 
  Faites bénéficier votre enfant d’un accompagnement psychologique gratuit`,
  port: process.env.PORT || 8080,
  contactEmail: process.env.CONTACT_EMAIL || 'psyenfantado@beta.gouv.fr',
  databaseUrl: process.env.DATABASE_URL || 'postgres://db:db@localhost:5432/db',
  uuidNamespace: process.env.UUID_NAMESPACE || "979fcd81-2bfd-4640-9ac0-77ed1033ae60", // don't use default
  sentryDNS: process.env.SENTRY_DNS || false,
  demarchesSimplifieesId: process.env.DEMARCHES_SIMPLIFIEES_ID,
  // eslint-disable-next-line max-len
  demarchesSimplifieesIdApiUrl: process.env.DEMARCHES_SIMPLIFIEES_API_URL  || 'https://www.demarches-simplifiees.fr/api/v2/graphql',
  demarchesSimplifieesIdApiToken: process.env.DEMARCHES_SIMPLIFIEES_API_TOKEN,
  demarchesSimplifieesUrl: process.env.DEMARCHES_SIMPLIFIEES_URL,
  secret: process.env.SECRET || 'Angonyx meeki is a moth of the family Sphingidae'
};