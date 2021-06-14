/* eslint-disable max-len */
const config = require('../../config');

module.exports = [
  {
    q: 'Quels sont les tarifs pour ce dispositif ?',
    r: 'Les tarifs sont de 32€ pour l’entretien initial d’évaluation et 22€ pour les autres séances de prise en charge psychologique. Ainsi, vous êtes rémunérés à hauteur de 230€, en cas de réalisation de la totalité du parcours. <br/>'
      + 'A titre indicatif, le temps d’un entretien initial d’évaluation est estimé à 45 minutes. Le temps d’une séance de prise en charge psychologique est estimé à 30 min. <br/>'
      + 'Les séances seront prises en charge sans application du ticket modérateur et donc à « 100% » dans le cadre de ce dispositif. <br/>'
      + 'Aussi, vous facturez les séances aux tarifs proposés et remboursés par l’Assurance Maladie. Aucun dépassement ne peut être demandé au patient et ne sera possible conformément au consentement à la convention signé lors de l’adhésion au dispositif. <br/>'
      + 'Après la fin de la prise en charge proposée dans ce dispositif, si vous considérez que des séances complémentaires sont nécessaires vous devez alors informer, clairement et loyalement, le titulaire de l’autorité parentale sur les montants desdites séances et sur l’absence de financement par l’Assurance Maladie. ',
  },
  {
    q: 'Comment ont été fixés les tarifs ?',
    r: 'S’agissant d’un dispositif national, le tarif doit être le même sur l’ensemble du territoire. Ces tarifs sont identiques à ceux de plusieurs dispositifs telle que l’expérimentation portée actuellement dans 4 départements par l’Assurance Maladie  « troubles en santé mentale d’intensité légère à modérée » chez l’adulte ou encore le dispositif de renforcement en psychologues dans les Maisons de Santé pluriprofessionnelles et les Centres de Santé  (mesure 31 du Ségur).<br/>'
      + 'Ils se basent sur des durées estimatives pour la prise en charge de patients légers à modérés dans le cadre d’un accompagnement psychologique de soutien.',
  },
  {
    q: 'Qu’est-ce que l’accompagnement psychologique de soutien ?',
    r: 'L’accompagnement psychologique de soutien est une thérapie non codifiée dans sa technique, car non directive. Elle représente une forme de thérapie relationnelle.<br/>'
      + 'Elle est basée sur l\'empathie, la confiance, le soutien. Elle comprend une dimension de conseil, d\'information et d\'explications, permettant une compréhension partagée de la problématique de la personne (et de son entourage).<br/>'
      + 'Une écoute active facilitant l\'expression du patient (et de sa famille) en fait un outil thérapeutique à part entière vers un changement comportemental, affectif ou émotionnel.<br/>'
      + 'Elle trouve son indication dans les états pathologiques d’intensité légère mais peut être utilisée dans les autres états.<br/>'
      + 'La Haute Autorité de Santé recommande le recours à la thérapie de soutien en première intention dans la prise en charge de la dépression de l’adolescent. (Sources : HAS - Recommandations : Manifestations dépressives à l’adolescence : repérage, diagnostic et prise en charge en soins de premier recours - Novembre 2014).',
  },
  {
    q: 'Comment se passe le remboursement ? Dans quel délai ?',
    r: 'Après validation de votre participation au dispositif, vous recevrez la convention signée par l’Assurance Maladie, ainsi que les modalités de facturation, avec notamment  la feuille de soins spécifique à ce parcours. Après la dernière séance de prise en charge, vous transmettez directement la prescription du médecin et la feuille de soins à la Caisse Primaire d’Assurance Maladie de rattachement du patient. L’envoi des feuilles de soins à la caisse va déclencher les opérations de paiement. Le paiement intervient dans les jours qui suivent la réception de la feuille de soins et de l’ordonnance<br/>'
      + 'Dans le cadre de ce dispositif, les séances réalisées après le 31 janvier 2022 ne pourront donner lieu à aucun remboursement.',
  },
  {
    q: 'Je participe déjà à d’autres dispositifs (chèque psy étudiants ou à l’expérimentation de l’Assurance Maladie, par exemple). Dois-je signer une nouvelle convention ? Puis-je participer à ces différents dispositifs ? ',
    r: 'Oui, il est possible de participer à plusieurs dispositifs toutefois vous devez à chaque fois réaliser un nouveau dossier de candidature pour être conventionné. <br/>'
      + 'A noter, vous pouvez aussi participer au dispositif de renforcement en psychologues des maisons de santé et centres de santé (mesure 31 du Ségur) ou à l’expérimentation Ecout’émoi. <br/>'
      + 'Pour une même séance, vous ne pourrez pas être rémunéré plusieurs fois (dans le cadre de différents dispositifs). ',
  },
  {
    q: 'Concrètement, comment remplir la feuille de soins à envoyer à la CPAM pour remboursement ?',
    r: 'Les modalités de facturation et de remboursement sont détaillées dans le guide pratique mis à disposition des psychologues. ',
  },
  {
    q: 'Pourquoi la psychothérapie est-elle prescrite par les médecins ? Pourquoi une prescription est nécessaire ? ',
    r: 'Les psychologues ne constituent pas aujourd’hui une profession de santé reconnue par le code de la Santé Publique, ni médicale, ni paramédicale. Seuls les actes réalisés par une profession médicale peuvent être remboursés sans prescription médicale. Dans ces conditions et pour ce dispositif d’urgence, en conformité avec les règles comptables de l’Assurance Maladie, une prescription médicale est donc obligatoire pour le remboursement des actes de soutien psychologique.',
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
