import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
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

export const database = getFirestore(app);
