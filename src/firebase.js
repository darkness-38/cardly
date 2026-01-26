// Firebase configuration
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
    apiKey: "AIzaSyApVicQXtdKfyAYOjr_Yul4qPUpWKzPQho",
    authDomain: "cardlyyy.firebaseapp.com",
    projectId: "cardlyyy",
    storageBucket: "cardlyyy.firebasestorage.app",
    messagingSenderId: "691075483784",
    appId: "1:691075483784:web:92e48eb28d97c66a69f73d",
    measurementId: "G-C4Y5WKCJS4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);

export default app;
