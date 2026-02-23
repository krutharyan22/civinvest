// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// REPLACE WITH YOUR OWN CONFIGURATION
const firebaseConfig = {
  apiKey: "AIzaSyDAWEDCdbjCKBLHW94FwRGPtAdRCp8JCnM",
  authDomain: "infrabonds-934ba.firebaseapp.com",
  projectId: "infrabonds-934ba",
  storageBucket: "infrabonds-934ba.firebasestorage.app",
  messagingSenderId: "387589628536",
  appId: "1:387589628536:web:9016392bf8b28c1ad6038d",
};
// Initialize Firebase

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
