// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getFirestore, collection } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAa9nVdGnQVB7S133Klu6JpFcGYR5Ef4OU",
  authDomain: "notes-app-8ba2b.firebaseapp.com",
  projectId: "notes-app-8ba2b",
  storageBucket: "notes-app-8ba2b.appspot.com",
  messagingSenderId: "180155112757",
  appId: "1:180155112757:web:282ede303e2b7f6530407c",
  measurementId: "G-SNZP10GSK8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const notesCollection = collection(db, "notes");
