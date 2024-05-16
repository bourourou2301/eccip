<script lang="ts">
    import firebase from '$lib/firebase';
    import {doc, getDoc} from "firebase/firestore"; 
    import { userId } from "$lib/stores/userId";

    const db = firebase.db;
    let afficherPopup:boolean = false;
    let uid: string = $userId.toString();    


    async function ouvrirPopUp() {
        afficherPopup = true;
    }
    async function fermerPopup() {
        afficherPopup = false;
    }

    async function recupererListeStagaires(): Promise<string[]> {
        const docSnap = await getDoc(doc(db, "utilisateurs", uid));
        return docSnap.get("listeStagiairesGeres")
    }
    
</script>





<div class="popup-container">
    <div class="popup">
        <h1>Rapport de stage</h1>
        <h5>Heures travaillées</h5>
        <input type="number" min="0" step="0.1" placeholder="Nombre d'heures" />
        <h5>Jour(s) travaillées</h5>
        <h5>Compte-rendu</h5>
        <input type="text" placeholder="Rédigez votre compte-rendu du stage cette semaine">
        <h5>Tâche(s) Accomplie(s)</h5>
        <input type="text" placeholder="Rédigez votre compte-rendu du stage cette semaine">
        <h5>Ce que j'ai appris</h5>
        <input type="text" placeholder="Rédigez votre compte-rendu du stage cette semaine">
      <button on:click={fermerPopup}>Close</button>
    </div>
  </div>

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