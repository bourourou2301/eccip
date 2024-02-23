<script>
</script>
<div class ="contenu">
    <div class="jumbotron text-center">
        <div class="boxTitre">
        <h1 class=companie>Eccip</h1>
        <p class=fonction>We specialize in blablabla</p>
        </div>
        <div class= "boxLogo">
            <h2 class="logo">logo</h2>
        </div>


    </div>
    <div class="titreZone"><h1 >Mon fil</h1>
    </div>
    
    <div class ="scroll-area">
        <!--
            in here you put the posts
        -->
        <h1>yoooooooooooooooo</h1>
        <h1>yoooooooooooooooo</h1>
        <h1>yoooooooooooooooo</h1>
        <h1>yoooooooooooooooo</h1>
        <h1>yoooooooooooooooo</h1>
        <h1>yoooooooooooooooo</h1>
        <h1>scrollllllllllll boxxxxxxxxxxxxxxxxx</h1>
        <h1>yoooooooooooooooo</h1>
        <h1>yoooooooooooooooo</h1>
        <h1>yoooooooooooooooo</h1>
        <h1>yoooooooooooooooo</h1>
        <h1>yoooooooooooooooo</h1>
        <h1>yoooooooooooooooo</h1>
        <h1>yoooooooooooooooo</h1>

    </div>
</div>


<style>    
* {
    margin: 0;
}
.titreZone{
    background-color: aliceblue;
    color:rgb(62, 62, 155);
    text-align: center;
   
}
.boxTitre{
    flex-direction: column;
    text-align: right;
}
.boxLogo{
    text-align: right;
    margin-right: 10px;
    flex-direction: column;
}
.contenu{
    
    padding:0;
}
.scroll-area{
    max-height: calc(100vh - 240px); 
    overflow-y: auto; 
    background-color: aliceblue;
    color:rgb(62, 62, 155);
    left: 122px;
    position: fixed;
    width: 100%; /* Calculate the width to fill the remaining viewport width */
    height:100vh; /* Make the scroll area cover the entire viewport height */
    overflow-y: auto; /* Enable vertical scrolling */
    margin-left: 1px;
}

.jumbotron {
    height: 200px;
    
    margin-top: 0%;
}

.companie {
    text-align: center;
    font-family: 'Courier New', Courier, monospace;
}
.fonction{
    text-align: center;
    font-family: 'Courier New', Courier, monospace;
}
.jumbotron{
        color: aliceblue;
        background-color: rgb(62, 62, 155);
        margin-bottom: 0%;
    }

</style>