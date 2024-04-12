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
		let arrayOffre: Offre[] = new Array(6);
		onMount(()=> {
			get(dbRef).then((snapshot) =>{
			// let dataObject = snapshot.val();	
			snapshot.forEach((val) => {
				arrayOffre.forEach(element => {
				let titre: string = val.child("titre").val();
				let domaine: string = val.child("domaine").val();
				let location: string = val.child("location").val();
				let salaire: number = val.child("salaire").val();
				let heures: number = val.child("heures").val();
				arrayOffre.push(new Offre(titre, domaine, location, salaire, heures));
			});
			});
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
			{#each arrayOffre as offre}
			  <li class="job-item">
				<h2>{offre.titre}</h2>
				<p>{offre.domaine} - {offre.location}</p>
				<p>Salaire: {offre.salaire}</p>
				<p>Heures: {offre.heures}</p>
			  </li>
			{/each}
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
				border-bottom: 1px solid #ddd;
				padding: 10px;
			  }
	  </style>