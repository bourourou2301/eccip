import firebase from '$lib/firebase';
import { collection, addDoc, doc, setDoc, serverTimestamp, onSnapshot, getDoc, query, where, getDocs } from "firebase/firestore";


const db = firebase.db;



class Message {
  uIDEnvoyeur: string | undefined;
  unMessage: string | undefined;
  uIDRecipient: string | undefined;
  tempsEnvoyee: number | undefined;


  // ne sert a rien a par organise le contenu du message un fois 
  //linfo tiree une seul fois de la base de donnees
  // public constructor(uIDEnvoyeur?: string, unMessage?: string, uIDRecipient?: string, tempsEnvoyee?: number) {
  //     this.uIDEnvoyeur = uIDEnvoyeur;
  //     this.unMessage = unMessage;
  //     this.uIDRecipient = uIDRecipient;
  //     this.tempsEnvoyee = tempsEnvoyee;
  // }


  public async hasExistingConversation(uIDEnvoyeur: string, uIDRecipient: string): Promise<boolean> {
    // const docRef = doc(collection(db, "utilisateurs", uIDEnvoyeur, "chats"));
    // const docSnapshot = await getDoc(docRef);
    // console.log(docSnapshot.data())
    // return docSnapshot.exists();
    const collectionRef = collection(db, "utilisateurs", uIDEnvoyeur, "chats");
    const q = query(collectionRef, where("utilisateurRecipient", "==", uIDRecipient));
    const snapshot = await getDocs(q);
    if(snapshot.size != 0){
      return true
    }
    else{
      return false;
    }
  }


  public async creerConversation(uIDEnvoyeur: string, uIDRecipient: string, nomComplet: string, nomEnvoyeur: string) {
    const hasConversation = await this.hasExistingConversation(uIDEnvoyeur, uIDRecipient);
    if (!hasConversation) {
      console.log("nique ta mere la pute");
      const docRef = await addDoc(collection(db, "conversations"), {});
      const docData1 = {
        cleConversation: docRef.id,
        utilisateurRecipient: uIDRecipient,
        nomComplet: nomComplet
      };
      await addDoc(collection(db, "utilisateurs", uIDEnvoyeur, "chats"), docData1);
      const docData2 = {
        cleConversation: docRef.id,
        utilisateurRecipient: uIDEnvoyeur,
        nomComplet: nomEnvoyeur
      };
      await addDoc(collection(db, "utilisateurs", uIDRecipient, "chats"), docData2);
    } else {
      console.log("Vous avez déjà une conversation avec cet utilisateur.");
    }
  }


  public async envoyerMessage(cleConversation: string, unMessage: string, uIDEnvoyeur: string, uIDRecipient: string) {
    const docData = {
      message: unMessage,
      enoyeA: serverTimestamp(),
      envoyePar: uIDEnvoyeur,
      recuPar: uIDRecipient
    }
    await addDoc(collection(db, "conversations", cleConversation, "messages"), docData)
  }



  // public async recuprerMessagesEnvoyes(cleConversation: string, uIDEnvoyeur: string) {
  //     session.subscribe((cur : any) => {
  //         let uid = cur.sUid.uid;
  //         const unsub = onSnapshot(collection(db, "conversations", cleConversation, "messages"), (collection) => {
  //             collection.forEach((doc) => {
  //                 if (doc.get("envoyePar") === uid) {
  //                   listeMessages.set(doc.get("message"), true);
  //                   console.log("if 1");
  //                   console.log(listeMessages);
  //                 } else {
  //                   listeMessages.set(doc.get("message"), false)
  //                   console.log("if 1");
  //                 }
  //             });
  //         });
  //     });
  // }

}
export default (Message);