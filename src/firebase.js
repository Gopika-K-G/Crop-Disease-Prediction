// src/firebase.js

import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyClr2zsiOXQULmUrL8NMqMIRrfjHTwdnfA",
    authDomain: "project-e16bb.firebaseapp.com",
    projectId: "project-e16bb",
    storageBucket: "project-e16bb.appspot.com",
    messagingSenderId: "210386052158",
    appId: "1:210386052158:web:759638959763bdf16e5d6f",
    measurementId: "G-8139CWVR5W"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the auth service
const auth = getAuth(app);

// Create a Google Auth Provider
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
