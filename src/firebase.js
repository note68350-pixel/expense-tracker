import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDVb8nhkcfFuvvSp_ov7fkVmt2ihwqk19o",
  authDomain: "expense-tracker-eaba8.firebaseapp.com",
  projectId: "expense-tracker-eaba8",
  storageBucket: "expense-tracker-eaba8.firebasestorage.app",
  messagingSenderId: "406037044423",
  appId: "1:406037044423:web:d6aecc9f60d5e20ca8b2e2",
  measurementId: "G-KBGTD51K3D"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);