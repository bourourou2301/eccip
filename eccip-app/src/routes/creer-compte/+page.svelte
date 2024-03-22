<script lang="ts">
import firebase from '$lib/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { goto } from '$app/navigation';
import { session } from '$lib/stores/session';
import { set, ref } from 'firebase/database';

let db = firebase.database;
let auth = firebase.auth;
let email: string = '';
let password: string = '';
let prenom: string = '';
let nom: string = '';
let role: string = '';

async function handleRegister() {
 await createUserWithEmailAndPassword(auth, email, password)
  .then((result) => {
  let dbRef:any = "users/"+auth.currentUser?.uid;
   const { user } = result;
   set(ref(db, dbRef+"/email"), user.email);
   set(ref(db, dbRef+"/prenom"), prenom);
   set(ref(db, dbRef+"/nom"), nom);
   set(ref(db, dbRef+"/role"), role);
   session.update((cur: any) => {
    return {
    ...cur,
    sUid: auth.currentUser?.uid,
    sEmail: email,
    sloggedIn: true,
    sloading: false
    };
   });
   goto('/');
  })
  .catch((error) => {
   console.log(error)
  });
} 
</script>

<div class="register-form contenu-page">
    <form on:submit={handleRegister}>
     <h2>Register</h2>
     <input bind:value={email} type="email" placeholder="Email" />
     <input bind:value={password} type="password" placeholder="Password" />
     <input bind:value={prenom} type="text" placeholder="Prenom" />
     <input bind:value={nom} type="text" placeholder="Nom" />
     <!-- C'est quoi le but de role et value -->
     <input bind:group={role} type="radio" name="role" value="poster">Poster
     <input bind:group={role} type="radio" name="role" value="searcher">Searcher
     <button type="submit">Register</button>
    </form>
   </div>
  