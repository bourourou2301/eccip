<script lang="ts">
	import '$lib/style.css';
    import firebase from '$lib/firebase';
    import {ref, get, child} from "firebase/database"
        const db = firebase.database;
        let dbRef = ref(db, "users/")
        
        
        let prenom = "prenom"
        let nom = "Doe";
        let typeUser = "";
        let email = "john@example.com";
         let bio = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
         let tagEmploi = "";
         let localisation = "";

         get(child(dbRef, firebase.auth.currentUser!.uid)).then((snapshot) =>{
             prenom = snapshot.val().prenom;
             nom = snapshot.val().nom;
             typeUser = snapshot.val().role;
             email = snapshot.val().email;
             //add other things to get from db as it goes
        })

         function modifierProfil() { window.location.href = 'profil/modification'; }
     </script>
     
    
     <div class ="container-fluid text-center bg-haut">
        <h1>Mon profil</h1>
        
    </div>

<div class="contenu-page">
    <div class="container mt-5">
        <div class="text-center">
            <!-- Profile picture (you can add actual picture here) -->
            <!--<img src="profile-picture.jpg" alt="Profile Picture" class="profile-pic mb-3" />-->
        </div>

        <div class="mb-3">
            <!-- Display user type -->

            <!-- svelte-ignore a11y-label-has-associated-control (ignorer la caution lié a l'utilisation de label sans avoir de form)-->
            <label>Type d'utilisateur :</label>
            <input type="text" class="form-control" value="{typeUser}" readonly>
        </div>

        <div class="mb-5">
            <!-- Display first name, last name, and email (ignorer la caution lié a l'utilisation de label sans avoir de form)-->
            <div class="row">
                <div class="col">
                    <!-- svelte-ignore a11y-label-has-associated-control (ignorer la caution lié a l'utilisation de label sans avoir de form)-->
                    <label>Prénom :</label>
                    <input type="text" class="form-control" value="{prenom}" readonly>
                </div>
                <div class="col">
                    <!-- svelte-ignore a11y-label-has-associated-control (ignorer la caution lié a l'utilisation de label sans avoir de form)-->
                    <label>Nom :</label>
                    <input type="text" class="form-control" value="{nom}" readonly>
                </div>
                <div class="col">
                    <!-- svelte-ignore a11y-label-has-associated-control  (ignorer la caution lié a l'utilisation de label sans avoir de form))-->
                    <label>Email :</label>
                    <input type="email" class="form-control" value="{email}" readonly>
                </div>
            </div>
        </div>

        <div class="mb-5">
            <!-- afficher la description -->
            <!-- svelte-ignore a11y-label-has-associated-control (ignorer la caution lié a l'utilisation de label sans avoir de form)-->
            <label>Bio :</label>
            <textarea class="form-control" style="resize: none;" rows="3" readonly>{bio}</textarea>
        </div>

        <div class="mb-5">
            <!-- afficher job tags -->
            <!-- svelte-ignore a11y-label-has-associated-control (ignorer la caution lié a l'utilisation de label sans avoir de form)-->
            <label>Tag emploi :</label>
            <input type="text" class="form-control" value="{tagEmploi}" readonly>
        </div>

        <div class="mb-5">
            <!-- afficher le lieux de travail -->
            <!-- svelte-ignore a11y-label-has-associated-control (ignorer la caution lié a l'utilisation de label sans avoir de form) -->
            <label>Localisation :</label>
            <input type="text" class="form-control" value="{localisation}" readonly>
        </div>
        <div class= "modifierProfil">
            <button type="submit" class="btn btn-primary" on:click= {modifierProfil}
                    >Modifier profil</button
                >
            
        </div>
    </div>

</div>