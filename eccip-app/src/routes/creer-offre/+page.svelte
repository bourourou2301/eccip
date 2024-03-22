<script lang="ts">
    import firebase from '$lib/firebase';
    import { child, get, set, ref, push, type DatabaseReference, off, DataSnapshot } from 'firebase/database';
    import Offre from "$lib/offre";

    let db = firebase.database;
    // Generer un id randome ou pas
    let titre: string;
    let domaine: string;
    let localisation: string;
    let salaire: number;
    let heure: number;
    // uID de la personne qui la mis sur le site
    let proprietaire = firebase.auth.currentUser?.uid; 
    // array de string des uid des postulants

    
// const dbRef: DatabaseReference = ref(db, "offres/");
    async function creerOffre() {
// let referencePoste = push(dbRef);
        // set(ref(db, referencePoste.key+"/domaine"), domaine);
        // set(ref(db, referencePoste.key+"/localisation"), localisation);
        // set(ref(db, referencePoste.key+"/salaire"), salaire);
        // set(ref(db, referencePoste.key+"/heure"), heure);
        let offer:Offre = new Offre(titre,domaine,localisation,salaire,heure,proprietaire);
        offer.writeOfferToDb();
    }

    

</script>

<div class="register-form">
    <form on:submit={creerOffre}>
     <h2>Register</h2>
     <input bind:value={titre} type="text" placeholder="Titre de l'offre" />
     <select bind:value={domaine} name="domaine">
        <option value="informatique">Informatique</option>
        <option value="réseautage">Réseautage</option>
        <option value="infirmerie">Infirmier</option>
    </select>
     <input bind:value={localisation} type="text" placeholder="Localisation" />
     <input bind:value={salaire} type="number" min="0" placeholder="salaire" />
     <input bind:value={heure} type="number" min="0" placeholder="Heures/Semaine" />Poster
     <button type="submit">Créer l'offre</button>
    </form>
   </div>
   <div>
    <button on:click={Offre.readOfferFromDb} type="button">
        Read from the database
    </button>
   </div>