import { initializeApp } from
"https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";

import { getAuth } from
"https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";

import { getFirestore } from
"https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC6_etmZoM6CoZUTCxvC95IUg0gNGVSo1U",
  authDomain: "territory-runner-7e748.firebaseapp.com",
  projectId: "territory-runner-7e748",
  storageBucket: "territory-runner-7e748.firebasestorage.app",
  messagingSenderId: "241903222539",
  appId: "1:241903222539:web:824dafd88ae32348382c0e",
  measurementId: "G-QDFQ73CMPY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const app=initializeApp(firebaseConfig);

export const auth=getAuth(app);
export const db=getFirestore(app);
