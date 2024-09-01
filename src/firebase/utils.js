import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { firebaseConfig } from './config';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);

const GoogleProvider = new GoogleAuthProvider();
GoogleProvider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => signInWithPopup(auth, GoogleProvider);

export const handleUserProfile = async (userAuth, additionalData) => {
  //databasede userın olup olmadığını kontrol ediyor 
  //eğer yoksa bitiyo
  if (!userAuth) return;
  const { uid } = userAuth;

  const userRef = doc(firestore, `users/${uid}`);
  const snapshot = await getDoc(userRef);

  if (!snapshot.exists()) {
    const { displayName, email } = userAuth;
    const timestamp = new Date();

    try {
      await setDoc(userRef, {
        displayName,
        email,
        createdDate: timestamp,
        ...additionalData
      });
    } catch (err) {
      console.error('Error creating user document:', err);
    }
  }
  return userRef;
};
