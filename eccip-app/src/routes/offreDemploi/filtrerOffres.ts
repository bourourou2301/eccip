import Offre from "$lib/offre";
import firebase from "$lib/firebase";
import { ref, get} from "firebase/database";


let db = firebase.database; 
const dbRef = ref(db, "offres/")
const arrayOffre:Offre[]|null = [];

get(dbRef).then((snapshot) =>{
    let dataObject = snapshot.val();
    arrayOffre.forEach(element => {
        arrayOffre.push(new Offre(element.titre,
             element.domaine, element.location, 
             element.salaire, element.heures,
              element.ownerUID, element.applicants))
    });
})    

 export function filtrerOffre(arrayOffre: Offre[], motDeRecherche: string){
    const arrayOffresMatch : Offre[] = [];
    for (let i=0;i<arrayOffre.length;i++){
           let arrrayObjectAttributes = Object.values(arrayOffre[i])
            arrrayObjectAttributes.find(element => {
                if(element == motDeRecherche){
                    arrayOffresMatch.push(arrayOffre[i])
                }
            })
    }
    return arrayOffresMatch;
}