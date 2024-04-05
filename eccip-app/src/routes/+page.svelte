<script lang="ts">
    import Message from "$lib/message";
	import { session } from "$lib/stores/session";
    const message1 = new Message();

    let userID: string;
    session.subscribe((cur:any) => {
        userID = cur?.sUid.uid;
    })

    
  async function envoyerMessage() {
    await message1.envoyerMessage(userID, "-NuiQuiWis10-u4r_uve", "salut");
  }
  async function recupererMessage() {
    await message1.recuprerMessagesEnvoyes(userID, "-NuiQuiWis10-u4r_uve");
  }

  async function creerChat() {
    await message1.creerConversation(userID, "LKFf55XP8gcioT5ynILAiYRBYaG3");
  }

</script>

<div>
    <h1 style="text-align: center;">BIENVENUE SUR ECCIP</h1>
    <a href="/creer-offre">Creer offre</a>
    <button on:click={creerChat}>CreerChat</button>
    <button on:click={envoyerMessage}>Test envoyer message</button>
    <button on:click={recupererMessage}>Test recevoir message</button>
</div>

<style>
    a, button{
        display: flex;
        justify-content: center;
        align-items: center;
    }

</style>