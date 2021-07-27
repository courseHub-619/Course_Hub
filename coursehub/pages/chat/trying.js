import React from "react";
import "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { storage } from "../../firebase";

// firebase.initializeApp({
//   apiKey: "AIzaSyBp4wAAtBo6a_3GwcWH3KShTj8iLiOGkyY",
//   authDomain: "coursehub-52849.firebaseapp.com",
//   projectId: "coursehub-52849",
//   storageBucket: "coursehub-52849.appspot.com",
//   messagingSenderId: "860100066769",
//   appId: "1:860100066769:web:f999ef6f0cf20a3636f4f0",
//   measurementId: "G-3VRWX3J4Y1",
// });

const firebase = firebase.firestore();

const chat = () => {
  //     rules_version = '2';
  // service cloud.firestore {
  //   match /databases/{database}/documents {
  //     match /{document=**} {
  //       allow read, write: if false;
  //     }
  //   }
  // }
  const messagesRef = firestore.collection("messages");
  const query = messagesRef.orderBy("createdAt").limit(25);
  const [messages] = useCollectionData(query, { idField: "id" });

  return (
    <>
      <div>{messages && messages.map((msg) => <ChaMessage />)}</div>
    </>
  );
};
