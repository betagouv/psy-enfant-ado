const _ = require('lodash');
const DEPS = require('../data/departements.json');
const dbPsychologists = require('../db/psychologists');

const countPsyByDepartments = (psyList) => DEPS.map((dep) => {
  const count = _.filter(psyList, { departement: dep }, 0).length;
  return { name: dep, count };
});

const getPsychologist = async function getPsychologist (req, res, view) {
  try {
    const time = `getting all psychologists from Postgres (query id #${Math.random().toString()})`;
    console.time(time);
    const psyList = await dbPsychologists.getPsychologists();
    console.timeEnd(time);

    res.render(view, {
      psyList,
      deps: countPsyByDepartments(psyList),
    });
  } catch (err) {
    req.flash('error', 'Impossible de récupérer les psychologues. Réessayez ultérieurement.');
    console.error('getPsychologist', err);
    res.render(view, {
      psyList: [],
      deps: DEPS
    });
  }
};

module.exports.getPsychologistPage = async function getPsychologistPage (req, res) {
  getPsychologist(req, res, 'psy-listing');
};

module.exports.getPsychologistParent = async function getPsychologistPage (req, res) {
  getPsychologist(req, res, 'parents');
};
