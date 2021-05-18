require('dotenv').config();

const bodyParser = require('body-parser');
const express = require('express');
const expressSanitizer = require('express-sanitizer');
const path = require('path');
const session = require('express-session');

const config = require('./config');
const sentry = require('./services/sentry');

const appName = config.appName;
const appDescription = 'Accompagnement psychologique pour les enfants et les adolescents';
const appRepo = 'https://github.com/betagouv/psy-enfant-ado';

const app = express();
const landingController = require('./controllers/landing-controller');
const faqController = require('./controllers/faq-controller');

app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use('/static', express.static('static'));
app.use('/static/gouvfr', express.static(
  path.join(__dirname, 'node_modules/@gouvfr/dsfr/dist'))
);
app.use('/static/jquery', express.static(
  path.join(__dirname, 'node_modules/jquery/dist'))
);

app.use(session({
  cookie: { maxAge: 60000 },
  secret: config.secret,
  resave: false,
  saveUninitialized: false,
  maxAge: parseInt(config.sessionDurationHours) * 60 * 60 * 1000
}));

app.use(expressSanitizer());

app.use(function populate (req, res, next) {

  res.locals.appName = appName;
  res.locals.appDescription = appDescription;
  res.locals.appRepo = appRepo;
  res.locals.page = req.url;
  res.locals.contactEmail = config.contactEmail;
  next();
});

app.get('/', async (req, res) => {
  res.render('coming-soon');
});
app.get('/landing', landingController.getLanding);
app.get('/faq', faqController.getFaq);

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

app.get('*', function redirect404 (req, res) {
  res.redirect('/');
});

sentry.initCaptureConsoleWithHandler(app);

module.exports = app.listen(config.port, () => {
  console.log(`${appName} listening at http://localhost:${config.port}`);
});
