



import { initializeApp } from "firebase/app";
import {
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAHPm_BMYlEnKCksfJC9BCcUqROdsR8aVI",
  authDomain: "smartecommerce-81e43.firebaseapp.com",
  projectId: "smartecommerce-81e43",
  storageBucket: "smartecommerce-81e43.firebasestorage.app",
  messagingSenderId: "461306973430",
  appId: "1:461306973430:web:878a7bed81e2303ec870d7"
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

const db = getFirestore(app);

export { auth, db };
