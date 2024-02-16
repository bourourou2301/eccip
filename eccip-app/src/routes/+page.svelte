<style>
    @import './style.css';
</style>

<h1 class="titre"> ECCIP </h1>


<!--
<div class="sidebar">
    <ul>
        <a href=""></a>
    </ul>
</div>
-->

<!--
    example of a database set, be sure to import the first line, in the second you add what methods u need (set, update, delete, ect)
-->
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

<div>
    <!--Button that writes to db, remove if uneeded-->
    <button on:click={writeToDatabase}>Write To Database</button>
    <nav class="navbar">
        <a href="https://www.youtube.com">Accueil</a>
        <a href="https://www.youtube.com">Feed</a>
        <a href="https://www.youtube.com">A propos</a>
    </nav>
</div>