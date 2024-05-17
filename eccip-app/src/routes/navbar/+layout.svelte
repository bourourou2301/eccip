<script lang="ts">
	import '$lib/style.css';
	import { userId } from '$lib/stores/userId';
	import { role } from '$lib/stores/role';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { signOut } from 'firebase/auth';
	import firebase from '$lib/firebase';
	import type { LayoutData } from './$types';
	import { doc, getDoc } from 'firebase/firestore';
	export let data: LayoutData;

	const db = firebase.db;
	let typeUser: string;
    let loggedIn :boolean = false;
	let profilURL :string = "/navbar/profil";
	

	onMount(async () => {

		const currentUrl = window.location.href;
		let fromCreerComptePage = currentUrl.includes('/creerCompte');
		const user: any = await data.getAuthUser();
		if (user.uid != undefined) {
			userId.set(user.uid)
			const docRef = doc(db, "utilisateurs/" + user.uid);
			const docSnap = await getDoc(docRef);
			role.set(docSnap.get("typeUser"))
			loggedIn = true;
			loggedIn = loggedIn;
			profilURL = profilURL+"?userId="+$userId
			if (fromCreerComptePage) {
				goto('/navbar/accueil');
			} else {
				goto(currentUrl);
			}
		} else {
			goto('/connexion');
		}
	});

	
	export function logout() {
		loggedIn = false;
		loggedIn = loggedIn;
		signOut(firebase.auth)
			.then(() => {
				goto('/connexion');
			})
			.catch((error) => {
				throw new Error(error);
			});
	}

</script>


{#if loggedIn}
	<div id="navbar-parent">
	    <div id="profile-pic"></div>
	    <nav class="navbar">
	        <a href="/navbar/accueil">Accueil</a>
	        <a href="/navbar/chat">Chat</a>
	        {#if $role === "poster"}
	            <a href="/navbar/rapport/lire">Lire les rapports</a>
	        {:else}
	            <a href="/navbar/rapport/ecrire">Ecrire un rapport</a>
	        {/if}
	        <a href={profilURL}>Mon profil</a>
	        <a href="/navbar/offreDemploi">Les offres d'emplois</a>
	    </nav>
	    <button on:click={logout} class="btn btn-danger btn-sm">Se déconnecter</button>
	    <p>user: {$userId}</p>
	</div>
{/if}

<slot></slot>

<style>
	#navbar-parent {
		background-color: rgb(62, 62, 155);
		width: 120px;
		height: 100vh;
		box-shadow: 10px 10px 10px #19355a;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		position: fixed;
		margin-right: 2px;
	}

	.navbar {
		display: flex;
		gap: 20px;
		flex-direction: column;
		box-sizing: border-box;
		width: fit-content;
		height: fit-content;
		justify-content: center;
		align-items: center;
	}

	.navbar a {
		font-family: 'Courier New', Courier, monospace;
		text-align: center;
		color: aliceblue;
		text-decoration: none;
		margin-top: 20px;
		margin-bottom: 20px;
	}

	#profile-pic {
		margin-left: auto;
		margin-right: auto;
		margin-top: 10px;
		margin-bottom: 50px;
		background-color: black;
		border-radius: 50%;
		width: 65px;
		height: 65px;
	}
</style>