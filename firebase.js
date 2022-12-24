import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB8svZinvPppw5VpuPsEyLKVxI6WH5_wD8",
  authDomain: "mitzi-shop.firebaseapp.com",
  projectId: "mitzi-shop",
  storageBucket: "mitzi-shop.appspot.com",
  messagingSenderId: "173607725380",
  appId: "1:173607725380:web:b7f263d287bf0373518f11"
};

const app = !firebase.apps.length ?
firebase.initializeApp(firebaseConfig) : 
firebase.app()

const db = app.firestore()

export default db