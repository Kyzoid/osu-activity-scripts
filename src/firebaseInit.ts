import admin from 'firebase-admin';
import { initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getDatabase } from 'firebase-admin/database';

const config = {
  credential: admin.credential.cert('./firebase-adminsdk.json'),
  databaseURL: process.env.DATABASE_URL,
};

const app = initializeApp(config);
const db = getFirestore();
const rt = getDatabase();

export { app, db, rt };