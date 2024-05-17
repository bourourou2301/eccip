<script lang="ts">
    import firebase from '$lib/firebase';
    import {doc, getDoc, collection} from "firebase/firestore"; 
    import { userId } from "$lib/stores/userId";
	import { onMount } from 'svelte';

    const db = firebase.db;
    let afficherPopup:boolean = false;   
    let aStage: boolean = false; 

    onMount(() => {
      verifierStage();
    });


    async function ouvrirPopUp() {
        afficherPopup = true;
    }
    async function fermerPopup() {
        afficherPopup = false;
    }

    async function envoyerRapport() {
      
    }

    async function verifierStage() {
      const dbRef = doc(collection(db, "utilisateurs", $userId));
      const docSnap = await getDoc(dbRef);
      if(docSnap.get("stageAccepte") !== undefined) {
        aStage = true;
      }
    }
    
</script>


{#if aStage}
  <h2 class="bg-haut titreZone" >Vous avez un stage !</h2>
  <button class="btn btn-primary boutonRapport" on:click={ouvrirPopUp}>Rédiger son rapport</button>
  {#if afficherPopup}
  <div class="popup-container">
      <div class="popup">
        <form on:submit={envoyerRapport}>
          <h1>Rapport de stage</h1>
          <h5>Heures travaillées</h5>
          <input type="number" min="0" step="0.1" placeholder="Nombre d'heures" />
          <h5>Jour(s) travaillées</h5>
          <input type="text" placeholder="Précisez vos jours travaillés">
          <h5>Compte-rendu</h5>
          <input type="text" placeholder="Rédigez votre compte-rendu du stage cette semaine">
          <h5>Tâche(s) Accomplie(s)</h5>
          <input type="text" placeholder="Quelles tâches avez-vous accomplies ?">
          <h5>Ce que j'ai appris</h5>
          <input type="text" placeholder="Qu'avais-vous appris ?">
          <button type="submit" >Envoyer votre rapport !</button>
        </form>
        <button on:click={fermerPopup}>Close</button>
      </div>
    </div>  
  {/if}
{:else}
  <h2 class="bg-haut titreZone">Vous n'avez pas de stage. Vous ne pouvez pas rédiger de rapport :(</h2>
{/if}



<style>

.popup-container {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
    }
  

    .popup {
      background-color: #fff;
      padding: 20px;
      border-radius: 5px;
    }

</style> 