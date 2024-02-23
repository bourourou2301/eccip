 // login/+page.svelte
 import { session } from '$lib/stores/session';
 import firebase from '$lib/firebase';
 import {
  signInWithPopup,
  signInWithEmailAndPassword,
  type UserCredential
 } from 'firebase/auth';
 import { goto } from '$app/navigation';

 let auth = firebase.auth;
 let email: string = '';
 let password: string = '';

 async function loginWithMail() {
  await signInWithEmailAndPassword(auth, email, password)
   .then((result) => {
    const { user }: UserCredential = result;
    session.set({
     loggedIn: true,
     user: {
      displayName: user?.displayName,
      email: user?.email,
      photoURL: user?.photoURL,
      uid: user?.uid
     }
    });
    goto('/');
   })
   .catch((error) => {
    return error;
   });
 }

