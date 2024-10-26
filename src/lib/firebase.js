import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "reactchatapplication-e7c60.firebaseapp.com",
  projectId: "reactchatapplication-e7c60",
  storageBucket: "reactchatapplication-e7c60.appspot.com",
  messagingSenderId: "867719856342",
  appId: "1:867719856342:web:f3e95ee812a7300c73c977",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth()
export const db = getFirestore()
export const storage = getStorage()