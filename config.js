require('dotenv').config();

module.exports = {
  appName: `Psy Enfant Ado`,

  port: process.env.PORT || 8080,
  contactEmail: process.env.CONTACT_EMAIL || 'psyenfantado@beta.gouv.fr',
  demarchesSimplifieesUrl: process.env.DEMARCHES_SIMPLIFIEES_URL,
  secret: process.env.SECRET || 'Angonyx meeki is a moth of the family Sphingidae'
};
