const cron = require('cron');
const cronDemarchesSimplifiees = require('./cron-demarches-simplifiees');
const config = require('../config');
const sentry = require('../services/sentry');

sentry.initCaptureConsole();

const jobs = [
  {
    cronTime: '*/5 * * * *', // every 5 minutes
    onTick: cronDemarchesSimplifiees.importLatestDataFromDSToPG,
    start: true,
    timeZone: 'Europe/Paris',
    isActive: config.featureImportData,
    name: 'Import latest data from DS API to PG',
  },
  {
    cronTime: '0 */3 * * *', // every 3 hours
    onTick: cronDemarchesSimplifiees.importEveryDataFromDSToPG,
    start: true,
    runOnInit: true,
    timeZone: 'Europe/Paris',
    isActive: config.featureImportData,
    name: 'Import ALL data from DS API to PG',
  },
];

let activeJobs = 0;
for (const job of jobs) {
  if (job.isActive) {
    console.log(`🚀 The job "${job.name}" is ON ${job.cronTime}`);
    new cron.CronJob(job);
    activeJobs++;
  } else {
    console.log(`❌ The job "${job.name}" is OFF`);
  }
}

console.log(`Started ${activeJobs} cron jobs`);
