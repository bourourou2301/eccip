# Explication du projet
Le projet Eccip est une platforme pour la recherche de stage. Elle constitue d'une base de données de stages qui sera alimentée par les deux types d'utilisateurs, soit les encadreurs et les stagiaires. Ainsi que des fonctionnalités de de communcation tels que le clavardage entre le stagiaire et son encadreur et un rapport de stage qui sera complétable et remis à la fréquence établie par l'encadreur. Cette platforme peut être déployer par les institutions scolaires pour faciliter la découverte de stage. Les deux types d'utilisateurs peuvent ajouté des offres de stages à la base de données, ainsi alimentant la base de données pour tous les utilisateurs connectés sur la plateforme. 




<img src="./logo.jpg">



# Comment lancer le projet
- Cloner le repository avec la commande git clone git@github.com:bourourou2301/eccip.git
- Vérifier que Npm est installé sur le pc
- Ouvrir le projet sur un IDE (VS Code a été utilisé pour coder le projet)

- Lancer un terminal à partir de l'IDE

- Une fois dans le fichier eccip, atteindre le fichier eccip-app en effectuant la commande cd .\eccip-app\

- Vérifier que la version la plus récente de Npm est installée dans l'application en effectuant la commande npm update

- Dans certaines situations, si mentionné par le terminal, il sera préférable d'exécuter la commande npm install

- Excécuter la commande npm run dev pour lancer l'application localement

- Effectuer un contrôle+clique sur le lien qui apparaitra dans le terminal. (Cette page est l'application)

# Comment utiliser le projet

## connexion

- création d'un compte simple par email

- L'utilisateur peut s'identifier comme un encadreur ou bien comme stagiaire
### Bout de code:
![connexion](https://github.com/bourourou2301/eccip/assets/136940252/1f09bc99-8ed6-444f-84ae-0037337b5376)
![creerCompte](https://github.com/bourourou2301/eccip/assets/136940252/03276857-c1ef-4eab-ae25-5b28ffc17250)


## Accueil
-La page d'accueil pour les deux utilisateurs contient le même contenu, soit un fil de différentes offres récemement ajoutées ainsi qu'une barre de navigation pour se rediriger vers les autres pages.
### Bout de code:
![accueil](https://github.com/bourourou2301/eccip/assets/136940252/51dbe356-3faa-4ea8-b446-07ed4ed6ae29)

## Chats
- La page de clavardage affichera les derniers chats qu'un utilisateur a effecté. De plus cette page une fois un chat sélectionné, permettra d'envoyer des message entre les différents utilisateurs de la plateforme.
Cette technique de communication permettra au encadreur de transmettre des informations à leurs stagiaires et vis-versa.
### Bout de code:
![chat](https://github.com/bourourou2301/eccip/assets/136940252/f3b4b922-3b44-48e9-a330-27ee2067fdc6)
![chatBarComponent](https://github.com/bourourou2301/eccip/assets/136940252/996290ae-6975-4ee5-b86b-b97b4e4f4ef1)

## Rapport de stage
- La page du rapport de stage est un document dans lequel le stagiare pourra remplir des informations sur son stage et le transmettre à son encadreur. Cela permettra de garder l'encadreur à jour sur le stage de son stagiaire.
### Bout de code:
![envoyerRapport](https://github.com/bourourou2301/eccip/assets/136940252/b92a61ba-a99e-40ca-8f4a-a84e487282f2)

## Les offres 
- La page d'offre permet de rechercher parmi toutes les offres de stage disponibles. De plus, la page d'offre possède l'option de créer des nouvelles offres de stage.
### Bout de code:
![creationDoffre](https://github.com/bourourou2301/eccip/assets/136940252/cc021713-e6f4-4c60-bc76-e18121b132d5)

## Profil
- La page de profil permet d'oberserver les informations sur son profil, ainsi qu'atteindre la page de modification du profil. Sur cette page, on peut modifier toutes les informations du profil.
### Bout de code:
![profil](https://github.com/bourourou2301/eccip/assets/136940252/5f49ea1b-fd25-4e25-bd1b-0e3c0a78c81c)

## Barre de navigation
### Bout de code:
![navbar](https://github.com/bourourou2301/eccip/assets/136940252/4ece34b1-a52b-461c-b326-d9b5e14d57b3)




