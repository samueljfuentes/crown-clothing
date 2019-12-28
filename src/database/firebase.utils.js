import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
   apiKey: "AIzaSyCsmeZccX5qmRKQV7az29yFlTqC814TiCQ",
   authDomain: "crown-clothing-1817c.firebaseapp.com",
   databaseURL: "https://crown-clothing-1817c.firebaseio.com",
   projectId: "crown-clothing-1817c",
   storageBucket: "crown-clothing-1817c.appspot.com",
   messagingSenderId: "667950930320",
   appId: "1:667950930320:web:22154f81004f7369b7bb15",
   measurementId: "G-49R7LT060F"
};

// async function that creates userprofile snapshot...
export const createUserProfileDocument = async (userAuth, additionalData) => {
  // when sign in, will return auth object; when sign out, will return null...
  if (!userAuth) return;
  
  // create reference object from this document...
  // only reference objects can be used for CRUD methods...
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  // from this reference object, get (Retrieve in CRUD) and return a snapshop object...
  // snapshot objects have more properties available on them for manipulation...
  const snapshot = await userRef.get();
  // check to see if user does not exist in database, using the exists property on the returned snapshot object...
  if (!snapshot.exists) {
    // from the userAuth object, pull out the displayName and email properties and set new variables equal to their value...
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    // if snapshot does not exist, create new user using data from userAuth object...
    try {
      // create new properties on the refence object...
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  // must return userRef for later use; above code only creates the snapshot that will be pushed onto the reference for creation...
  return userRef;
};

firebase.initializeApp(config);

// grant access to firebase authentication and firestore to the app needs it...
export const auth = firebase.auth();
export const firestore = firebase.firestore();

// create new auth class for google login...
const provider = new firebase.auth.GoogleAuthProvider();
// sets prompt to select google accounts...
provider.setCustomParameters({ prompt: 'select_account' });
 
export const signInWithGoogle = () => auth.signInWithPopup(provider);
export default firebase;