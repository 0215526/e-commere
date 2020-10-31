import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyC57AvOKjWoXNmjRP-XXfHCBKPdY43xMPM",
  authDomain: "e-commerce-52835.firebaseapp.com",
  databaseURL: "https://e-commerce-52835.firebaseio.com",
  projectId: "e-commerce-52835",
  storageBucket: "e-commerce-52835.appspot.com",
  messagingSenderId: "969940229338",
  appId: "1:969940229338:web:5b02cc47216d3c8e8259e3",
  measurementId: "G-8M4X4CD2VS"
};

export const createUserProfileDocument = async(userAuth, additonalData) => {
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
        ...additonalData
      })
    } catch (error){
      console.error('error creating user', error.message);
    }
  }
  
  return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

