import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA_Mk74gFVOA7OMAjv43K3GnTQPz-Ybmcs",
  authDomain: "notion-clone-64af7.firebaseapp.com",
  projectId: "notion-clone-64af7",
  storageBucket: "notion-clone-64af7.firebasestorage.app",
  messagingSenderId: "987217659965",
  appId: "1:987217659965:web:283d9531e745e43be60254",
};

const app = getApps().length == 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { db };
