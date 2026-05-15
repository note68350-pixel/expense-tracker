// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDVb8nhkcfFuvvSp_ov7fkVmt2ihwqk19o",
  authDomain: "expense-tracker-eaba8.firebaseapp.com",
  projectId: "expense-tracker-eaba8",
  storageBucket: "expense-tracker-eaba8.firebasestorage.app",
  messagingSenderId: "406037044423",
  appId: "1:406037044423:web:d6aecc9f60d5e20ca8b2e2",
  measurementId: "G-KBGTD51K3D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);