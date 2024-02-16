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
        <nav class="navbar">
            <a href="">Accueil</a>
            <a href="">Chat</a>
            <a href="">Horaire</a>
            <a href="">À propos</a>
        </nav>
        <div id="profile-pic"></div>
        <button on:click={writeToDatabase}>Write To Database</button>
</div>
<slot></slot>

<style>
#navbar-parent {
    background-color: rgb(62, 62, 155);
    width: 150px;
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
        color: rgb(0, 0, 0);
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