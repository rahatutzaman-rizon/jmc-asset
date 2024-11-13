// src/firebase/config.js

// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBOL02UTdAouYrt4OMzbI7YnOetvyRPRFk",
  authDomain: "jmc-asset-management-ltd.firebaseapp.com",
  projectId: "jmc-asset-management-ltd",
  storageBucket: "jmc-asset-management-ltd.appspot.com",
  messagingSenderId: "890700506334",
  appId: "1:890700506334:web:cd8ecce3eb6424a2ed0e4f"
};

// Initialize Firebase (check if already initialized to avoid errors)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
 export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export default auth;
