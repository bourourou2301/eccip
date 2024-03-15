import firebase from '$lib/firebase';
import { set, ref, push, type DatabaseReference } from 'firebase/database';
let db = firebase.database;
const dbRef: DatabaseReference = ref(db, "offres/");

class Offre{
    titre: string;
    domaine: string;
    location: string;
    salaire: number;
    heures: number;
    ownerUID : string | undefined;
    applicants? : string[];

    public constructor(theTitre:string,theDomaine:string,theLocation:string, theSalaire:number,theHeures:number,theOwnerUID?:string){
     this.titre = theTitre;
     this.domaine = theDomaine;
     this.location = theLocation;
     this.salaire = theSalaire;
     this.heures = theHeures;
     this.ownerUID = theOwnerUID; 
    }   
    public writeOfferToDb(){
        let referencePoste = push(dbRef);
        set(ref(db, "offres/"+referencePoste.key+"/titre"), this.titre);
        set(ref(db, "offres/"+referencePoste.key+"/domaine"), this.domaine);
        set(ref(db, "offres/"+referencePoste.key+"/location"), this.location);
        set(ref(db, "offres/"+referencePoste.key+"/salaire"), this.salaire);
        set(ref(db, "offres/"+referencePoste.key+"/heures"), this.heures);
        set(ref(db, "offres/"+referencePoste.key+"/ownerUID"), this.ownerUID);
        console.log(referencePoste.parent?.key)
    }
    public associerApplicant(uid:string){
        
    }
}
export default Offre;