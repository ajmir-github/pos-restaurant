import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration

// console.log(import.meta.env);

const firebaseConfig = {
  apiKey: "AIzaSyCqv6PtOSXu26J3D69eCF5Ao66Vd0-weCA",
  authDomain: "pos-restaurant-453cb.firebaseapp.com",
  projectId: "pos-restaurant-453cb",
  storageBucket: "pos-restaurant-453cb.appspot.com",
  messagingSenderId: "419168091737",
  appId: "1:419168091737:web:ac9ac58fcd23fa5be7bb48",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firebase Firestore and get a reference to the service
export const database = getFirestore(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
