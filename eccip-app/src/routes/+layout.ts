
import  firebase from '$lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';

export async function load({ url }) {

 function getAuthUser() {
  return new Promise((resolve) => {
   onAuthStateChanged(firebase.auth, (user) => resolve(user ? user : false));
  });
 }

 return {
  getAuthUser: getAuthUser,
  url: url.pathname
 };
}