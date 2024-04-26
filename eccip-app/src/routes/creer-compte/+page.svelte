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
let bonMDP:boolean= true;

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
   bonMDP=false;
  });
} 
</script>

<div class="register-form  creation-compte centered-containerProfil col">
    <form on:submit={handleRegister}>
      <div class= "titreZone">
     <h2>S'inscrire</h2>
    </div>
    <div class= "col créerProfil ">
     <input bind:value={email} type="email" placeholder="Email" />
     <p></p>
     <input bind:value={password} type="password" placeholder="mot de passe" />
     <p>Veuillez s'assurer que le mot de passe est au minium 6 caractères</p>
     <input bind:value={prenom} type="text" placeholder="Prenom" />
     <p></p>
     <input bind:value={nom} type="text" placeholder="Nom" />
     <p></p>
     <input bind:group={role} type="radio" name="role" value="poster">Encadreur
     <p></p>
     <input bind:group={role} type="radio" name="role" value="searcher">Stagiaire
     <p></p>
     <button class="center-Button"type="submit">Se connecter</button>
    </div>

    </form>
  </div>
  