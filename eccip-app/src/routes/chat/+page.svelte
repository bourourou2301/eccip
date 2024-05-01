<script lang="ts">
    import firebase from '$lib/firebase';
    import {session} from "$lib/stores/session";
    import { collection, onSnapshot, doc, getDoc} from "firebase/firestore"; 
    import ChatBar from './ChatBar.svelte'; // Chemin relatif à la position du fichier +page.svelte
    import Message from '$lib/message';
	import { onMount } from 'svelte';
    
    const db = firebase.db;

    const message = new Message();

    let listeRecipient: Map<string, string> = new Map;
    let isSnapshotLoaded: boolean = false;
    let uid: string;
    let monNom: string;
    let valeurCle: string;
    let uidRecipient: string;
    let uidRecipientChoisi: string;
    let nomChoisi: string;
    let afficherPopup: boolean = false;
    let afficherChatComponent: boolean = false;
    let listeUtilisateurs: Map<string, string> = new Map();
    let listeMessages: Map<string, boolean> = new Map();
    let listeUtilisateursTextees: string[] = []; 

    onMount(async () => {
        session.subscribe(async (cur: any) => {
            uid = cur?.sUid.uid;
            const unsub = onSnapshot(doc(db, "utilisateurs", uid), (doc) => {
                monNom = doc.get("prenom") + " " + doc.get("nom");
            });
            await obtenirAnciensChats();
            await obtenirListeUtilisateurs();
        });
    })
    

    async function continuerConvo(event: MouseEvent) {
        uidRecipient = (event.target as HTMLButtonElement).value;
        valeurCle = (event.target as HTMLButtonElement).name;
        afficherChatComponent = true;
        recuprerMessagesEnvoyes();
    }

    async function creerConvo(event: MouseEvent) {
        nomChoisi = (event.target as HTMLButtonElement).value;
        uidRecipientChoisi = (event.target as HTMLButtonElement).name;
        message.creerConversation(uid, uidRecipientChoisi, nomChoisi, monNom);
    }

    async function recuprerMessagesEnvoyes() {
        const unsub = onSnapshot(collection(db, "conversations", valeurCle, "messages"), (collection) => {
            collection.forEach((doc) => {
                if (doc.get("envoyePar") === uid) {
                  listeMessages.set(doc.get("message"), true);
                } else {
                  listeMessages.set(doc.get("message"), false)
                }
            });
        });
    }

//pk ca ecrit undefined kan tu load pour la premiere fois
async function obtenirAnciensChats() {
    const unsub = onSnapshot(collection(db, "utilisateurs", uid, "chats"), (collection) => {
        collection.forEach((doc) => {
            let isDocumentEmpty: boolean = Object.keys(doc.data() || {}).length === 0;
            console.log(isDocumentEmpty);
            if (!isDocumentEmpty) {
                listeRecipient.set(doc.get("nomComplet"), doc.get("cleConversation"));
                listeUtilisateursTextees.push(doc.get("utilisateurRecipient"));
            }
        });
        isSnapshotLoaded = true;
    });
}

    async function obtenirListeUtilisateurs() {
        const unsub = onSnapshot(collection(db, "utilisateurs"), (collection) => {
            collection.forEach((doc) => {
                if(uid === doc.get("uid")){
                    console.log("Tu peux pas t'envoyer des messages a toi meme")
                } else {
                    if(listeUtilisateursTextees.length !== 0){
                        listeUtilisateursTextees.forEach(element => {
                            if(element === doc.get("uid")) {
                                console.log("Vous avez deja un convo avec " + element);
                            } else {
                                listeUtilisateurs.set(doc.get("uid"), doc.get("prenom") + " " + doc.get("nom"));
                            }
                        });
                    } else {
                        listeUtilisateurs.set(doc.get("uid"), doc.get("prenom") + " " + doc.get("nom"));
                    }
                    
                }
            });
        });
    }

    async function ouvrirPopUp() {
        afficherPopup = true;
    }
    async function fermerPopup() {
        afficherPopup = false;
    }
    
</script>


<div class="titrePage">
    <div class="container-fluid text-center">
        <h1>Mes Messages</h1>
    </div>
</div>
<div> 
    <div class="container-fluid contenuPage">
        <div class="row">
            <div class="col-md-3 bg-light messageOuvert">
                <h2>Mes converstations</h2>
                <button on:click={ouvrirPopUp}>Ajouter conversation</button>
                {#if afficherPopup}
                  <div class="popup-container">
                    <div class="popup">
                      <h2>Available Users</h2>
                        {#each listeUtilisateurs as [key, value]}
                          <button name={key} value={value} on:click={creerConvo}>{value}</button>
                        {/each}
                      <button on:click={fermerPopup}>Close</button>
                    </div>
                  </div>
                {/if}
                {#if isSnapshotLoaded}
                    {#each listeRecipient as [key, value]}
                        <button name={value} value={key} on:click={continuerConvo}>{key}</button>
                    {/each}    
                {/if}

            </div>
            <div class="col-md-9 bg-white messageActuel">
                <h1>Conversation</h1>
                <!-- <ChatBar utilisateurEnvoyeur = {uid} utilisateurRecipient = {uidRecipient} cleConversation = {valeurCle}/> -->
                <!-- <p>Ici serait le dernier message ouvert</p> -->
            </div>
        </div>
    </div>
</div>
<div>
    <!-- Contenu de la page +page -->
    <!-- Utilisation de la barre de chat -->
    <ChatBar utilisateurEnvoyeur = {uid} utilisateurRecipient = {uidRecipient} cleConversation = {valeurCle} afficherMessage = {afficherChatComponent} listeMessages = {listeMessages}/>
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
    .contenuPage{
        margin-left: 120px;
    }
    .messageActuel{
        border-left: 1px solid #dddddd;
    }
    .titrePage{
        background-color: rgb(62, 62, 155);
        color: aliceblue;
    }

</style>
