import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth   , createUserWithEmailAndPassword , signInWithEmailAndPassword , onAuthStateChanged , signOut } from "firebase/auth";
import {getFirestore, collection, addDoc ,doc ,setDoc , getDoc , getDocs ,deleteDoc} from "firebase/firestore";
import { getStorage, ref, uploadBytes ,getDownloadURL } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyCt_9wf2A3QVCENTLku-Pcjy79b9lz57iA",
  authDomain: "twitterapptailwind.firebaseapp.com",
  projectId: "twitterapptailwind",
  storageBucket: "twitterapptailwind.appspot.com",
  messagingSenderId: "1031085485236",
  appId: "1:1031085485236:web:250c57f935996720cebbe1",
  measurementId: "G-GFDTZGHNSE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


const auth = getAuth();
const db = getFirestore();
const storage = getStorage();

export {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  collection,
  addDoc,
  db,
  doc,
  setDoc,
  getDoc,
  getDocs,
  storage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteDoc
}