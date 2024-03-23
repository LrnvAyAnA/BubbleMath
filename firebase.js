import {initializeApp, getApp} from "firebase/app";
import { getAuth,initializeAuth,getReactNativePersistence } from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import { ReactNativeAsyncStorage } from '@react-native-async-storage/async-storage'; 

const firebaseConfig = {
  apiKey: "AIzaSyCkfrqPqlv1e9G5zlu0I0-XJN5fRU0TR3k",
  authDomain: "bubblemath-9dff8.firebaseapp.com",
  projectId: "bubblemath-9dff8",
  storageBucket: "bubblemath-9dff8.appspot.com",
  messagingSenderId: "1025806892023",
  appId: "1:1025806892023:web:a650e7268d03a26a5e0cf2",
  measurementId: "G-M2RQ85E8FL"
};

// // Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
//export const FirebaseAuth = getAuth(FirebaseApp);
export const FirestoreDB = getFirestore(FirebaseApp);
export const FirebaseAuth = initializeAuth(FirebaseApp, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});