<script lang="ts">
    // register/+page.svelte
    import firebase from '$lib/firebase';
    import { createUserWithEmailAndPassword } from 'firebase/auth';
    import { goto } from '$app/navigation';
    import { session } from '$lib/session';
	import { set, ref } from 'firebase/database';
   
    let db = firebase.database;
    let auth = firebase.auth;
    let email: string = '';
    let password: string = '';
    let username: string = '';
    let role: string = '';
   
    async function handleRegister() {
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
   </script>

   <!-- register/+page.svelte -->
<div class="register-form">
    <form on:submit={handleRegister}>
     <h2>Register</h2>
     <input bind:value={email} type="text" placeholder="Email" />
     <input bind:value={password} type="password" placeholder="Password" />
     <input bind:value={username} type="username" placeholder="Username"/>
     <input bind:group={role} type="radio" name="role" value="1">Poster
     <input bind:group={role} type="radio" name="role" value="0">Searcher
     <button type="submit">Register</button>
    </form>
   </div>
   