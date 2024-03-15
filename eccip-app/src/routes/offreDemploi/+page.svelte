
	<script>
		let typeUser = ''; // la variable pour afficher le type de page correct selon le type de user
	</script>


    <div class="titrePage">
        <div class="container-fluid text-center">
            <h1>Les offres d'emploi</h1>
        </div>
    </div>

    <div>
        {#if typeUser != 'recruteur'}
        <header>
            <input type="text" id="searchInput" placeholder="Rechercher..." />
        </header>
        <main id="jobOffers">
            <h1> Les offres de jobs ici</h1>
        </main>
        {:else}
        <!-- version de la page pour les recruteur-->
        {/if}
    </div>


<style>
	.titrePage{
		background-color:rgb(62, 62, 155) ;
		color: aliceblue;
	}
	
	header {
		background-color: #f0f0f0;
		padding: 20px;
		text-align: center;
	}

	#searchInput {
		padding: 10px;
		width: 300px;
		border-radius: 5px;
		border: 1px solid #ccc;
	}
	#jobOffers {

		border: 1px solid #ccc;
		padding: 20px;
		margin-bottom: 10px;
		margin-left: 120px;
	}
</style>
