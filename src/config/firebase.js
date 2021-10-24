import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCyHPR5i1d0BV-IMBMXu5siCHsT88krFGM",
  authDomain: "the-portfolio-maker.firebaseapp.com",
  projectId: "the-portfolio-maker",
  storageBucket: "the-portfolio-maker.appspot.com",
  messagingSenderId: "502134672979",
  appId: "1:502134672979:web:0d148e34116a99e16600a6",
  measurementId: "G-2G2BLZGKEB",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, provider, storage };
export default db;
