import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyADLRNyqILrrmhEcEd6zwyVU5oKaxDUrEg",
  authDomain: "crwn-db-e4d30.firebaseapp.com",
  databaseURL: "https://crwn-db-e4d30.firebaseio.com",
  projectId: "crwn-db-e4d30",
  storageBucket: "crwn-db-e4d30.appspot.com",
  messagingSenderId: "698191699145",
  appId: "1:698191699145:web:f1a918b2ae50f6c88ac118",
  measurementId: "G-XD209Y6WMJ",
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
