<div class="container-fluid text-center bg-haut">
    <h1>Mon horaire</h1>
</div>
<div class="container-fluid text-center grille">
    <div class="row text-center">
        <div class="col-24 times"><div class="time-slot">0:00</div><!-- ce bloc contient les heures de travail-->
        <div class="time-slot">1:00</div>
        <div class="time-slot">2:00</div>
        <div class="time-slot">3:00</div>
        <div class="time-slot">4:00</div>
        <div class="time-slot">5:00</div>
        <div class="time-slot">6:00</div>
        <div class="time-slot">7:00</div>
        <div class="time-slot">8:00</div>
        <div class="time-slot">9:00</div>
        <div class="time-slot">10:00</div>
        <div class="time-slot">11:00</div>
        <div class="time-slot">12:00</div>
        <div class="time-slot">13:00</div>
        <div class="time-slot">14:00</div>
        <div class="time-slot">15:00</div>
        <div class="time-slot">16:00</div>
        <div class="time-slot">17:00</div>
        <div class="time-slot">18:00</div>
        <div class="time-slot">19:00</div>
        <div class="time-slot">20:00</div>
        <div class="time-slot">21:00</div>
        <div class="time-slot">22:00</div>
        <div class="time-slot">23:00</div>
        <div class="time-slot">24:00</div>
    </div>
        <!--Ici les journees de travail-->
      <div class="col-2 day-header">Dimanche</div>
      <div class="col-2 day-header">Lundi</div>
      <div class="col-2 day-header">Mardi</div>
      <div class="col-2 day-header">Mercredi</div>
      <div class="col-2 day-header">Jeudi</div>
      <div class="col-2 day-header">Vendredi</div>
      <div class="col-2 day-header">Samedi</div>
    </div>
</div>
<style>
    .bg-haut {
    background-color:rgb(62, 62, 155); ;
    color: aliceblue;
}
.grille {
    display: flex;
        margin-left: 200px; /* Adjust margin to leave space for the navbar */
        padding: 20px; /* Optional padding */
    }

    /* Set height of rows */
    .row {
        display: flex;
        width: 100%;
    }

    /* Set width of columns */
    .col-2 {
    width: calc(100% / 8);
    text-align: center;
    border: 1px solid #ddd;
    }
    .col-24{
        margin-top: 20px;
    width: min-content +2px;  
    text-align: left;
    border: 1px solid #ddd;
    }
    </style>





