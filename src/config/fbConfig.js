import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

var firebaseConfig = {
    apiKey: "AIzaSyB8sKJ4ksbcKBxumkDd1EHqHEcEI8W-9iA",
    authDomain: "matcha-e48de.firebaseapp.com",
    databaseURL: "https://matcha-e48de.firebaseio.com",
    projectId: "matcha-e48de",
    storageBucket: "matcha-e48de.appspot.com",
    messagingSenderId: "836600186003",
    appId: "1:836600186003:web:952bcf98c35a35df"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();

export { 
    storage, firebase  as default
};