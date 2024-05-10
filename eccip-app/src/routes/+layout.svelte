<script lang="ts">
	import '$lib/style.css';
	import { userId } from '$lib/stores/userId';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { signOut } from 'firebase/auth';
	import firebase from '$lib/firebase';
	import type { LayoutData } from './$types';
	import Message from '$lib/message';
	export let data: LayoutData;

	const message = new Message();

    let loggedIn = false;
	

	onMount(async () => {
		const user: any = await data.getAuthUser();
        $userId = user.uid;
		const currentUrl = window.location.href;
		let fromCreerComptePage = currentUrl.includes('/creerCompte');
		if ($userId != undefined) {
			if (fromCreerComptePage) {
				goto('/');
			} else {
				goto(currentUrl);
			}
		} else {
			goto('/connexion');
		}
	});
	export function logout() {
		signOut(firebase.auth)
			.then(() => {
				$userId = "";
				goto('/connexion');
			})
			.catch((error) => {
				throw new Error(error);
			});
	}
</script>

	<div id="navbar-parent">
		<div id="profile-pic"></div>
		<nav class="navbar">
			<a href="/">Accueil</a>
			<a href="/chat">Chat</a>
			<a href="/horaire">Horaire</a>
			<a href="/profil">Mon profil</a>
			<a href="/offreDemploi">Les offres d'emplois</a>
		</nav>
		<button on:click={logout} class="btn btn-danger btn-sm">Se déconnecter</button>
		<p>user: {$userId}</p>
	</div>


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
