import 'dotenv/config';
import firebase from './private.js';

export default {
  port: process.env.PORT,
  cred: firebase,
  bucket: 'gs://instagram-clone-de7d7.appspot.com',
};
