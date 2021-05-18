const config = require('../config');

module.exports.getLanding = async function getLanding(req, res) {
  const formUrl = config.demarchesSimplifieesUrl;

  res.render('landing', {formUrl});
};
