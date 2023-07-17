// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAKEy8SbBzgCdqlL5Mn2V0spcaQsILu_tQ",
    authDomain: "fakestore-363e0.firebaseapp.com",
    projectId: "fakestore-363e0",
    storageBucket: "fakestore-363e0.appspot.com",
    messagingSenderId: "236561426706",
    appId: "1:236561426706:web:8fbf2b877362ed4e76abcb"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const Auth = getAuth(app)