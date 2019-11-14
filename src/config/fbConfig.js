import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

var firebaseConfig = {
    apiKey: "**********************************",
    authDomain: "**********************************",
    databaseURL: "**********************************",
    projectId: "**********************************",
    storageBucket: "**********************************",
    messagingSenderId: "**********************************",
    appId: "**********************************",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();

export { 
    storage, firebase  as default
};