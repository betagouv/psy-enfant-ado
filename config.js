require('dotenv').config();

module.exports = {
  appName: `Psy Enfant Ado`,

  port: process.env.PORT || 8080,
  teamEmail: process.env.TEAM_EMAIL || 'equipe-santepsyetudiants@beta.gouv.fr',
  contactEmail: process.env.CONTACT_EMAIL || 'contact-santepsyetudiants@beta.gouv.fr',
  secret: process.env.SECRET || 'Angonyx meeki is a moth of the family Sphingidae'
};
