<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDQkV-WTexdOYO5QiC08c69WDWASBzlqGY", lang="ts">
	import "$lib/style.css";
	import { onMount } from "svelte";
	let typeUser = ''; // la variable pour afficher le type de page correct selon le type de user
	function pageCréationOffre() { window.location.href = '/offreDemploi/CreerOffre'; }
	import Offre from '$lib/offre';
	import firebase from '$lib/firebase';
	import { get, child,set, ref, push, type DatabaseReference, DataSnapshot } from 'firebase/database';

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

<div>
    <div class="jumbotron ">
        <div class="boxTitre">
        <h1 class=companie>Eccip</h1>
        <p class=description-companie>We specialize in flemmardise</p>
		
        </div>
    </div><div class= "boxLogo"></div>
    <div class="titreZone"><h1 >Mon feed</h1>
 </div>
    
 <!--  -->
 <div class = "row accueiloffre">	
	<div class = accueiloffre>
		<h1>Les offres d'emplois disponibles</h1></div>
	<div class="boutonPageOffre">
		<button class="btn btn-primary" on:click={pageCréationOffre}>créer une offre</button>
		<!-- <button class="button trier">Filter</button>-->
	</div>
</div>
    <div class ="scroll-areaAccueil contenu-page">
      
         <div class="offer-box">
			<ul id="jobOffers">
			  {#if isOffersLoaded}
				{#each arrayOffre as offre}
					<h2>{offre.titre}</h2>
					<p>Domaine: {offre.domaine} </p>
					<p>Lieu: {offre.location} </p>
					<p>Salaire: {offre.salaire} $ par h</p>
					<p>Heures: {offre.heures} h</p>
					<button class="button postuler">Postuler</button>
					<img src="https://maps.googleapis.com/maps/api/staticmap?
					center={offre.location}&
					zoom=12&
					size=300x200&
					markers=color:red%7C{offre.location}&
					key=AIzaSyDQkV-WTexdOYO5QiC08c69WDWASBzlqGY">
				{/each}
			  {:else}
				<p>Chargement des offres en cours...</p>
			  {/if}
			</ul>
		  </div>
    
        
    </div>
	
</div>