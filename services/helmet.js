const config = require('../config');
const helmet = require('helmet');

module.exports = helmet.contentSecurityPolicy({
  directives: {
    ...helmet.contentSecurityPolicy.getDefaultDirectives(),
    'script-src': ["'self'", 'https://stats.data.gouv.fr/', `'nonce-${config.nonceId}'`],
    'img-src': ["'self'", 'https://stats.data.gouv.fr/', 'data:'],
    'frame-src': ["'self'", 'https://stats.data.gouv.fr/', 'https://*.fls.doubleclick.net/']
  },
});
