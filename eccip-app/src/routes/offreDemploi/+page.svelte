
	<script>
		import "$lib/style.css";
		function pageCréationOffre() { window.location.href = 'offreDemploi/CreerOffre'; }
	</script>


    <div class="bg-haut">
        <div class="container-fluid text-center">
            <h1>Les offres d'emploi</h1>
        </div>
    </div>

    <div class="contenu-page">
        
        <header class="d-flex justify-content-center">
			<div class= "row">
			<div class ="recherche">
            	<input type="text" id="searchInput" placeholder="Rechercher..." />
			</div>
			<div class= "boutonPageOffre">
				<button class="btn btn-primary"on:click= {pageCréationOffre}>créer une offre</button>

			</div>
		</div>
        </header>
        <main id="jobOffers">
            <h1> Les offres de jobs ici</h1>
        </main>

    </div>


