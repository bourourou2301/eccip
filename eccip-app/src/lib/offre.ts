import firebase from '$lib/firebase';
import {userId} from "$lib/stores/userId"
import { doc, getDoc, addDoc, collection, DocumentSnapshot, setDoc, updateDoc, arrayUnion } from "firebase/firestore"
const dbFS = firebase.db;

class Offre {
  offreUid?: string;
  titre?: string;
  domaine?: string;
  location?: string;
  salaire?: number;
  heures?: number;
  ownerUID: string | undefined;
  applicants?: string[];

  constructor(
    offreUid?: string,
    titre?: string,
    domaine?: string,
    location?: string,
    salaire?: number,
    heures?: number,
    ownerUID?: string,
    applicants?: string[]
  ) {
    this.offreUid = offreUid ?? '';
    this.titre = titre ?? '';
    this.domaine = domaine ?? '';
    this.location = location ?? '';
    this.salaire = salaire ?? 0;
    this.heures = heures ?? 0;
    this.ownerUID = ownerUID; // Still required
    this.applicants = applicants ?? [];
  }
  static fromDataSnapshot(docSnap: DocumentSnapshot): Offre | null {
    const data = docSnap.data();
    if (!data) {
      return null;
    }

    return new Offre(
      data.offreUid ?? '',
      data.titre ?? '',
      data.domaine ?? '',
      data.location ?? '',
      data.salaire ?? 0,
      data.heures ?? 0,
      data.ownerUID ?? '',
      data.applicants ?? []
    );
  }

  public async writeOfferToDb() {
    //realtime database version
    // let referencePoste = push(dbRef);
    // set(ref(db, "offres/"+referencePoste.key+"/titre"), this.titre);
    // set(ref(db, "offres/"+referencePoste.key+"/domaine"), this.domaine);
    // set(ref(db, "offres/"+referencePoste.key+"/location"), this.location);
    // set(ref(db, "offres/"+referencePoste.key+"/salaire"), this.salaire);
    // set(ref(db, "offres/"+referencePoste.key+"/heures"), this.heures);
    // set(ref(db, "offres/"+referencePoste.key+"/ownerUID"), this.ownerUID);

    //firestore version

      

      const docRef = await addDoc(collection(dbFS, "offres"), {
      domaine: this.domaine,
      heures: this.heures,
      location: this.location,
      ownerUID: this.ownerUID,
      salaire: this.salaire,
      titre: this.titre
    })
    await updateDoc(doc(dbFS, "offres", docRef.id), {
      offreUid: docRef.id
    })
    const userDocRef = await updateDoc(doc(dbFS, "utilisateurs", this.ownerUID! ), {
      offres: arrayUnion(docRef.id)
    })
  }
}
export default Offre;