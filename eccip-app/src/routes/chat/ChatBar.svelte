<script lang="ts">
    import { onMount, onDestroy } from 'svelte';

    let chatContainer: HTMLElement | null; // Déclaration de chatContainer avec le type explicite HTMLElement | null

    // Utilisation de la fonction `onMount` pour exécuter du code une fois que le composant est monté
    onMount(() => {
        // Mettre à jour la barre de défilement pour afficher les nouveaux messages
        chatContainer = document.querySelector('.chat-container');
        if (chatContainer) { // Vérifie si chatContainer est défini
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }
    });

    // Utilisation de la fonction `onDestroy` pour nettoyer les écouteurs d'événements ou les abonnements lorsque le composant est détruit
    onDestroy(() => {
        // Nettoyer les ressources ici si nécessaire
    });

    /** @type {string[]} */
    let messages: string[] = []; // tableau pour stocker les messages
    /** @type {string} */
    let messageInput: string = ""; // variable pour stocker le message entré par l'utilisateur

    /**
     * Fonction pour envoyer un message
     * @returns {void}
     */
    function sendMessage(): void {
        if (messageInput.trim() !== "") { // Vérifie si le message n'est pas vide
            messages = [...messages, messageInput.trim()]; // Ajoute le message à la liste des messages
            messageInput = ""; // Réinitialise le champ de saisie

            // Faire défiler jusqu'au bas de la barre de défilement si chatContainer est défini
            if (chatContainer) {
                chatContainer.scrollTop = chatContainer.scrollHeight;
            }
        }
    }

    /**
     * Gestionnaire d'événements pour la pression sur la touche "Entrée" dans le champ de saisie
     * @param {KeyboardEvent} event - Événement de frappe de clavier
     * @returns {void}
     */
    function handleKeyDown(event: KeyboardEvent): void {
        if (event.key === "Enter") {
            sendMessage();
        }
    }
</script>

<style>
    .chat-container {
        position: fixed;
        bottom: 50px; /* Réduit la hauteur du conteneur du message pour laisser de la place pour le champ de saisie */
        left: 50%;
        transform: translateX(-50%);
        width: 80%;
        max-width: 500px; /* ajustez selon vos besoins */
        max-height: 80%; /* Limite la hauteur de la boîte de chat */
        overflow-y: auto; /* Ajoute une barre de défilement vertical si nécessaire */
        background-color: #f0f0f0;
        padding: 10px;
        border-radius: 10px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .messages {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    .message-bubble {
        background-color: #e6e6e6;
        border-radius: 15px;
        padding: 10px 15px; /* Ajout de rembourrage supplémentaire */
        margin-bottom: 10px;
        max-width: calc(100% - 40px); /* Largeur maximale ajustée */
        display: block; /* Affichage en bloc pour occuper la largeur disponible */
        word-wrap: break-word; /* Pour revenir à la ligne pour les mots longs */
    }

    .user {
        align-self: flex-end;
    }

    .message-content {
        margin: 0;
    }

    .message-input-container {
        position: fixed;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 80%;
        max-width: 500px; /* ajustez selon vos besoins */
        background-color: #f0f0f0;
        padding: 10px;
        border-radius: 10px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .message-input {
        width: calc(100% - 40px);
        padding: 5px 10px;
        border-radius: 8px;
        border: 1px solid #ccc;
    }
</style>

<div class="chat-container">
    <!-- Affichage des messages -->
    <ul class="messages">
        {#each messages as message, index}
            <li class="message-bubble user" style="bottom: {index * 60}px;">
                <p class="message-content">{message}</p>
            </li>
        {/each}
    </ul>
</div>

<div class="message-input-container">
    <!-- Champ de saisie pour entrer le message -->
    <input type="text" class="message-input" bind:value={messageInput} placeholder="Entrez votre message..." on:keydown={handleKeyDown}>
    <!-- Bouton pour envoyer le message -->
    <!-- <button on:click={sendMessage}> -->
        <!-- <i class="fa fa-paper-plane"></i> -->
    <!-- </button> -->
</div>
