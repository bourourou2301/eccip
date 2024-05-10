<script lang="ts">
	import '$lib/style.css';
	import { onMount } from 'svelte';
	let typeUser = ''; // la variable pour afficher le type de page correct selon le type de user
	function pageCréationOffre() {
		window.location.href = 'routes/offreDemploi/CreerOffre';
	}
	import Offre from '$lib/offre';

	import firebase from '$lib/firebase';
	import {
		get,
		child,
		set,
		ref,
		push,
		type DatabaseReference,
		DataSnapshot
	} from 'firebase/database';

	let db = firebase.db;

	let arrayOffre: Offre[] = [];
	let isOffersLoaded = false; // Flag to track data loading

	onMount(() => {});

	let isShowFeed = false;
	const offresArray: any = [];

	// function showFeed(){
	// get(child(dbRef, "offres/")).then((snapshot)=>{
	// 	snapshot.forEach(function (offres_snapshot){
	// 		offresArray.push(Offre.fromDataSnapshot(offres_snapshot))
	// 	})
	// 	for(let i = 0; i < offresArray.length; i++){
	// 	console.log(offresArray[i])
	// 	//make it show in webapp
	// }
	// isShowFeed = true;
	// })

	// }
</script>

<div>
	<div class="jumbotron">
		<div class="boxTitre">
			<h1 class="companie">Eccip</h1>
			<p class="description-companie">We specialize in blablabla</p>
		</div>
	</div>
	<div class="boxLogo"></div>
	<div class="titreZone"><h1>Mon fil</h1></div>

	<!--  -->
	<div class="scroll-areaAccueil contenu-page">
		<!--
            in here you put the posts
        -->
		<!-- <h1>Les offres d'emplois seront ici</h1>
		<button type="button" on:click={}>Show the Feed!!!</button> -->
	</div>
</div>
