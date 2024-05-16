<script lang="ts">
import firebase from '$lib/firebase';
import { createUserWithEmailAndPassword, getMultiFactorResolver } from 'firebase/auth';
import { goto } from '$app/navigation';
import { session } from '$lib/stores/session';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

let db = firebase.db;
let auth = firebase.auth;
let email: string = '';
let password: string = '';
let prenom: string = '';
let nom: string = '';
let role: string = '';
let bonMDP:boolean= true;
let photoProfil:File;

const storage = getStorage();

async function handleRegister() {

  // Créer un nouveau compte
  await createUserWithEmailAndPassword(auth, email, password)
    .then((result) => {
      const { user } = result;
      console.log(1);
        const storageRef = ref(storage, `profile_images/${user.uid}`);
        const uploadTask = uploadBytesResumable(storageRef, photoProfil);

        uploadTask.on(
          'state_changed',
          async () => {
            // Get downloadable URL after successful upload
            const downloadURL = await getDownloadURL(storageRef);

            // Update user data with photoURL
            const docData = {
              uid: user.uid,
              email: user.email,
              prenom: prenom,
              nom: nom,
              role: role,
              photoProfil: downloadURL,
            };

            setDoc(doc(db, "utilisateurs", user.uid), docData);
          }
        );
        console.log(2);
      session.update((cur: any) => {
      return {
      ...cur,
      sUid: auth.currentUser?.uid,
      sEmail: email,
      sloggedIn: true,
      sloading: false
      };
    });
console.log(3);
      // Amène l'utilisateur dans la page d'acceuil
      goto('/');
    })
    .catch((error) => {
      console.error(error);
      bonMDP=false;
      console.log(4);
    });
    console.log(5);
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
     <p>Veuillez choisir une photo de</p>
     <input bind:value={photoProfil} type="File"/>
     <p></p>
     <input bind:group={role} type="radio" name="role" value="poster">Encadreur
     <p></p>
     <input bind:group={role} type="radio" name="role" value="searcher">Stagiaire
     <button type="submit">S'inscrire!</button>
    </div>

    </form>
  </div>
  