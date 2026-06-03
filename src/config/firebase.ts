import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCrA9-1PHPgl1LLNqNkFdLxaQFAYTk7Oyg",
  authDomain: "hyroxtracker-57d3b.firebaseapp.com",
  projectId: "hyroxtracker-57d3b",
  storageBucket: "hyroxtracker-57d3b.firebasestorage.app",
  messagingSenderId: "162556886490",
  appId: "1:162556886490:android:852626177482d81a4214e3"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
