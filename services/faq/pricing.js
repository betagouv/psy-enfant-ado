/* eslint-disable max-len */
const config = require('../../config');

module.exports = [
  {
    q: 'Comment se passe le remboursement ? Dans quel délai ?',
    r: 'Après validation de votre participation au dispositif, vous recevrez la convention signée par l’Assurance Maladie, ainsi que les modalités de facturation, avec notamment la feuille de soins spécifique à ce parcours. Après la dernière séance de prise en charge, vous transmettez directement la prescription du médecin et la feuille de soins à votre Caisse Primaire d’Assurance Maladie de rattachement. L’envoi des feuilles de soins à la caisse va déclencher les opérations de paiement. Le paiement intervient dans les jours qui suivent la réception de la feuille de soins et de l’ordonnance<br/>'
      + 'Dans le cadre de ce dispositif, les séances réalisées après le 31 janvier 2022 ne pourront donner lieu à aucun remboursement.',
  },
  {
    q: 'Concrètement, comment remplir la feuille de soins à envoyer à la CPAM pour remboursement ?',
    r: 'Les modalités de facturation et de remboursement sont détaillées dans le guide pratique mis à disposition des psychologues. ',
  },
  {
    q: 'Qu’est-il envisagé en cas d’absence d’un patient alors qu’il était attendu ? les psychologues seront-ils payés ?',
    r: 'Dans le cadre de dispositif, si le patient ne vient pas à la séance, le psychologue ne peut facturer un acte à l’Assurance Maladie. En effet, seuls les actes réalisés peuvent être facturés et remboursés par l’Assurance Maladie. ',
  },
  {
    q: 'Vous ne trouvez pas la réponse à votre question ici ?',
    r: 'Si vous êtes déjà partenaire du dispositif, nous vous invitons à contacter votre organisme d’Assurance Maladie par téléphone au 3608.<br/>'
      + `Si vous n’êtes pas encore partenaire du dispositif et que vous n’avez pas trouvé de réponses à vos questions s’agissant de l’éligibilité et/ou du dossier de candidature, nous vous invitons à contacter l’adresse ${config.contactEmail}.`,
  },
];
