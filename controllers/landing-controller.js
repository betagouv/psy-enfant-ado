const config = require('../config');

const formUrl = config.demarchesSimplifieesUrl;

module.exports.getLanding = async function getLanding (req, res) {

  res.render('landing', { formUrl, config });
};

module.exports.getPsy = async function getPsy (req, res) {

  res.render('psy', { formUrl, config });
};
