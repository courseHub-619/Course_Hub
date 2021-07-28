import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyACLJcMooBPvkpBMPoK7Ukw_pAeZc4nKxo",
  authDomain: "coursehub-619.firebaseapp.com",
  projectId: "coursehub-619",
  storageBucket: "coursehub-619.appspot.com",
  messagingSenderId: "81472458219",
  appId: "1:81472458219:web:86f8e031e63f3e1bde1dae",
  measurementId: "G-L6MT8JVKW7",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const storage = firebase.storage();
export { storage, firebase as default };
