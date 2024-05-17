<script
	src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDQkV-WTexdOYO5QiC08c69WDWASBzlqGY"
	,
	lang="ts"
>
	import '$lib/style.css';
	import { onMount } from 'svelte';
	import Offre from '$lib/offre';
	import { userId } from '$lib/stores/userId';
	import firebase from '$lib/firebase';
	import {
		doc,
		getDoc,
		addDoc,
		setDoc,
		collection,
		query,
		where,
		getDocs
	} from 'firebase/firestore';




	let db = firebase.db;
	let typeUser: string = '';
	let arrayOffre: Offre[] = [];
	let isOffersLoaded = false;

	onMount(() => {
		getOffres();

	});

	async function getOffres() {
		const offresRef = collection(db, 'offres');
		const q = query(offresRef, where('ownerUID', '==', $userId));
		const querySnapshot = await getDocs(q);
		querySnapshot.forEach((doc) => {
			arrayOffre.push(Offre.fromDataSnapshot(doc)!);
		});
		const docRef = doc(db, 'utilisateurs', $userId);
		const docSnap = await getDoc(docRef);
		if (docSnap.exists()) {
			typeUser = docSnap.data().typeUser;
		}
		isOffersLoaded = true;
	}

	async function modifierOffre(offre:Offre){
		window.location.href = "offreDemploi/modification"+"?offreUID="+offre.offreUid;
	}

</script>

<!-- stagiaire ui -->
{#if typeUser == 'stagiaire'}
<div class="scroll-areaAccueil contenu-page">
	<div class="offer-box">
		<ul id="jobOffers">
			{#if isOffersLoaded}
				{#each arrayOffre as offre}
					<h2>{offre.titre}</h2>
					<p>Domaine: {offre.domaine}</p>
					<p>Lieu: {offre.location}</p>
					<p>Salaire: {offre.salaire} $ par h</p>
					<p>Heures: {offre.heures} h</p>
					<!-- <button on:click={() => postuler(offre)} class="button postuler">Postuler</button> -->
					<!-- <img
						src="https://maps.googleapis.com/maps/api/staticmap?
						center=whitehouseZ%C3%BCrich&zoom=12&size=400x400&key=AIzaSyC6U3lU8B7SlHHYuWpcPxHsgzJ4CwsnoYw"
						alt="location"
					/> -->
				{/each}
			{:else}
				<p>Chargement des offres en cours...</p>
			{/if}
		</ul>
	</div>
</div>
{:else}
<!-- encadreur ui -->
<div class="scroll-areaAccueil contenu-page">
	<div class="offer-box">
		<ul id="jobOffers">
			{#if isOffersLoaded}
				{#each arrayOffre as offre}
					<h2>{offre.titre}</h2>
					<p>Domaine: {offre.domaine}</p>
					<p>Lieu: {offre.location}</p>
					<p>Salaire: {offre.salaire} $ par h</p>
					<p>Heures: {offre.heures} h</p>
					<button on:click={() => modifierOffre(offre)} class="button postuler">Modifier</button>
					<!-- <img
						src="https://maps.googleapis.com/maps/api/staticmap?
						center=whitehouseZ%C3%BCrich&zoom=12&size=400x400&key=AIzaSyC6U3lU8B7SlHHYuWpcPxHsgzJ4CwsnoYw"
						alt="location"
					/> -->
				{/each}
			{:else}
				<p>Chargement des offres en cours...</p>
			{/if}
		</ul>
	</div>
</div>
{/if}