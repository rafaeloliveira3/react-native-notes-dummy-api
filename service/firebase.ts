// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

interface AuthParams {
  user: string;
  password: string;
}

export const userAuth = ({ user, password }: AuthParams) => {};
