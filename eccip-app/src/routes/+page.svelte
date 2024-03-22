<script>
    import Message from "$lib/message";
	import { session } from "$lib/stores/session";
    const message1 = new Message();
</script>

<div>
    <h1 style="text-align: center;">BIENVENUE SUR ECCIP</h1>
    <a href="/creer-offre">Creer offre</a>
    <!-- <button on:click={message1.envoyerMessage(session.subscribe())}>Test message</button> -->
</div>

<style>
    a, button{
        display: flex;
        justify-content: center;
        align-items: center;
    }

</style>