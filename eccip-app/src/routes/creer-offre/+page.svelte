<script lang="ts">
    import firebase from '$lib/firebase';
    import { set, ref } from 'firebase/database';




    let db = firebase.database;
    let id: string;
    let titre: string;
    let domaine: string;
    let localisation: string;
    let salaire: number;
    let heure: number;
    let proprietaire: string;
    let applicants: string[];


    async function creerOffre() {
        let dbRef: any = "offres/1";
        set(ref(db, dbRef+"/titre"), titre);
        set(ref(db, dbRef+"/domaine"), domaine);
        set(ref(db, dbRef+"/localisation"), localisation);
        set(ref(db, dbRef+"/salaire"), salaire);
        set(ref(db, dbRef+"/heure"), heure);
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