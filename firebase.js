// Import the functions you need from the SDKs you need
import { initializeApp} from "firebase/app";
import { getAuth,initializeAuth,getReactNativePersistence } from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCkfrqPqlv1e9G5zlu0I0-XJN5fRU0TR3k",
  authDomain: "bubblemath-9dff8.firebaseapp.com",
  projectId: "bubblemath-9dff8",
  storageBucket: "bubblemath-9dff8.appspot.com",
  messagingSenderId: "1025806892023",
  appId: "1:1025806892023:web:a650e7268d03a26a5e0cf2",
  measurementId: "G-M2RQ85E8FL"
};

// Initialize Firebase
const FirebaseApp = initializeApp(firebaseConfig);
const FirebaseAuth = getAuth(FirebaseApp);
const FirestoreDB = getFirestore(FirebaseApp);

// Инициализация Firebase Auth с использованием AsyncStorage для хранения состояния
const auth = initializeAuth(FirebaseAuth, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export { FirebaseApp, FirebaseAuth, FirestoreDB, auth };
