<script lang="ts">
  import { onMount, onDestroy } from 'svelte';

  let chatContainer: HTMLElement | null = null;
  let lastMessagePosition = 0; // Store position of the last message

  onMount(() => {
    chatContainer = document.querySelector('.chat-container');
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  });

  onDestroy(() => {
    // Clean up resources here if needed
  });

  let messages: string[] = [];
  let messageInput: string = "";
  let lastMessage: string = "";

  function sendMessage(): void {
    if (messageInput.trim() !== "") {
      lastMessage = messageInput.trim();
      messages = [...messages, lastMessage];
      messageInput = "";

      if (chatContainer) {
        // Get the height of the last message
        const lastMessageElement = document.querySelector('.message-bubble:last-child') as HTMLElement;
        const lastMessageHeight = lastMessageElement ? lastMessageElement.offsetHeight : 0;

        // Update scroll position to show the end of the last message
        lastMessagePosition += lastMessageHeight;

        // Adjust position considering the height of the container
        const containerHeight = chatContainer.offsetHeight;
        const scrollHeight = chatContainer.scrollHeight;
        if (lastMessagePosition > scrollHeight - containerHeight) {
          lastMessagePosition = scrollHeight - containerHeight;
        }

        chatContainer.scrollTop = lastMessagePosition;
      }
    }
  }

  function handleKeyDown(event: KeyboardEvent): void {
    if (event.key === "Enter") {
      sendMessage();
    }
  }

  function goToLastMessage(): void {
    if (chatContainer) {
      chatContainer.scrollTop = lastMessagePosition;
    }
  }
</script>

  
  <style>
    .chat-container {
      position: fixed;
      bottom: 50px;
      left: 50%;
      transform: translateX(-50%);
      width: 80%;
      max-width: 500px;
      max-height: 80%;
      overflow-y: auto;
      background-color: #f0f0f0;
      padding: 10px;
      border-radius: 10px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
  
    .messages {
      list-style: none;
      padding: 0px; /* Remove top/bottom padding */
      margin: 0;
    }
  
    .message-bubble {
      background-color: #e6e6e6;
      border-radius: 15px;
      padding: 10px 15px;
      margin-bottom: 10px;
      max-width: calc(100% - 40px);
      display: block;
      word-wrap: break-word;
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
      max-width: 500px;
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
  
    .go-to-last-message-button {
      display: none; /* Hide the button by default */
    
  
    }
  </style>
  
  <div class="chat-container">
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

<!-- Bouton pour revenir au dernier message écrit -->
<button class="go-to-last-message-button" on:click={goToLastMessage}>Revenir au dernier message</button>