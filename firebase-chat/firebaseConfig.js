import { initializeApp } from 'firebase/app';
import { initializeAuth } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getReactNativePersistence } from '@firebase/auth/dist/rn/index.js';
import { getFirestore, collection } from 'firebase/firestore';
import { FIREBASE_API_KEY, FIREBASE_AUTH_DOMAIN, FIREBASE_PROJECT_ID, FIREBASE_STORAGE_BUCKET, FIREBASE_MESSAGING_SENDER_ID, FIREBASE_APP_ID } from '@env';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  appId: FIREBASE_APP_ID
};

// Initialize Firebase
let app;
try {
  app = initializeApp(firebaseConfig);
  console.log("Firebase app initialized");
} catch (error) {
  console.error("Error initializing Firebase app:", error);
}

// Initialize Firebase Auth with React Native Persistence
let auth;
try {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
  });
  console.log("Firebase Auth initialized with persistence");
} catch (error) {
  console.error("Error initializing Firebase Auth:", error);
}

// Initialize Firestore
let db;
try {
  db = getFirestore(app);
  console.log("Firestore initialized");
} catch (error) {
  console.error("Error initializing Firestore:", error);
}

// References to Firestore collections
let usersRef;
let roomsRef;
try {
  usersRef = collection(db, 'users');
  roomsRef = collection(db, 'rooms');
  console.log("Firestore collections references initialized");
} catch (error) {
  console.error("Error getting Firestore collection references:", error);
}

export { auth, db, usersRef, roomsRef };
