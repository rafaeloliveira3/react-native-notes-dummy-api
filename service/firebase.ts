import { initializeApp } from "firebase/app";
import {
  initializeAuth,
  signInWithEmailAndPassword,
  getReactNativePersistence,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: "react-native-ambient",
  storageBucket: "react-native-ambient.firebasestorage.app",
  messagingSenderId: "508390684716",
  appId: "1:508390684716:web:a1c5b13c8eea125823f989",
  measurementId: "G-T7GE63B8LJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

interface AuthParams {
  email: string;
  password: string;
}

export const userAuth = async ({ email, password }: AuthParams) => {
  return await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      return { error: false, userID: user.uid };
    })
    .catch((error) => {
      return { error: true, userID: null };
    });
};

export const userCreate = async ({ email, password }: AuthParams) => {
  return await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      return { error: false, userID: user.uid };
    })
    .catch((error) => {
      return { error: true, userID: null };
    });
};
