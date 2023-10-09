// import firebase from 'firebase';
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
// import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCJNcX2TAEceDB827_r99L1eerUfmFBdqI",
  authDomain: "whatsapp-mern-3ec3b.firebaseapp.com",
  projectId: "whatsapp-mern-3ec3b",
  storageBucket: "whatsapp-mern-3ec3b.appspot.com",
  messagingSenderId: "329591428460",
  appId: "1:329591428460:web:c87abd737e91d9ca490f49",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
 
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;