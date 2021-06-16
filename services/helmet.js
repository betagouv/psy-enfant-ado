const helmet = require('helmet');

module.exports = helmet.contentSecurityPolicy({
  directives: {
    ...helmet.contentSecurityPolicy.getDefaultDirectives(),
    'script-src': ["'self'", 'https://stats.data.gouv.fr/', 'https://www.googletagmanager.com'],
    'script-src-attr': ["'unsafe-inline'"],
    'img-src': ["'self'", 'https://stats.data.gouv.fr/', 'data:', 'https://*.fls.doubleclick.net/'],
    'frame-src': ["'self'", 'https://stats.data.gouv.fr/', 'https://*.fls.doubleclick.net/']
  },
});
