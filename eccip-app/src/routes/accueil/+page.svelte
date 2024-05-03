
<script lang="ts">
	import "$lib/style.css";
	import { onMount } from "svelte";
	let typeUser = ''; // la variable pour afficher le type de page correct selon le type de user
	function pageCréationOffre() { window.location.href = 'routes/offreDemploi/CreerOffre'; }
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
        <p class=description-companie>We specialize in blablabla</p>
		
        </div>
    </div><div class= "boxLogo"></div>
    <div class="titreZone"><h1 >Mon fil</h1>
 </div>
    
 <!--  -->
    <div class ="scroll-areaAccueil contenu-page">
        <!--
            in here you put the posts
        -->
        <h1>Les offres d'emplois seront ici</h1>
		<button type="button" on:click={showFeed}>Show the Feed!!!</button>
        
    </div>
	
</div>
