import app from "./firebase";

import {

  getAuth,

  createUserWithEmailAndPassword,

  signInWithEmailAndPassword

} from "firebase/auth";

const auth = getAuth(app);

export async function register(email,password){

  return await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
}

export async function login(email,password){

  return await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
}