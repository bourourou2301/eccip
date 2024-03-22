<script lang="ts">
import {session} from "$lib/stores/session";
import { onMount } from "svelte";
import { goto } from "$app/navigation";
import { signOut } from "firebase/auth";
import firebase from "$lib/firebase";
import type { LayoutData } from "./$types";
export let data: LayoutData;


let loading:boolean = true;
let loggedIn:boolean = false;
let userID: string;

session.subscribe((cur: any) => {   
     loading = cur?.loading;
     loggedIn = cur?.loggedIn;
     userID = cur?.sUid;
    });

    onMount(async () => {
    const user: any = await data.getAuthUser();
   
     const loggedIn = !!user
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
        goto('/connexion')
     }
    });
    export function logout() {
        signOut(firebase.auth).then(() =>{
                goto("/connexion")
                loggedIn = false;
        }).catch((error) =>{
            throw new Error(error);
        })
    }
</script>
    


{#if loading}
	<div>Loading...</div>
{:else if loggedIn}
	<div>
        <div id="navbar-parent">
            <nav class="navbar">
                <a href="/accueil   ">Accueil</a>
                <a href="/chat">Chat</a>
                <a href="/horaire">Horaire</a>
                <a href="/a-propos">À propos</a>
            </nav>
            <div id="profile-pic"></div>
            <button on:click={logout}>Se déconnecter</button>
        </div>  
	</div>
{/if}

<slot></slot>

<style>
#navbar-parent {
    background-color: rgb(62, 62, 155);
    width: 100px;
    height: 80vh;
    box-shadow: 10px 10px 10px #5e5454;
    padding: 20px;
    margin-left: 20px;
    margin-top: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: fixed;
    border-radius: 20px;
}

.navbar {
    display: flex;
    gap: 20px;
    flex-direction: column;
    box-sizing: border-box;
    width:fit-content;
    height: fit-content;
    justify-content: center;
    align-items: center;
}

.navbar a {
    font-family: 'Courier New', Courier, monospace;
    text-align: center;
        color: rgb(255, 255, 255);
    text-decoration: none;
    background-color: transparent;
}

#profile-pic {
    margin-left: auto;
    margin-right: auto;
    margin-top: 50px;
    background-color: black;
    border-radius: 50%;
    width: 65px;
    height: 65px;
}
</style>
