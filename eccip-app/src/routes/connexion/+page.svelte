<script lang="ts">
    import "$lib/style.css";
	import { userId } from '$lib/stores/userId';
     import firebase from '$lib/firebase';
     import {
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
        $userId = user.uid;
        goto('/accueil');
       })
       .catch((error) => {
        return error;
       });
     }
</script>
<div class="Login-haut">
    <h1> BIENVENUE DANS ECCIP </h1>
    <h3>Veuillez-vous connecter ou créer un compte</h3>
    <h1>Se connecter</h1>
</div>
        <div class="  login-form">
            <form on:submit={loginWithMail}>
            <input bind:value={email} type="text" placeholder="Email" />
            <input bind:value={password} type="password" placeholder="Mot de passe" />
            <button type="submit">Se connecter</button>
            </form>
            <div>Sinon</div>
            <div>Vous n'avez pas de compte? <a href="/creer-compte"> S'inscrire</a></div>
        </div>

