import { initializeApp} from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";



const firebaseConfig = {
  apiKey: "AIzaSyBarWRPHXBtp7f0X8gnKR1LDNs-7wGuZZc",
  authDomain: "mess-user-reg-auth.firebaseapp.com",
  projectId: "mess-user-reg-auth",
  storageBucket: "mess-user-reg-auth.appspot.com",
  messagingSenderId: "613278002683",
  appId: "1:613278002683:web:d8d535e9f7c40974356f5e",
  measurementId: "G-JYFEM644BJ",
};





const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


export const storage = getStorage(app);
export { auth };
export const db = getFirestore(app);
