const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://puntsag.firebaseio.com'
});
const firebase = admin.firestore();
const auth = admin.auth()

module.exports = {firebase, auth};
