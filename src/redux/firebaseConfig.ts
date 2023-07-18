// Import the functions you need from the SDKs you need
import {getAnalytics} from 'firebase/analytics';
import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import firebase from 'firebase/compat/app';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCvl_bnJ2IESTUSE6n_X0ZBVxbbD3GIrDg',
  authDomain: 'recipesapp-80748.firebaseapp.com',
  projectId: 'recipesapp-80748',
  storageBucket: 'recipesapp-80748.appspot.com',
  messagingSenderId: '604648724317',
  appId: '1:604648724317:web:cdfe7ef06c92664c1b3ab4',
  measurementId: 'G-QJ8CRL58WC',
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
export const FIREBASE_STORAGE = getStorage(FIREBASE_APP);
export {firebase};
