// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDB2gdWSQiVFqE_iiM9wCFlPfz_nsItwY4",
  authDomain: "expense-claim-app-619e1.firebaseapp.com",
  databaseURL: "https://expense-claim-app-619e1-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "expense-claim-app-619e1",
  storageBucket: "expense-claim-app-619e1.appspot.com",
  messagingSenderId: "1038930557644",
  appId: "1:1038930557644:web:7c08640f82709b73a6a069",
  measurementId: "G-Y2VMM0DBGB"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const storage = getStorage(app, "gs://expense-claim-app-619e1.appspot.com");

// Initialize Services
export {auth, storage}; 
export default getFirestore();