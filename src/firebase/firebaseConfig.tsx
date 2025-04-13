// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, setDoc, doc } from "firebase/firestore";

import config from "../config";

const firebaseConfig = {
  apiKey: config.REACT_APP_API_KEY,
  authDomain: config.REACT_APP_AUTH_DOMAIN,
  projectId: config.REACT_APP_PROJECT_ID,
  storageBucket: config.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: config.REACT_APP_MESSAGING_SENDER_ID,
  appId: config.REACT_APP_APP_ID,
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };
