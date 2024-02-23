// register/+page.svelte
import firebase from '$lib/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { goto } from '$app/navigation';
import { session } from '$lib/session';
import { set, ref } from 'firebase/database';

let db = firebase.database;
let auth = firebase.auth;
export let email: string = '';
export let password: string = '';
export let username: string = '';
export let role: string = '';

export async function handleRegister() {
 await createUserWithEmailAndPassword(auth, email, password)
  .then((result) => {
  let dbRef:any = "users/"+auth.currentUser?.uid;
   const { user } = result;
   set(ref(db, dbRef+"/email"), user.email);
   set(ref(db, dbRef+"/username"), username);
   set(ref(db, dbRef+"/role"), role);
   session.update((cur: any) => {
    return {
     ...cur,
     user,
     loggedIn: true,
     loading: false
    };
   });
   goto('/');
  })
  .catch((error) => {
   throw new Error(error);
  });
}