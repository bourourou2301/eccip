<script>
    import ChatBar from './ChatBar.svelte'; // Chemin relatif à la position du fichier +page.svelte
</script>
<div class="titrePage">
    <div class="container-fluid text-center">
        <h1>Mes Messages</h1>
    </div>
</div>
<div> 
    <div class="container-fluid contenuPage">
        <div class="row">
            <div class="col-md-3 bg-light messageOuvert">
                
                <h2>Mes converstations</h2>
                <p>ici seront les différentes conversation déjà commencées</p>
            </div>
            <div class="col-md-9 bg-white messageActuel">
                <h1>conversation à la une</h1>
                <p>Ici serait le dernier message ouvert</p>
            </div>
        </div>
    </div>
</div>
<style>
    .contenuPage{
        margin-left: 120px;
    }
    .messageActuel{
        border-left: 1px solid #dddddd;
    }
    .titrePage{
        background-color: rgb(62, 62, 155);
        color: aliceblue;
    }

</style>
