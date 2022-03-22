import admin from 'firebase-admin';
import config from './config.js';

const serviceAccount = config.cred;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: config.bucket,
});

export const db = admin.firestore();
export const bucket = admin.storage().bucket();
