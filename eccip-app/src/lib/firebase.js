// Import the functions you need from the SDKs you need
import { deleteApp, getApps, initializeApp, FirebaseApp } from 'firebase/app';
import { getDatabase } from "firebase/database";
import { GoogleAuthProvider, getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: import.meta.env.apiKey,
	authDomain: import.meta.env.authDomain,
	databaseURL: import.meta.env.databaseURL,
	projectId: import.meta.env.projectId,
	storageBucket: import.meta.env.storageBucket,
	messagingSenderId: import.meta.env.messagingSenderId,
	appId: import.meta.env.appId
  };

// Initialize Firebase
const firebaseApp= initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();