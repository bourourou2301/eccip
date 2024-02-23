    import firebase from '$lib/firebase';
    import { set, ref } from 'firebase/database';
    import { signOut, onAuthStateChanged } from 'firebase/auth';
	
    import { onMount } from 'svelte';
    import { session } from '$lib/stores/session';
    import { goto } from '$app/navigation';
    
    /*
    import Page from './+page.svelte';
    import type  PageLoad  from './$types';
    
    //import type LayoutLoad from './$types';
    import type { LayoutData } from './$types';
    export let data: LayoutData;
    */
    


    /*
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
    */
    


    let auth = firebase.auth;
    let loading: boolean = true;
    let loggedIn: boolean = false;

    session.subscribe((cur: any) => {
     loading = cur?.loading;
     loggedIn = cur?.loggedIn;
    });

    onMount(async () => {
     const user: any = await data.getAuthUser();
   
     const loggedIn = !!user && user?.emailVerified;
     session.update((cur: any) => {
      loading = false;
      return {
       ...cur,
       user,
       loggedIn,
       loading: false
      };
     });
   
     if (loggedIn) {
     }
     else{
        goto('/login')
     }
    });

    function logout() {
		signOut(auth)
			.then(() => {
				goto('/login');
				loggedIn = false;
			})
			.catch((error) => {
				throw new Error(error);
			});
	}
   


    //const auth = firebase.auth;
    
    export async function load({ url }) {
        
        function getAuthUser() {
        
      return new Promise((resolve) => {
       onAuthStateChanged(auth, (user) => resolve(user ? user : false));
      });
     }
    
     return {
      getAuthUser: getAuthUser,
      url: url.pathname
     };
    }   