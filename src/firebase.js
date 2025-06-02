import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDv1Pc5PgBo46q8G5RhbyC-UZh76V_Mvr0",
  authDomain: "task-ebebc.firebaseapp.com",
  projectId: "task-ebebc",
  storageBucket: "task-ebebc.firebasestorage.app",
  messagingSenderId: "775218575865",
  appId: "1:775218575865:web:e774bb0200b2abb1e46528",
  measurementId: "G-M70F0YQ3L7",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db };
