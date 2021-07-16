const config = require('../config');

const formUrl = config.demarchesSimplifieesUrl;

module.exports.getLanding = async function getLanding (req, res) {

  res.render('landing', { formUrl, config });
};

module.exports.getParent = async function getParent (req, res) {

  res.render('parents', { formUrl, config });
};

module.exports.getPsy = async function getParent (req, res) {

  res.render('psy', { formUrl, config });
};
