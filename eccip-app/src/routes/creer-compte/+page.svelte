<script lang="ts">
import firebase from '$lib/firebase';
import { createUserWithEmailAndPassword, getMultiFactorResolver } from 'firebase/auth';
import { goto } from '$app/navigation';
import { userId } from '$lib/stores/userId';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytesResumable } from "firebase/storage";


const db = firebase.db;
const auth = firebase.auth;
const storage = getStorage();
let email: string = '';
let password: string = '';
let prenom: string = '';
let nom: string = '';
let typeUser: string = '';
let bonMDP:boolean= true;




async function handleRegister() {

  // Créer un nouveau compte
 await createUserWithEmailAndPassword(auth, email, password)
  .then((result) => {
  
   const { user } = result;

   const docData = {
    uid: user.uid,
    email: user.email,
    prenom: prenom,
    nom: nom,
    typeUser: typeUser
   };
   
   setDoc(doc(db, "utilisateurs", user.uid), docData)
   addDoc(collection(db, "utilisateurs", user.uid, "chats"), {})
   $userId = user.uid;
   goto('/');
  })
  .catch((error) => {
   console.log(error)
   bonMDP=false;
  });

  

} 

  async function handleFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0]; // Get the first file from the input
    if (file) {
      // Create a storage reference
      const storageRef = ref(storage, `cv/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
    }
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
     <input bind:group={typeUser} type="radio" name="role" value="encadreur">Encadreur
     <p></p>
     <input bind:group={typeUser} type="radio" name="role" value="stagiaire">Stagiaire
     <button type="submit">S'inscrire!</button>
    </div>

    </form>
  </div>
  