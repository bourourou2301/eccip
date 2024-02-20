<script lang="ts">
    import { onMount } from 'svelte';
    import { session } from '$lib/session';
    import { goto } from '$app/navigation';
    import { signOut } from 'firebase/auth';
    import firebase from '$lib/firebase';

    import type { LayoutData } from './$types';
    export let data: LayoutData;
   
    let auth = firebase.auth;
    let loading: boolean = true;
    let loggedIn: boolean = false;
   
    session.subscribe((cur: any) => {
     loading = cur?.loading;
     loggedIn = cur?.loggedIn;
    });
   
    onMount(async () => {
     const user: any = await data.getAuthUser();
   
     const loggedIn = !!user && user?.emailVerified;
     session.update((cur: any) => {
      loading = false;
      return {
       ...cur,
       user,
       loggedIn,
       loading: false
      };
     });
   
     if (loggedIn) {
      goto('/');
     }
     else{
        goto('/login')
     }
    });
    
    export function logout() {
		signOut(auth)
			.then(() => {
				goto('/login');
				loggedIn = false;
			})
			.catch((error) => {
				throw new Error(error);
			});
	}
   
   </script>

{#if loading}
	<div>Loading...</div>
{:else}
	<div>
		Logged in: {loggedIn}

		<div>
			{#if loggedIn}
				<button on:click={logout}>Logout</button>
            <h1>current user : {auth.currentUser?.email}
            </h1>
			{:else}
				<a href="/login"> Login</a>
			{/if}
		</div>
		<slot />
	</div>
{/if}
   