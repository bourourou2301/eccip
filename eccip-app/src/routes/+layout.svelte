<script>
    import firebase from '$lib/firebase';
    import { set, ref } from 'firebase/database';
    var counter = 0;
    function writeToDatabase() {
        const database = firebase.database;
        const dataToWrite = {
            TimeAtTimeOfButtonPress : new Date().toLocaleString()
        };
    const dbRef = ref(database, 'TimeAtButtonPress/PressNumber'+counter+'/');
    counter = counter +1;
    set(dbRef, dataToWrite);
    }
</script>
    <div id="navbar-parent">
        <div id="profile-pic"></div>
        <nav class="navbar">
            <a href="/">Accueil</a>
            <a href="/chat">Chat</a>
            <a href="/horaire">Horaire</a>
            <a href="/profil">Mon profil</a>
        </nav>
        <button on:click={writeToDatabase} class="btn btn-danger btn-sm">Se déconnecter</button>
    </div>
    <slot></slot>

<style>
    
#navbar-parent {
    background-color: rgb(62, 62, 155);
    width: 120px;
    height: 100vh;
    box-shadow: 10px 10px 10px #19355a;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: fixed;
    margin-right: 2px;
    
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
        color: aliceblue;
    text-decoration: none;
    margin-top: 20px;
    margin-bottom: 20px;
}

#profile-pic {
    margin-left: auto;
    margin-right: auto;
    margin-top: 10px;
    margin-bottom: 50px;
    background-color: black;
    border-radius: 50%;
    width: 65px;
    height: 65px;
}
</style>