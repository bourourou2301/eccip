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
</script>

<style>
    /* Styles pour la barre de chat */
    .chat-bar-container {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: #ffffff;
        border: 1px solid #cccccc;
        padding: 20px;
        border-radius: 10px;
    }

    .chat-bar {
        /* Styles pour la barre de chat, comme la largeur, la hauteur, etc. */
    }
</style>

<div class="chat-bar-container">
    <div class="chat-bar">
        <!-- Affichage des messages -->
        {#each messages as message}
            <div>{message.text}</div>
        {/each}

        <!-- Champ de saisie pour entrer le message -->
        <input type="text" bind:value={messageInput} placeholder="Entrez votre message...">
        <!-- Bouton pour envoyer le message -->
        <button on:click={sendMessage}>Envoyer</button>
    </div>
</div>