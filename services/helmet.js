const helmet = require('helmet');

module.exports = helmet.contentSecurityPolicy({
  directives: {
    ...helmet.contentSecurityPolicy.getDefaultDirectives(),
    'script-src': ["'self'", 'https://stats.data.gouv.fr/', 'https://forms.sbc08.com', "'unsafe-inline'"],
    'img-src': ["'self'", 'https://stats.data.gouv.fr/', 'data:', 'https://forms.sbc08.com'],
    'default-src': ["'self'", 'https://stats.data.gouv.fr/', 'https://services.sarbacane.com']
  },
});
