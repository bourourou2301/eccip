import firebase from '$lib/firebase';
import { collection, addDoc, doc, setDoc, serverTimestamp, onSnapshot, where, query } from "firebase/firestore"; 


const db = firebase.db;


class Message {
    uIDEnvoyeur: string | undefined;
    unMessage: string | undefined;
    uIDRecipient: string | undefined;
    tempsEnvoyee: number | undefined;

    // ne sert a rien a par organise le contenu du message un fois 
    //linfo tiree une seul fois de la base de donnees
    public constructor(uIDEnvoyeur?: string, unMessage?: string, uIDRecipient?: string, tempsEnvoyee?: number) {
        this.uIDEnvoyeur = uIDEnvoyeur;
        this.unMessage = unMessage;
        this.uIDRecipient = uIDRecipient;
        this.tempsEnvoyee = tempsEnvoyee;
    }


    public async creerConversation (uIDEnvoyeur: string, uIDRecipient: string) {
        const docRef = await addDoc(collection(db, "conversations"), {
        });
        console.log("Document written with ID: ", docRef.id);
        
        const docData = {
            cleConversation: docRef.id,
            utilisateurRecipient: uIDRecipient    
        };
        await setDoc(doc(db, "utilsateurs", uIDEnvoyeur), docData);
    }


    public async envoyerMessage (cleConversation: string, unMessage: string, uIDEnvoyeur: string, uIDRecipient:string) {
        const docData = {
            message: unMessage,
            enoyeA: serverTimestamp(),
            envoyePar: uIDEnvoyeur,
            recuPar: uIDRecipient
        }
        await addDoc(collection(db, "conversations", cleConversation, "messages"), docData)
    }


    public async recuprerMessagesEnvoyes(cleConversation: string, uIDEnvoyeur: string) {
        const unsub = onSnapshot(collection(db, "conversations", cleConversation, "messages"), (collection) => {
        collection.forEach((doc) => {
            console.log('Document changed:', doc.id, '=>', doc.data());
          });
        });

    }

}
export default(Message);