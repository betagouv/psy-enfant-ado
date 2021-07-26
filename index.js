require('dotenv').config();

const bodyParser = require('body-parser');
const express = require('express');
const expressSanitizer = require('express-sanitizer');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const config = require('./config');
const sentry = require('./services/sentry');

const { appName } = config;
const { appDescription } = config;
const appRepo = 'https://github.com/betagouv/psy-enfant-ado';

const app = express();
const landingController = require('./controllers/landing-controller');
const psyListingController = require('./controllers/psy-listing-controller');
const faqController = require('./controllers/faq-controller');

app.use(require('./services/helmet'));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(flash());
app.use(cookieParser(config.secret));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use('/robots.txt', express.static('static/robots.txt'));

function setNoIndexHeaders(res) {
  res.setHeader('X-Robots-Tag', 'noindex');
}

app.use('/static/documents', express.static('static/documents'));
app.use('/static/gouvfr', express.static(
  path.join(__dirname, 'node_modules/@gouvfr/dsfr/dist'), { setHeaders: setNoIndexHeaders }
));
app.use('/static/polyfill', express.static(
  path.join(__dirname, 'node_modules/promise-polyfill/dist'), { setHeaders: setNoIndexHeaders }
));
app.use('/static/tabulator-tables', express.static('./node_modules/tabulator-tables/dist', { setHeaders: setNoIndexHeaders }));
app.use('/static', express.static('static', { setHeaders: setNoIndexHeaders }));

app.use(session({
  cookie: { maxAge: 60000 },
  secret: config.secret,
  resave: false,
  saveUninitialized: false,
  maxAge: parseInt(config.sessionDurationHours) * 60 * 60 * 1000,
}));

app.use(expressSanitizer());
app.use((req, res, next) => {
  res.locals.appName = appName;
  res.locals.appDescription = appDescription;
  res.locals.appDescriptionFull = `${appDescription} Le « forfait 100% psy enfants » donne accès à 10 séances de `
    + 'psychologie sans avance de frais pour tous les enfants de 3 à 17 ans.';
  res.locals.appRepo = appRepo;
  res.locals.page = req.url;
  res.locals.contactEmail = config.contactEmail;
  res.locals.errors = req.flash('error');
  res.locals.infos = req.flash('info');
  res.locals.successes = req.flash('success');

  let userAgent = req.get('User-Agent') || '';
  userAgent = userAgent.toLowerCase();
  res.locals.isIE = (userAgent.indexOf('msie') !== -1 || userAgent.indexOf('trident') !== -1);

  next();
});

app.get('/', landingController.getLanding);
app.get('/psychologue', landingController.getPsy);
app.get('/faq', faqController.getFaq);

app.get('/parent', psyListingController.getPsychologistParent);
app.get('/trouver-un-psychologue', psyListingController.getPsychologistPage);

app.get('/mentions-legales', (req, res) => {
  res.render('legal-notice', {
    pageTitle: 'Mentions Légales',
  });
});

app.get('/donnees-personnelles-et-gestion-des-cookies', (req, res) => {
  res.render('donnees-personnelles-et-gestion-des-cookies', {
    pageTitle: 'Données personnelles',
  });
});

app.get('*', (req, res) => {
  res.redirect('/');
});

sentry.initCaptureConsoleWithHandler(app);

module.exports = app.listen(config.port, () => {
  console.log(`${appName} listening at http://localhost:${config.port}`);
});
