

<div class="titrePage">
	<div class="container-fluid text-center">
		<h1>Les offres d'emploi</h1>
	</div>
</div>
<body>
<div>
	{#if typeuser != 'recruteur'}
		<header>
			<h1>Job Offers</h1>
			<input type="text" id="searchInput" placeholder="Search..." />
		</header>
		<main id="jobOffers">
			<!-- Job offers will be dynamically inserted here -->
		</main>
	{:else}
    <!-- version de la page pour les recruteur-->
    {/if}
</div>
</body>
<script src="script.js">
	let typeuser = ''; // la variable pour afficher le type de page correct selon le type de user
</script>
<style>
	body {
		font-family: Arial, sans-serif;
		margin: 0;
		padding: 0;
	}

	header {
		background-color: #f0f0f0;
		padding: 20px;
		text-align: center;
	}

	input[type='text'] {
		padding: 10px;
		width: 300px;
		border-radius: 5px;
		border: 1px solid #ccc;
	}

	main {
		padding: 20px;
	}

	#jobOffers {
		border: 1px solid #ccc;
		padding: 10px;
		margin-bottom: 10px;
	}
</style>
