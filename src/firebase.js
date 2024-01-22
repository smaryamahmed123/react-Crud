// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyArYcFTGRkgjr6aqCf2GNbJt2-F8vIBDHg",
  authDomain: "crud-5ed86.firebaseapp.com",
  databaseURL: "https://crud-5ed86-default-rtdb.firebaseio.com",
  projectId: "crud-5ed86",
  storageBucket: "crud-5ed86.appspot.com",
  messagingSenderId: "315341598922",
  appId: "1:315341598922:web:d0057acd324ed5a90e8433",
  measurementId: "G-TFFDBTZM0J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
export {db, auth}