<script lang ="ts">
	import Offre from "$lib/offre";
	import firebase from "$lib/firebase";
	import { ref, get} from "firebase/database";
	import "$lib/style.css";
	let typeUser = ''; // la variable pour afficher le type de page correct selon le type de user
	function pageCréationOffre() { window.location.href = 'offreDemploi/CreerOffre'; }

	let db = firebase.database;
	const dbRef = ref(db, "offres/")
	let arrayOffre: Offre[] = [];

	get(dbRef).then((snapshot) =>{
    let dataObject = snapshot.val();
    arrayOffre.forEach(element => {
        arrayOffre.push(new Offre(element.titre,
             element.domaine, element.location, 
             element.salaire, element.heures,
              element.ownerUID, element.applicants))
   	 });
	})    

  </script>
  
  <div class="bg-haut">
	<div class="container-fluid text-center">
	  <h1>Les offres d'emploi</h1>
	</div>
  </div>
  
  <div class="contenu-page">
	<header class="d-flex justify-content-center">
	  <div class="row">
		<div class="recherche">
		  <input type="text" id="searchInput" placeholder="Rechercher..." />
		</div>
		<div class="boutonPageOffre">
		  <button class="btn btn-primary" on:click={pageCréationOffre}>créer une offre</button>
		</div>
	  </div>
	</header>
	<main>
	  <div class="offer-box">
		<ul id="jobOffers">
		  <li>Example Offer 1 - Title and Description</li>
		  <li>Example Offer 2 - Title and Description</li>
		  </ul>
	  </div>
	</main>
  </div>
  
  <style>
	.offer-box {
	  max-height: 2000px; /* Adjust height as needed */
	  overflow-y: scroll;
	  border: 1px solid #ddd;
	  padding: 10px;
	}
  </style>
