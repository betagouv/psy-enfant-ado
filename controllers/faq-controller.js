const FAQ = require('../services/faq/faq-service');

module.exports.getFaq = async function getFaq(req, res) {
  res.render('faq', { faq: FAQ });
};
