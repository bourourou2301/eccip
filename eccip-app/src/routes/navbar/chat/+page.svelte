<script lang="ts">
    import "$lib/style.css";
	import firebase from '$lib/firebase';
	import { userId } from '$lib/stores/userId';
	import { collection, onSnapshot, doc, getDoc } from 'firebase/firestore';
	import ChatBar from './ChatBar.svelte'; // Chemin relatif à la position du fichier +page.svelte
	import Message from '$lib/message';
	import { onMount } from 'svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	const db = firebase.db;

	const message = new Message();

    let listeRecipient: Map<string, string> = new Map;
    let isSnapshotLoaded: boolean = false;
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
        const unsub = onSnapshot(doc(db, "utilisateurs", $userId), (doc) => {
                monNom = doc.get("prenom") + " " + doc.get("nom");
            });
        await obtenirAnciensChats();
        await obtenirListeUtilisateurs();
    })
    
	async function creerConvo(event: MouseEvent) {
		nomChoisi = (event.target as HTMLButtonElement).value;
		uidRecipientChoisi = (event.target as HTMLButtonElement).name;
		message.creerConversation($userId, uidRecipientChoisi, nomChoisi, monNom);
    	fermerPopup();
	}

	async function continuerConvo(event: MouseEvent) {
		listeMessages.clear();
		uidRecipient = (event.target as HTMLButtonElement).value;
		valeurCle = (event.target as HTMLButtonElement).name;
		afficherChatComponent = true;
		console.log(listeMessages);
		await recuprerMessagesEnvoyes();
        fermerPopup();
	}

	
    async function recuprerMessagesEnvoyes() {
		const unsub = onSnapshot(collection(db, 'conversations', valeurCle, 'messages'), (collection) => {
				collection.forEach((doc) => {
					if (doc.get('envoyePar') === $userId) {
						listeMessages.set(doc.get('message'), true);
					} else {
						listeMessages.set(doc.get('message'), false);
					}
				});
				listeMessages = listeMessages;
			}
		);
	}

	async function obtenirAnciensChats() {
	    const unsub = onSnapshot(collection(db, "utilisateurs", $userId, "chats"), (collection) => {
	        collection.forEach((doc) => {
	            let isDocumentEmpty: boolean = Object.keys(doc.data() || {}).length === 0;
	            if (!isDocumentEmpty) {
					listeUtilisateursTextees.push(doc.get("utilisateurRecipient"));
	                listeRecipient.set(doc.get("nomComplet"), doc.get("cleConversation"));
	            }
	        });
	        isSnapshotLoaded = true;
			listeUtilisateursTextees = listeUtilisateursTextees;
	        listeRecipient = listeRecipient;
	    });
	}

	// async function obtenirListeUtilisateurs() {
	// 	const unsub = onSnapshot(collection(db, 'utilisateurs'), (collection) => {
	// 		listeUtilisateurs.clear();
	// 		collection.forEach((doc) => {
	// 			if ($userId === doc.get('uid')) {
	// 				console.log("Tu peux pas t'envoyer des messages a toi meme");
	// 			} else {
	// 				if (listeUtilisateursTextees.length !== 0) { //pas vide
	// 					listeUtilisateursTextees.forEach((element) => {
	// 						if (element === doc.get('uid')) {
	// 							console.log('Vous avez deja un convo avec ' + element);
	// 						} else {
	// 							listeUtilisateurs.set(doc.get('uid'), doc.get('prenom') + ' ' + doc.get('nom'));
	// 						}
	// 					});
	// 				} else { //vide
	// 					listeUtilisateurs.set(doc.get('uid'), doc.get('prenom') + ' ' + doc.get('nom'));
	// 				}
	// 			}
	// 		});
	// 		listeUtilisateurs = listeUtilisateurs;
	// 	});
	// }

	async function obtenirListeUtilisateurs() {
    	const unsub = onSnapshot(collection(db, 'utilisateurs'), (collection) => {
    	    listeUtilisateurs.clear();
			listeUtilisateurs = listeUtilisateurs;
    	    collection.forEach((doc) => {
    	        if ($userId === doc.get('uid')) {
    	            console.log("Tu peux pas t'envoyer des messages a toi meme");
    	        } else {
    	            if (!listeUtilisateursTextees.includes(doc.get('uid'))) {
    	                listeUtilisateurs.set(doc.get('uid'), doc.get('prenom') + ' ' + doc.get('nom'));
    	            }
    	        }
    	    });
			listeUtilisateurs = listeUtilisateurs;
    	});
	}



	async function ouvrirPopUp() {
		await obtenirListeUtilisateurs();
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
				<h2>Mes conversations</h2>
				<button on:click={ouvrirPopUp}>Ajouter conversation</button>
				{#if afficherPopup}
					<div class="popup-container">
						<div class="popup">
							<h2>Utilisateur(s)</h2>
							{#each listeUtilisateurs as [key, value]}
								<button name={key} {value} on:click={creerConvo}>{value}</button>
							{/each}
							<button on:click={fermerPopup}>Close</button>
						</div>
					</div>
				{/if}
				{#if isSnapshotLoaded}
					<ul class="conversations-list">
						{#each listeRecipient as [key, value]}
							<li class="conversation-item">
								<button name={value} value={key} on:click={continuerConvo}>{key}</button>
							</li>
							<hr class="conversation-separator" />
						{/each}
					</ul>
				{/if}
			</div>
			<div class="col-md-9 bg-white messageActuel">
				<h1>Conversation avec {uidRecipient?uidRecipient:''}</h1>
				<!-- <p>Ici serait le dernier message ouvert</p> -->
			</div>
		</div>
	</div>
</div>
<div>
	<!-- Contenu de la page +page -->
	<!-- Utilisation de la barre de chat -->
	<ChatBar
		utilisateurEnvoyeur={$userId}
		utilisateurRecipient={uidRecipient}
		cleConversation={valeurCle}
		afficherMessage={afficherChatComponent}
		{listeMessages}
	/>
</div>


