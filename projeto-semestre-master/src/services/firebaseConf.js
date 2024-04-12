import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC1NllY7d0dqwHZfsJ2sHBlyAYqQN5WvFI",
  authDomain: "aula-ronan-66670.firebaseapp.com",
  projectId: "aula-ronan-66670",
  storageBucket: "aula-ronan-66670.appspot.com",
  messagingSenderId: "419467540859",
  appId: "1:419467540859:web:696c6d7fae33da9a9c25de"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db