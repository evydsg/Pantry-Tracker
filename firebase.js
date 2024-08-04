// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCAMVfCMw5gMJiDaiZAI6eRQhfAwrNC3J4",
  authDomain: "pantry-tracker-f7681.firebaseapp.com",
  projectId: "pantry-tracker-f7681",
  storageBucket: "pantry-tracker-f7681.appspot.com",
  messagingSenderId: "1039068407692",
  appId: "1:1039068407692:web:3d8f929f070257cc7058a9",
  measurementId: "G-0N1CZP8B2M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore(app);

export{firestore};