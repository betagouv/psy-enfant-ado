require('dotenv').config();

module.exports = {
  appName: `Psy Enfant Ado`,
  appDescription: `En parler, c’est déjà se soigner. 
  Faites bénéficier votre enfant d’un accompagnement psychologique gratuit`,
  port: process.env.PORT || 8080,
  contactEmail: process.env.CONTACT_EMAIL || 'psyenfantado@beta.gouv.fr',
  sentryDNS: process.env.SENTRY_DNS || false,
  demarchesSimplifieesUrl: process.env.DEMARCHES_SIMPLIFIEES_URL,
  secret: process.env.SECRET || 'Angonyx meeki is a moth of the family Sphingidae'
};