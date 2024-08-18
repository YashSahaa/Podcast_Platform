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
  apiKey: "AIzaSyAepiBqkC5zydWOju22ReUAU_cevBe-YAw",
  authDomain: "podcast-app-35fa0.firebaseapp.com",
  projectId: "podcast-app-35fa0",
  storageBucket: "podcast-app-35fa0.appspot.com",
  messagingSenderId: "891831382462",
  appId: "1:891831382462:web:16224c582aafcca285c9ef",
  measurementId: "G-0DFSXGTPDK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export {auth,db,storage};