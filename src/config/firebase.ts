// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Optionally import the services that you want to use
 import {getAuth} from 'firebase/auth';
// import {...} from 'firebase/database';
// import {...} from 'firebase/firestore';
// import {...} from 'firebase/functions';
// import {...} from 'firebase/storage';
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAHPm_BMYlEnKCksfJC9BCcUqROdsR8aVI",
  authDomain: "smartecommerce-81e43.firebaseapp.com",
  projectId: "smartecommerce-81e43",
  storageBucket: "smartecommerce-81e43.firebasestorage.app",
  messagingSenderId: "461306973430",
  appId: "1:461306973430:web:878a7bed81e2303ec870d7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };