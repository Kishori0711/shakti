// // Import the functions you need from the SDKs you need
// import { initializeApp, getApps } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyAnKPJo_syPk_ck4qT_eTxW59lVSahbSxY",
//   authDomain: "shakti-ffbdd.firebaseapp.com",
//   projectId: "shakti-ffbdd",
//   storageBucket: "shakti-ffbdd.firebasestorage.app",
//   messagingSenderId: "465218747702",
//   appId: "1:465218747702:web:2bc2c2115706a307d38797",
//   measurementId: "G-T5XK0HXQS8"
// };

// // Initialize Firebase

// const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

// export const auth = getAuth(app);
// export const db = getFirestore(app);



// import { initializeApp, getApps } from "firebase/app";
// import { getAuth } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: "AIzaSyA83TdtSjfjtVQL3pKKa8xgKXpxXUJtRME",
//   authDomain: "newshakti-d6a70.firebaseapp.com",
//   projectId: "newshakti-d6a70",
//   storageBucket: "newshakti-d6a70.firebasestorage.app",
//   messagingSenderId: "30041370361",
//   appId: "1:30041370361:web:b41ed463ed3461d5dafc28",
//   measurementId: "G-9DYVPSC4J9"
// };

// const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

// export const auth = getAuth(app);





import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyA83TdtSjfjtVQL3pKKa8xgKXpxXUJtRME",
  authDomain: "newshakti-d6a70.firebaseapp.com",
  projectId: "newshakti-d6a70",
  storageBucket: "newshakti-d6a70.firebasestorage.app",
  messagingSenderId: "30041370361",
  appId: "1:30041370361:web:b41ed463ed3461d5dafc28",
  measurementId: "G-9DYVPSC4J9"
}; 

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);
