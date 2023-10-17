import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = { 
  apiKey : "AIzaSyBitBAtNweqeTYwB2ZuUSAqJWaNmDXn2Os" , 
  authDomain : "webscrapper-d7595.firebaseapp.com" , 
  projectId : "webscrapper-d7595" , 
  storageBucket : "webscrapper-d7595.appspot.com" , 
  messagingSenderId : "4100057134" , 
  appId : "1:4100057134:web:103859b02be1c4b0f4d7bf" , 
  measurementId : "G-EHZHQ4SG9L" 
};


const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };