/* eslint-disable max-len */

const config = require('../../config')
module.exports = [
  {
    q: 'A partir de quand vos enfants peuvent-ils bénéficier du dispositif ?',
    r: 'Vos enfants pourront bénéficier du dispositif dès la mise en ligne de l’annuaire des psychologues volontaires, au début du mois de juin.'
  },
  {
    q: 'Mon enfant est en souffrance et il a besoin d’une aide psychologique. Que dois-je faire ?',
    r: 'Pour bénéficier de séances intégralement prises en charge par l’Assurance Maladie, vous et votre enfant devez consulter un médecin (celui qui suit habituellement votre enfant, par exemple). A la suite de ce rendez-vous, votre médecin vous orientera en cas de besoin vers un psychologue partenaire du dispositif. Vous pouvez consulter la liste des psychologues sur le site psyenfantado.sante.gouv.fr.<br />' +
      'Dans tous les cas, si vous êtes inquiets, consultez rapidement votre médecin traitant avec votre enfant. Il pourra vous dire si votre enfant relève d’un suivi avec un psychologue ou s’il faut mieux consulter un psychiatre ou un service spécialisé. Si vous êtes très inquiet et craignez un geste suicidaire ou de violence, appelez le SAMU.'
  },
  {
    q: 'Puis-je prendre rendez-vous directement chez le psychologue pour mon enfant?',
    r: 'Dans le cadre du dispositif PsyEnfantAdo et pour bénéficier d’une prise en charge à 100% par l’assurance maladie vous ne pouvez pas consulter directement un psychologue pour votre enfant. Vous devez en premier lieu consulter un médecin qui vous orientera vers un psychologue partenaire de la démarche. Le médecin vous remettra une ordonnance nécessaire pour bénéficier de la prise en charge des séances de soutien psychologique.'
  },
  {
    q: 'Après avoir consulté mon médecin, puis-je prendre rendez-vous pour mon enfant chez le psychologue de mon choix ?',
    r: 'Oui, mais seulement parmi les psychologues partenaires du dispositif, disponibles dans l’annuaire dont vous pouvez consulter la liste sur <a href="https://psyenfantado.sante.gouv.fr" target="_blank">psyenfantado.sante.gouv.fr</a>.'
  },
  {
    q: 'Combien de séances sont prises en charge dans le cadre du dispositif ?',
    r: 'Dans le cadre de ce dispositif, les enfants et les adolescents peuvent bénéficier de 10 séances de soutien psychologique, entièrement prises en charge. La prise en charge psychologique débute par un entretien initial d’évaluation réalisé par le psychologue, puis celui-ci proposera 1 à 9 séances d’accompagnement psychologique, en fonction des besoins de l’enfant ou de l’adolescent. A la fin des séances ou en cas de signe d’alerte ou d’absence d’amélioration au cours de la prise en charge, le médecin réévalue l’état de l’enfant ou de l’adolescent et propose des soins plus adaptés si nécessaires. La prise en charge du forfait n’est pas renouvelable.'
  },
  {
    q: 'Dois-je avancer les frais de séances chez le psychologue ?',
    r: 'Non, ce dispositif d’urgence est intégralement pris en charge par l’Assurance Maladie et sans avance de frais pour le patient ni pour sa famille. Aucun supplément ne peut vous être demandé. Le remboursement des séances se fait directement au psychologue qui prend en charge votre enfant. <br />' +
      'Le médecin vous remet une ordonnance, nécessaire pour bénéficier gratuitement de la prise en charge des séances de soutien psychologique.'
  },
  {
    q: 'Jusqu’à quand mon enfant peut-il bénéficier de ce dispositif d’urgence ?',
    r: 'Ce dispositif est un dispositif d’urgence temporaire visant à répondre aux conséquences de la crise sanitaire sur la santé mentale des enfants et adolescents. Le médecin pourra orienter vers un psychologue du dispositif, les enfants et adolescents jusqu’au 31 octobre 2021 (date indiquée sur l’ordonnance). Tandis que les séances pourront être réalisées jusqu’au 31 janvier 2022.'
  },
  {
    q: 'Puis-je changer de psychologue durant le parcours de prise en charge ?',
    r: 'Il est possible de changer de psychologue à votre initiative uniquement après la première séance dite « entretien initial d’évaluation ». Une fois que les séances de soutien psychologique auront débuté vous ne pouvez plus changer de psychologue sauf si celui-ci cesse son activité pour maladie, maternité, accident ou cessation définitive d’activité.'
  },
  {
    q: 'Mon enfant peut-il sortir du dispositif quand il le souhaite ?',
    r: 'Votre enfant peut à tout moment arrêter les séances s’il le souhaite. Il faut alors en informer le psychologue.'
  },
  {
    q: 'Que se passe-t-il s’il ne veut plus se rendre chez le psychologue ?',
    r: 'La prise en charge proposée par le psychologue présuppose la collaboration de votre enfant. Si celui-ci ne souhaite plus se rendre chez le psychologue, la prise en charge peut être interrompue. Cependant si les troubles de votre enfant se sont dégradés, il est indispensable de consulter un pédopsychiatre sans tarder. Les enfants et les adolescents peuvent développer des troubles graves, qui doivent être pris en charge le plus rapidement possible afin d’éviter des crises ou des passages à l‘acte comme une tentative de suicide. Si les troubles sont repérés et pris en charge précocement, les soins sont plus efficaces et le rétablissement est plus facile.'
  },
  {
    q: 'A qui puis-je m’adresser si la prise en charge se passe mal ?',
    r: `Les psychologues ont été sélectionnés selon des critères précis avec des exigences particulières de diplômes, d’expérience et de travail avec les enfants. Néanmoins, très rarement, la prise en charge peut mal se passer. Si un échange avec le professionnel n’est pas suffisant, vous pouvez envoyer un mail à l’adresse support du dispositif ${config.contactEmail}. Nous vous répondrons dans les plus brefs délais.`
  },
  {
    q: 'Vous ne trouvez pas la réponse à votre question ici ?',
    r: 'Nous vous invitons à contacter votre organisme d’Assurance Maladie par téléphone au 3646.'
  }
];