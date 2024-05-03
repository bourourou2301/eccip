<script lang="ts">
	import Offre from "$lib/offre";
	import firebase from "$lib/firebase";
	import { ref, get} from "firebase/database";
	import "$lib/style.css";
	import { onMount } from "svelte";
	let typeUser = ''; // la variable pour afficher le type de page correct selon le type de user
	function pageCréationOffre() { window.location.href = 'offreDemploi/CreerOffre'; }
		
	
		let db = firebase.database;
		const dbRef = ref(db, "offres/")
		
let arrayOffre: Offre[] = [];
let isOffersLoaded = false; // Flag to track data loading

onMount(() => {
  get(dbRef).then((snapshot) => {
	snapshot.forEach((val) => {
	  let titre = val.child("titre").val();
	  let domaine = val.child("domaine").val();
	  let location = val.child("location").val();
	  let salaire = val.child("salaire").val();
	  let heures = val.child("heures").val();

	  arrayOffre.push(new Offre(titre, domaine, location, salaire, heures));
	});
	isOffersLoaded = true; // Set flag to true after data is loaded
  });
});
</script>
	
	<div class="bg-haut">
		<div class="container-fluid text-center">
		  <h1>Les offres d'emploi</h1>
		</div>
	  </div>
	  
	  <div class="contenu-page">
		<header class="d-flex justify-content-center">
		  <div class="row">
			<div class="boutonPageOffre">
			  <button class="btn btn-primary" on:click={pageCréationOffre}>créer une offre</button>
			</div>
		  </div>
		</header>
	  
		<div class="offer-box">
			<ul id="jobOffers">
			  {#if isOffersLoaded}
				{#each arrayOffre as offre}
				  <li class="job-item">
					<h2>{offre.titre}</h2>
					<p>Domaine: {offre.domaine} </p>
					<p>Lieu: {offre.location} </p>
					<p>Salaire: {offre.salaire} $ par h</p>
					<p>Heures: {offre.heures} h</p>
				  </li>
				{/each}
			  {:else}
				<p>Chargement des offres en cours...</p>
			  {/if}
			</ul>
		  </div>
	  </div>
	
	
	<style>
			  .offer-box {
				max-height: 2000px; /* Adjust height as needed */
				overflow-y: scroll;
				border: 1px solid #ddd;
				padding: 10px;
			  }
			
			  .job-item {
				border: 1px solid #ddd; /* Solid border for all sides */
				padding: 10px; /* Inner padding */
				margin-bottom: 10px; /* Space between boxes */
}
	  </style>