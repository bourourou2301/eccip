<script>
 import "$lib/style.css";
 let inputs= ['','','','',''];
</script>
<div class="container-fluid text-center bg-haut">
	<h1>Créer une offre</h1>
</div>
<div class= "container-fluid contenu-page">
    <form >
        <div class="mb-3">
            <label for="input1" class="form-label">Input 1</label>
            <input type="text" class="form-control" id="input1" bind:value={inputs[0]} placeholder="Enter value for input 1">
        </div>
        <div class="mb-3">
            <label for="input2" class="form-label">Input 2</label>
            <input type="text" class="form-control" id="input2" bind:value={inputs[1]} placeholder="Enter value for input 2">
        </div>
        <div class="mb-3">
            <label for="input3" class="form-label">Input 3</label>
            <input type="text" class="form-control" id="input3" bind:value={inputs[2]} placeholder="Enter value for input 3">
        </div>
        <div class="mb-3">
            <label for="input4" class="form-label">Input 4</label>
            <input type="text" class="form-control" id="input4" bind:value={inputs[3]} placeholder="Enter value for input 4">
        </div>
        <div class="mb-3">
            <label for="input5" class="form-label">Input 5</label>
            <input type="text" class="form-control" id="input5" bind:value={inputs[4]} placeholder="Enter value for input 5">
        </div>
        <button type="submit" class="btn btn-primary">Créer offre</button>
    </form>

</div>