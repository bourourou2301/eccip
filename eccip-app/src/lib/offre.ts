import firebase from '$lib/firebase';
import { get, child,set, ref, push, type DatabaseReference, DataSnapshot } from 'firebase/database';
let db = firebase.database;
const dbRef: DatabaseReference = ref(db, "offres/");

class Offre{
    titre?: string;
    domaine?: string;
    location?: string;
    salaire?: number;
    heures?: number;
    ownerUID : string | undefined;
    applicants? : string[];

    constructor(
        titre?: string,
        domaine?: string,
        location?: string,
        salaire?: number,
        heures?: number,
        ownerUID?: string,
        applicants?: string[]
      ) {
        this.titre = titre ?? '';
        this.domaine = domaine ?? '';
        this.location = location ?? '';
        this.salaire = salaire ?? 0;
        this.heures = heures ?? 0;
        this.ownerUID = ownerUID; // Still required
        this.applicants = applicants ?? [];
      }
      static fromDataSnapshot(snapshot: DataSnapshot): Offre | null {
        const dataObject = snapshot.val();
        if (!dataObject) {
          return null; // Handle missing data
        }
    
        return new Offre(
          dataObject.titre ?? '',
          dataObject.domaine ?? '',
          dataObject.location ?? '',
          dataObject.salaire ?? 0,
          dataObject.heures ?? 0,
          dataObject.ownerUID,
          dataObject.applicants ?? []
        );
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
    //faut fix pour pouvoir read avec un id specifique/le dernier generer
    public readOfferFromDb(){
        const dbRef: DatabaseReference = ref(db, "offres/");
        get(child(dbRef, "-NtaIQb0UriehUZZB2LA")).then((snapshot) =>{
            let offer_read = Offre.fromDataSnapshot(snapshot)
            return offer_read;
        })    
    }
    public filtrerOffre(motDeRecherche: string){
        
    }
}
export default Offre;