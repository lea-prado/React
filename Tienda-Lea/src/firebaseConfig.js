// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAYnIDDiYkbtaIaj38EBlZHwAlxVEE_E1U",
  authDomain: "react-db-d5e5c.firebaseapp.com",
  projectId: "react-db-d5e5c",
  storageBucket: "react-db-d5e5c.firebasestorage.app",
  messagingSenderId: "986995366043",
  appId: "1:986995366043:web:2d99945e7408bf739d0e3e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);