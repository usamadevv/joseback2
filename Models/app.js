const admin = require("firebase-admin");
const serviceAccount = require('../serviceaccount.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "gs://superstar-24f98.appspot.com"
});