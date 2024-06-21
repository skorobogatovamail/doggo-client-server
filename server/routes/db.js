const admin = require('firebase-admin');

const serviceAccount = require('../airbnc-aff91-firebase-adminsdk-67ky1-2fda4f6582.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
});
const db = admin.database();

module.exports = db;
