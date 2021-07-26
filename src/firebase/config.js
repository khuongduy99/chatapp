

import firebase from 'firebase/app';

import 'firebase/analytics';
import 'firebase/auth';
import 'firebase/firestore';

var firebaseConfig = {
  apiKey: "AIzaSyAF98k5Wj0VThzdCpymdL9im3um3i4A6tc",
  authDomain: "chat-app-6376e.firebaseapp.com",
  projectId: "chat-app-6376e",
  storageBucket: "chat-app-6376e.appspot.com",
  messagingSenderId: "1008543158463",
  appId: "1:1008543158463:web:ca05b98fb9eaed9995760a",
  measurementId: "G-W406RE557B"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const auth = firebase.auth();
const db = firebase.firestore();


// if (window.location.hostname === 'localhost') {
//   db.useEmulator('localhost', '8080');
//   auth.useEmulator('http://localhost:9099');
// }

export { db, auth };
export default firebase;