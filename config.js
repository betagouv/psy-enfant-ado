require('dotenv').config();

module.exports = {
  appName: `Psy Enfant Ado`,
  port: process.env.PORT || 8080,
  contactEmail: process.env.CONTACT_EMAIL || 'psyenfantado@beta.gouv.fr',
  databaseUrl: process.env.DATABASE_URL || 'postgres://db:db@localhost:5432/db',
  uuidNamespace: process.env.UUID_NAMESPACE || "979fcd81-2bfd-4640-9ac0-77ed1033ae60", // used to generate uuid
  sentryDNS: process.env.SENTRY_DNS || false,
  demarchesSimplifieesUrl: process.env.DEMARCHES_SIMPLIFIEES_URL,
  secret: process.env.SECRET || 'Angonyx meeki is a moth of the family Sphingidae'
};
