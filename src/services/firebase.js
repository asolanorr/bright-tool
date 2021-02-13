import firebase from "firebase/app";
import 'firebase/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyAsb87wrv0L5apBMCjD1NbYmnNQjVLT9j8",
    authDomain: "dontpublishsw.firebaseapp.com",
    projectId: "dontpublishsw",
    storageBucket: "dontpublishsw.appspot.com",
    messagingSenderId: "71458132253",
    appId: "1:71458132253:web:eecfd6d5aa1215f31c91f4",
    measurementId: "G-3YFQ2T4RCB"
};
// Initialize Firebase
const fb = firebase.initializeApp(firebaseConfig);

export const db = fb.firestore();