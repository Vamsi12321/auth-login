// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAVZBD-rIDBJ4T7K5CUv_9hFn2si1KmRhk",
  authDomain: "login-auth-2aed7.firebaseapp.com",
  projectId: "login-auth-2aed7",
  storageBucket: "login-auth-2aed7.appspot.com",
  messagingSenderId: "283986802145",
  appId: "1:283986802145:web:13a7244c5d8a90ecd24ea0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
export default app;
