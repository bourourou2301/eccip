import firebase from '$lib/firebase';
    import { set, ref } from 'firebase/database';
	import Page from './+page.svelte';
    var counter = 0;
    export function writeToDatabase() {
        const database = firebase.database;
        const dataToWrite = {
            TimeAtTimeOfButtonPress : new Date().toLocaleString()
        };
    const dbRef = ref(database, 'TimeAtButtonPress/PressNumber'+counter+'/');
    counter = counter +1;
    set(dbRef, dataToWrite);
    }
    export const prerender = true;