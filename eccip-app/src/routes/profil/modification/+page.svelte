<script lang="ts">
	//  in this I gave random values but when db is connected you can import all of these
	import '$lib/style.css';
	import { userId } from '$lib/stores/userId';
	import { page } from '$app/stores';
	import firebase from '$lib/firebase';
	import { doc, getDoc, addDoc, setDoc } from 'firebase/firestore';

	const db = firebase.db;

	let prenom;
	let nom;
	let typeUser;
	let email;
	let bio;
	let tagEmploi;
	let localisation;

	async function getUserInfo() {
		$userId = $page.url.searchParams.get('userId')!;
		const docRef = doc(db, 'utilisateurs', $userId);
		const docSnap = await getDoc(docRef);
		if (docSnap.exists()) {
			const data = docSnap.data();
			prenom = data.prenom;
			nom = data.nom;
			typeUser = data.typeUser ?? '';
			email = data.email;
			bio = data.bio ?? '';
			tagEmploi = data.tagEmploi ?? '';
			localisation = data.localisation ?? '';
		}
	}
	getUserInfo();

	let prenomTempo = prenom;
	let nomTempo = nom;
	let typeUserTempo = typeUser;
	let emailTempo = email;
	let bioTempo = bio;
	let tagEmploiTempo = tagEmploi;
	let localisationTempo = localisation;

	async function handleSubmit() {
		await setDoc(doc(db, 'utilisateurs', $userId), {
			prenom: prenomTempo ?? '',
			nom: nomTempo ?? '',
			typeUser: typeUserTempo ?? '',
			email: emailTempo ?? '',
			bio: bioTempo ?? '',
			tagEmploi: tagEmploiTempo ?? '',
			localisation: localisationTempo ?? ''
		});
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

		<div>
			<button type="submit" class="btn btn-primary" on:click={handleSubmit}>Confirmer</button>
		</div>
	</div>
</div>
