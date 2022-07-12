// npm install firebase

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDnaUcEaZCutzJ7-CkcLhocjjkvlfY-frw",
  authDomain: "streamz-aece8.firebaseapp.com",
  projectId: "streamz-aece8",
  storageBucket: "streamz-aece8.appspot.com",
  messagingSenderId: "206287875377",
  appId: "1:206287875377:web:afa65129f8e72cfc8c1410",
  measurementId: "G-JMZJ4Z0HSX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);