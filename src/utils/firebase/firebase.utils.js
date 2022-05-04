import { initializeApp } from 'firebase/app';
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
} from 'firebase/auth';

import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDfIsjG1zKRONrOCz3sbUS-cDZhciad7Ys",
    authDomain: "y2kute-db-587b0.firebaseapp.com",
    projectId: "y2kute-db-587b0",
    storageBucket: "y2kute-db-587b0.appspot.com",
    messagingSenderId: "618992326024",
    appId: "1:618992326024:web:801f0983e9428a43e3163d"
    };

    const firebaseApp = initializeApp(firebaseConfig);

    const provider = new GoogleAuthProvider();

    provider.setCustomParameters({
        prompt: 'select_account',
    });

    export const auth = getAuth();
    export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

    export const db = getFirestore();

    export const createUserDocumentFromAuth = async (userAuth) => {
        const userDocRef = doc(db, 'users', userAuth.uid);

        console.log(userDocRef)

        const userSnapshot = await getDoc(userDocRef);
        console.log(userSnapshot)
        console.log(userSnapshot.exists())

        if(!userSnapshot.exists()) {
            const { displayName, email } = userAuth //response from googlesignin
            const createdAt = new Date();

            try {
                await setDoc(userDocRef, {
                    displayName,
                    email,
                    createdAt
                });
            } catch (error) {
                console.log('error creating the user', error.message);
            }
        }
        return userDocRef;
    }