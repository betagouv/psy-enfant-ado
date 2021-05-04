require('dotenv').config();

const bodyParser = require('body-parser');
const express = require('express');
const expressSanitizer = require('express-sanitizer');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');

const config = require('./config');

const appName = config.appName;
const appDescription = 'Accompagnement psychologique pour les enfants et les adolescents';
const appRepo = 'https://github.com/betagouv/psy-enfant-ado';

const app = express();
const landingController = require('./controllers/landing-controller');
const faqController = require('./controllers/faq-controller');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(flash());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use('/static', express.static('static'));
app.use('/static/gouvfr', express.static(
  path.join(__dirname, 'node_modules/@gouvfr/dsfr/dist'))
);
app.use('/static/jquery', express.static(
  path.join(__dirname, 'node_modules/jquery/dist'))
);

app.use(session({ cookie: { maxAge: 60000 },
  secret: config.secret,
  resave: false,
  saveUninitialized: false,
  maxAge: parseInt(config.sessionDurationHours) * 60 * 60 * 1000}));
app.use(flash());

app.use(expressSanitizer());

app.use(function populate (req, res, next) {

  res.locals.appName = appName;
  res.locals.appDescription = appDescription;
  res.locals.appRepo = appRepo;
  res.locals.page = req.url;
  res.locals.contactEmail = config.contactEmail;
  res.locals.errors = req.flash('error');
  res.locals.infos = req.flash('info');
  res.locals.successes = req.flash('success');
  next();
});

app.get('/', landingController.getLanding);
app.get('/faq', faqController.getFaq);

app.get('/mentions-legales', (req, res) => {
  res.render('legalNotice', {
    pageTitle: 'Mentions Légales',
  });
});

app.get('*', function redirect404 (req, res) {
  req.flash('error', 'Cette page n\'existe pas.');
  res.redirect('/');
});

module.exports = app.listen(config.port, () => {
  console.log(`${appName} listening at http://localhost:${config.port}`);
});
