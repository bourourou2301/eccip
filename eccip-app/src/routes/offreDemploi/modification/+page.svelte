<script lang="ts">
	import '$lib/style.css';
	import { userId } from '$lib/stores/userId';
	import { page } from '$app/stores';
	import Offre from '$lib/offre';
	import firebase from '$lib/firebase';
	import { doc, getDoc, addDoc, setDoc, updateDoc } from 'firebase/firestore';
	import { onMount } from 'svelte';

	const db = firebase.db;

	let domaine: string;
	let heures: number;
	let location: string;
	let salaire: number;
	let titre: string;
	let offre: Offre;

	async function getOffreInfo() {
		$userId = $page.url.searchParams.get('offreUID')!;
		const docRef = doc(db, 'offres', $page.url.searchParams.get('offreUID')!);
		const docSnap = await getDoc(docRef);
		if (docSnap.exists()) {
			offre = Offre.fromDataSnapshot(docSnap)!;
		}
		domaine= offre.domaine!;
		heures= offre.heures!;
		location= offre.location!;
		salaire= offre.salaire!;
		titre= offre.titre!;
	}
	getOffreInfo();

	async function handleSubmit() {
		await updateDoc(doc(db, 'offres', $page.url.searchParams.get('offreUID')!), {
			domaine: domaine,
			heures: heures,
			location: location,
			salaire: salaire,
			titre: titre
		});
		window.location.href = '/offreDemploi';
	}
</script>

<div class="container-fluid text-center bg-haut">
	<h1 class="titre-page">Modification</h1>
</div>

<div class=" contenu-page">
	<div class="container mt-5">
		<div class="mb-5">
			<div class="row">
				<div class="col">
					<input type="text" class="form-control" placeholder="Titre" bind:value={titre} />
				</div>
				<div class="col">
					<input type="text" class="form-control" placeholder="Domaine" bind:value={domaine} />
				</div>
				<div class="col">
					<input
						type="text"
						class="form-control"
						placeholder="Lieu de travail"
						bind:value={location}
					/>
				</div>
			</div>
		</div>

		<div class="mb-5">
			<input type="text" class="form-control" placeholder="Salaire" bind:value={salaire} />
		</div>

		<div class="mb-5">
			<input type="text" class="form-control" placeholder="Heures" bind:value={heures} />
		</div>

		<div>
			<button type="submit" class="btn btn-primary" on:click={handleSubmit}>Confirmer</button>
		</div>
	</div>
</div>
