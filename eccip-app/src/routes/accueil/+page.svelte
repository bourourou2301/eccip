<!--Intréssant pour montrer notre feed plus tard-->
<!--
{#each data.posts as post}
			<li>
				<a href="/blog/{post.slug}">
					{post.title}
				</a>
			</li>
		{/each}

-->
<script lang="ts">
	import Offre from '$lib/offre';
	import firebase from '$lib/firebase';
	import { get, child,set, ref, push, type DatabaseReference, DataSnapshot } from 'firebase/database';

	let db = firebase.database;
	const dbRef: DatabaseReference = ref(db);
	let isShowFeed = false;
	const offresArray:any = [] 

	function showFeed(){
	get(child(dbRef, "offres/")).then((snapshot)=>{
		snapshot.forEach(function (offres_snapshot){
			offresArray.push(Offre.fromDataSnapshot(offres_snapshot))
		})
		for(let i = 0; i < offresArray.length; i++){
		console.log(offresArray[i])
	}
	isShowFeed = true;
	})
	
	}
</script>

<div>
	<button type="button" on:click={showFeed}>Show the Feed!!!</button>
</div>
