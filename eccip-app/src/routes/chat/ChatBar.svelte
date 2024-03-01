<script>
    /** @type {{ text: string, fromUser: boolean }[]} */
    let messages = []; // tableau pour stocker les messages
    /** @type {string} */
    let messageInput = ""; // variable pour stocker le message entré par l'utilisateur

    function sendMessage() {
        if (messageInput.trim() !== "") { // Vérifie si le message n'est pas vide
            messages = [...messages, { text: messageInput.trim(), fromUser: true }]; // Ajoute le message à la liste des messages
            messageInput = ""; // Réinitialise le champ de saisie
        }
    }

    /** 
 * @param {KeyboardEvent} event 
 */
function handleKeyDown(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
}

</script>

<style>
    /* Styles pour la barre de chat */
    .chat-container {
        position: fixed;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 100%;
        max-width: 600px; /* Largeur maximale de la barre de chat */
        box-sizing: border-box; /* Pour inclure les bordures et le padding dans la largeur */
        padding: 20px;
        overflow-y: auto; /* Ajout d'un défilement vertical lorsque les messages dépassent la hauteur */
        max-height: calc(100vh - 40px); /* Hauteur maximale du chat pour atteindre le haut de la page */
    }

    .message-bubble {
        margin-bottom: 10px;
        display: flex;
        justify-content: flex-end; /* Aligner les bulles à droite */
        position: relative; /* Position relative pour positionner les bulles enfants de manière absolue */
        align-items: flex-end; /* Aligner les bulles au bas du conteneur */
    }

    .message-bubble.user {
        justify-content: flex-start; /* Aligner les bulles à gauche pour les messages de l'utilisateur */
    }

    .message-bubble p {
        background-color: #ffffff;
        border: 1px solid #cccccc;
        border-radius: 10px;
        padding: 10px;
        margin: 0;
        max-width: 80%; /* Limite la largeur des bulles de message */
        word-wrap: break-word; /* Permettre le retour à la ligne automatique dans les messages longs */
    }

    /* Style pour la bulle de message */
    .message-content {
        position: absolute;
        bottom: 0;
        left: 0;
    }
</style>

<div class="chat-container">
    <!-- Affichage des messages -->
    {#each messages as message, index}
        <div class="message-bubble {message.fromUser ? 'user' : ''}" style="bottom: {index * 60}px;">
            <p class="message-content">{message.text}</p>
        </div>
    {/each}

    <!-- Champ de saisie pour entrer le message -->
    <input type="text" bind:value={messageInput} placeholder="Entrez votre message..." on:keydown={handleKeyDown}>
    <!-- Bouton pour envoyer le message -->
    <button on:click={sendMessage}>Envoyer</button>
</div>

