
const FAQ = require('../data/faq')
module.exports.getFaq = async function getFaq(req, res) {
  res.render('faq', {faq : FAQ});
};
