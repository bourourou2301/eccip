<script lang="ts">
	//  in this I gave random values but when db is connected you can import all of these
  	import "$lib/style.css";
  	import firebase from '$lib/firebase';
	import {ref, get, set, child} from "firebase/database"

	const db = firebase.database;
    let dbRef = ref(db, "users/")
	
	let prenom;
	let nom;
	let typeUser;
	let email;
	get(child(dbRef, firebase.auth.currentUser!.uid)).then((snapshot) =>{
             prenom = snapshot.val().prenom;
             nom = snapshot.val().nom;
             typeUser = snapshot.val().role;
             email = snapshot.val().email;
             //add other things to get from db as it goes
        })

	let prenomTempo = prenom;	
	let nomTempo = nom;
	let typeUserTempo = typeUser;
	let emailTempo = email;

	let bio =
		'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
	let bioTempo = bio;

	let tagEmploi = '';
	let tagEmploiTempo = tagEmploi;

	let localisation = '';
	let localisationTempo = localisation;

	let motDePasse = '';
	let nouveauMDP = '';
	let confirmerMDP = '';
	let memeMDP = true;
	function changementMotDePasse() {
		memeMDP = false;
		//make a different button for that, its too fucked to make it in the same
	}
	function handleSubmit() {
		set(ref(db, "users/"+firebase.auth.currentUser?.uid),{
			prenom : prenomTempo,
			nom : nomTempo,
			role : typeUserTempo,
			email : emailTempo,
			bio : bioTempo,
			tagEmploi : tagEmploiTempo,
			localisation : localisationTempo
		})
		
	}
  
</script>

<div class="container-fluid text-center bg-haut">
	<h1 class="titre-page">Mon profil</h1>
</div>

<div class=" contenu-page">
	<div class="container mt-5">
		<!-- espace pour photo de profil et type d'utilisateur-->
		<div class="text-center">
			<!-- use this for acutal picutre
        <img src="profile-picture.jpg" alt="Profile Picture" class="profile-pic mb-3" />
   -->
		</div>

		<div class="mb-3">
			<!-- espace pour les 2 types d'utilisateur-->

			<div class="form-check">
				<input
					class="form-check-input"
					type="radio"
					name="stagiaire"
					id="stagiaire"
					value="stagiaire"
					bind:group={typeUserTempo}
				/>
				<label class="form-check-label" for="stagiaire"> Stagiaire </label>
			</div>
			<div class="form-check">
				<input
					class="form-check-input"
					type="radio"
					name="encadreur"
					id="encadreur"
					value="encadreur"
					bind:group={typeUserTempo}
				/>
				<label class="form-check-label" for="encadreur"> Encadreur </label>
			</div>
		</div>

		<div class="mb-5">
			<!-- espace pour le nom et prénom-->
			<div class="row">
				<div class="col">
					<input type="text" class="form-control" placeholder="prénom" bind:value={prenomTempo} />
				</div>
				<div class="col">
					<input type="text" class="form-control" placeholder="nom" bind:value={nomTempo} />
				</div>
				<div class="col">
					<input type="text" class="form-control" placeholder="email" bind:value={emailTempo} />
				</div>
			</div>
		</div>

		<div class="mb-5">
			<!-- espace pour la biodescription -->
			<textarea
				class="form-control"
				style="resize: none;"
				placeholder="Bio"
				rows="3"
				bind:value={bioTempo}
			></textarea>
		</div>

		<div class="mb-5">
			<!-- espace pour les tag d'emploi-->
			<input
				type="text"
				class="form-control"
				placeholder="tag emploi"
				bind:value={tagEmploiTempo}
			/>
		</div>

		<div class="mb-5">
			<!-- espace pour localisation du travail-->
			<input
				type="text"
				class="form-control"
				placeholder="Localisation"
				bind:value={localisationTempo}
			/>
		</div>
		<div class="mb-5">
			<input
				type="password"
				class="form-control"
				placeholder="mot de passe"
				bind:value={nouveauMDP}
				on:input={changementMotDePasse}
			/>
		</div>
		<div class="mb-5">
			<input
				type="password"
				class="form-control"
				placeholder="confirmer le mot de passe"
				bind:value={confirmerMDP}
				on:input={changementMotDePasse}
			/>
		</div>
		{#if confirmerMDP !== '' && nouveauMDP !== confirmerMDP && memeMDP == false}
			<div class="alert alert-danger" role="alert">
				Les mots de passes ne sont pas les mêmes. Veillez faire attention.
			</div>
		{/if}
		<!-- bouton pour confirmer la modification  -->
		<div>
			<button type="submit" class="btn btn-primary" on:click={handleSubmit} disabled={!memeMDP}
				>Confirmer</button
			>
		</div>
	</div>
</div>
