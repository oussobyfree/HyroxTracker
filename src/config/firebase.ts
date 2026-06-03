import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSy...HgGM",
  authDomain: "babytracker-3ecd1.firebaseapp.com",
  projectId: "babytracker-3ecd1",
  storageBucket: "babytracker-3ecd1.firebasestorage.app",
  messagingSenderId: "693419259270",
  appId: "1:693419259270:android:cd0e2ca7bdb5186af16807"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
