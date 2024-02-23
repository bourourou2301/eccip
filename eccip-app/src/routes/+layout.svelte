<script lang="ts">
    //import {writeToDatabase} from './+layout';
    import {loading, loggedIn, logout, auth} from './+layout'
</script>


{#if loading}
	<div>Loading...</div>
    <div id="navbar-parent">
        <nav class="navbar">
            <a href="/">Accueil</a>
            <a href="/chat">Chat</a>
            <a href="/horaire">Horaire</a>
            <a href="/a-propos">À propos</a>
        </nav>
        <div id="profile-pic"></div>
        <button on:click={logout}>Se déconnecter</button>
        <!--
            <button on:click={writeToDatabase}>Write To Database</button>
        --> 
    </div>
{:else}
	<div>
		Logged in: {loggedIn}

		<div>
			{#if loggedIn}
				<button on:click="{logout}">Logout</button>
            <h1>current user : {auth.currentUser?.email}
            </h1>
			{:else}
				<a href="/connexion"> Login</a>
			{/if}
		</div>
	</div>
{/if}

<slot></slot>

<style>
#navbar-parent {
    background-color: rgb(62, 62, 155);
    width: 100px;
    height: 80vh;
    box-shadow: 10px 10px 10px #5e5454;
    padding: 20px;
    margin-left: 20px;
    margin-top: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: fixed;
    border-radius: 20px;
}

.navbar {
    display: flex;
    gap: 20px;
    flex-direction: column;
    box-sizing: border-box;
    width:fit-content;
    height: fit-content;
    justify-content: center;
    align-items: center;
}

.navbar a {
    font-family: 'Courier New', Courier, monospace;
    text-align: center;
        color: rgb(255, 255, 255);
    text-decoration: none;
    background-color: transparent;
}

#profile-pic {
    margin-left: auto;
    margin-right: auto;
    margin-top: 50px;
    background-color: black;
    border-radius: 50%;
    width: 65px;
    height: 65px;
}
</style>
