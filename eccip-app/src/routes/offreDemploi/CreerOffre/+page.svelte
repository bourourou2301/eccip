<script lang="ts">
	import '$lib/style.css';
	import {userId} from "$lib/stores/userId"
	import Offre from '$lib/offre';

	let offreUid: string;
	let titre: string;
	let domaine: string;
	let localisation: string;
	let salaire: number;
	let heure: number;
	async function creerOffre() {
		let offer: Offre = new Offre(offreUid ,titre, domaine, localisation, salaire, heure, $userId);
		offer.writeOfferToDb();
	}
</script>

<div class="container-fluid text-center bg-haut">
	<h1>Créer une offre</h1>
</div>
<div class="container-fluid centered-container contenu-page">
	<form on:submit={creerOffre}>
		<h1>Créer une nouvelle offre</h1>
		<div class="mb-3">
			<label for="titre" class="form-label">Titre</label>
			<input bind:value={titre} type="text" placeholder="Titre de l'offre" />
		</div>
		<div class="mb-3">
			<label for="Domaine" class="form-label">Domaine</label>
			<input bind:value={domaine} type="text" placeholder="domaine" />
		</div>
		<div class="mb-3">
			<label for="Lieu de travail" class="form-label">Lieu de travail</label>
			<input bind:value={localisation} type="text" placeholder="Localisation" />
		</div>
		<div class="mb-3">
			<label for="Salaire" class="form-label">Salaire</label>
			<input bind:value={salaire} type="number" min="0" placeholder="salaire" />
		</div>
		<div class="mb-3">
			<label for="Heure" class="form-label">Heure</label>
			<input bind:value={heure} type="number" min="0" placeholder="Heures/Semaine" />
		</div>
		<button type="submit" class="btn btn-primary center-Button">Créer offre</button>
	</form>
</div>
