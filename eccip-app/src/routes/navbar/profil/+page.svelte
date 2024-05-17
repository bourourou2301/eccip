<script lang="ts">
	import '$lib/style.css';
	import { userId } from '$lib/stores/userId';
	import { role } from '$lib/stores/role';
	import firebase from '$lib/firebase';
	import { doc, getDoc, onSnapshot, updateDoc, collection } from 'firebase/firestore';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	const db = firebase.db;

	let prenom = '';
	let nom = '';
	let typeUser = '';
	let email = '';
	let bio = '';
	let tagEmploi = '';
	let localisation = '';
	let afficherPopup: boolean = false;
	let stagiaires: Map<string, string> = new Map();
	let stagiairesDispo: Map<string, string> = new Map();

	onMount(async () => {
        if($role === "poster") {
			await obtenirStagiaires();
			await obtenirStagiairesDispo();
		}
    })

	async function getUserInfo(){
		$userId = $page.url.searchParams.get("userId")!
		const docRef = doc(db, 'utilisateurs', $userId);
		const docSnap = await getDoc(docRef);		
        if (docSnap.exists()) {
            const data = docSnap.data();
			prenom = data.prenom;
			nom = data.nom;
			typeUser = data.typeUser ?? '';
			email = data.email;
			bio = data.bio ?? '';
			tagEmploi = data.tagEmploi ?? '';
			localisation = data.localisation ?? '';
		}
	}
	
	getUserInfo();
	function modifierProfil() {
		window.location.href = "/profil/modification"+"?userId="+$userId;
	}

	async function obtenirStagiaires() {
		stagiaires.clear();
		const unsub = onSnapshot(doc(db, "utilisateurs", $userId), (doc) => { 
			let isStagairesEmpty: boolean = doc.get("stagiaires") === undefined;
			console.log(isStagairesEmpty);
	        if (!isStagairesEmpty) {
				console.log(doc.get("stagiaires"));
			}
		});
	}

	async function obtenirStagiairesDispo() {
    	const unsub = onSnapshot(collection(db, 'utilisateurs'), (collection) => {
    	    stagiairesDispo.clear();
			stagiairesDispo = stagiairesDispo;
    	    collection.forEach((doc) => {
    	        if ($userId === doc.get('uid')) {
    	        } else {
    	            if (!stagiaires.has(doc.get('uid')) && doc.get("typeUser") !== "poster") {
    	                stagiairesDispo.set(doc.get('uid'), doc.get('prenom') + ' ' + doc.get('nom'));
    	            }
    	        }
    	    });
			stagiairesDispo = stagiairesDispo;
    	});
	}


	async function ajouterSatgiaire(event: MouseEvent) {
	  let nomChoisi = (event.target as HTMLButtonElement).value;
	  let uidRecipientChoisi = (event.target as HTMLButtonElement).name;
	//   stagiaires.set(uidRecipientChoisi, nomChoisi);
	  // Convert Map to object before updating Firestore
	  const stagiairesObject = Object.fromEntries(stagiaires);
	  await updateDoc(doc(db, "utilisateurs", $userId), {
	    stagiaires: stagiairesObject
	  })
	  fermerPopup();
	}

	async function ouvrirPopUp() {
		afficherPopup = true;
	}
	async function fermerPopup() {
		afficherPopup = false;
		console.log(stagiaires);
		console.log(stagiairesDispo);
		
	}


</script>

<div class="container-fluid text-center bg-haut">
	<h1>Mon profil</h1>
</div>

<div class="contenu-page">
	<div class="container mt-5">
		<div class="text-center">
			<!-- Profile picture (you can add actual picture here) -->
			<!--<img src="profile-picture.jpg" alt="Profile Picture" class="profile-pic mb-3" />-->
		</div>

		<div class="mb-3">
			<!-- Display user type -->

			<!-- svelte-ignore a11y-label-has-associated-control (ignorer la caution lié a l'utilisation de label sans avoir de form)-->
			<label>Type d'utilisateur :</label>
			<input type="text" class="form-control" value={typeUser} readonly />
		</div>

		<div class="mb-5">
			<!-- Display first name, last name, and email (ignorer la caution lié a l'utilisation de label sans avoir de form)-->
			<div class="row">
				<div class="col">
					<!-- svelte-ignore a11y-label-has-associated-control (ignorer la caution lié a l'utilisation de label sans avoir de form)-->
					<label>Prénom :</label>
					<input type="text" class="form-control" value={prenom} readonly />
				</div>
				<div class="col">
					<!-- svelte-ignore a11y-label-has-associated-control (ignorer la caution lié a l'utilisation de label sans avoir de form)-->
					<label>Nom :</label>
					<input type="text" class="form-control" value={nom} readonly />
				</div>
				<div class="col">
					<!-- svelte-ignore a11y-label-has-associated-control  (ignorer la caution lié a l'utilisation de label sans avoir de form))-->
					<label>Email :</label>
					<input type="email" class="form-control" value={email} readonly />
				</div>
			</div>
		</div>

		<div class="mb-5">
			<!-- afficher la description -->
			<!-- svelte-ignore a11y-label-has-associated-control (ignorer la caution lié a l'utilisation de label sans avoir de form)-->
			<label>Bio :</label>
			<textarea class="form-control" style="resize: none;" rows="3" readonly>{bio}</textarea>
		</div>

		<div class="mb-5">
			<!-- afficher job tags -->
			<!-- svelte-ignore a11y-label-has-associated-control (ignorer la caution lié a l'utilisation de label sans avoir de form)-->
			<label>Tag emploi :</label>
			<input type="text" class="form-control" value={tagEmploi} readonly />
		</div>

		<div class="mb-5">
			<!-- afficher le lieux de travail -->
			<!-- svelte-ignore a11y-label-has-associated-control (ignorer la caution lié a l'utilisation de label sans avoir de form) -->
			<label>Localisation :</label>
			<input type="text" class="form-control" value={localisation} readonly />
		</div>
		<div class="modifierProfil">
			<button type="submit" class="btn btn-primary" on:click={modifierProfil}>Modifier profil</button>
		</div>
		{#if $role === "poster"}
		<button class="btn btn-primary" on:click={ouvrirPopUp}>Ajouter stagiaire</button>	
		{/if}
		<ul class="conversations-list">
			{#each stagiaires as [key, value]}
				<li class="conversation-item">{key}</li>
				<hr class="conversation-separator" />
			{/each}
		</ul>
	</div>
</div>

{#if afficherPopup}
	<div class="popup-container">
		<div class="popup">
			<h2>Stagiare(s)</h2>
			{#each stagiairesDispo as [key, value]}
			<button name={value} value={key} on:click={ajouterSatgiaire}>{value}</button>
			{/each}
			<button on:click={fermerPopup}>Close</button>
		</div>
	</div>
{/if}
