import firebase from '$lib/firebase';
import { ref, set, type DatabaseReference, onValue, orderByChild, query, push } from 'firebase/database';
import { Timestamp } from "firebase/firestore";

const db = firebase.database;



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
// message --> uiduserquiasend --> uiddurecipient/heure/message

    public async creerConversation (uIDEnvoyeur: string, uIDRecipient: string) {
        const dbRef: DatabaseReference = ref(db, 'users/' + uIDEnvoyeur + '/');
        const cleConversation = push(dbRef);
        set(ref(db, 'users/' + uIDEnvoyeur + '/' + cleConversation.key + '/'), uIDRecipient);
        set(ref(db, 'users/' + uIDRecipient + '/' + cleConversation.key + '/'), uIDEnvoyeur);
        const dbRefConversations: DatabaseReference = ref(db, 'conversations/');
        push(dbRefConversations, cleConversation.key);
        // console.log(cleConversation.key);
    }

    public async envoyerMessage (uIDEnvoyeur: string, cleConversation: string, unMessage: string) {
        let dbRefDefaut: string = 'conversations/' + cleConversation + '/' +  unMessage + '/';
        let dbRefMessage: DatabaseReference = ref(db, dbRefDefaut);
        push(dbRefMessage, Timestamp.now().valueOf());
        push(dbRefMessage, uIDEnvoyeur)
    }  

    public async recuprerMessagesEnvoyes(uIDEnvoyeur: string, uIDRecipient: string) {
        let dbRefMessage: DatabaseReference = ref(db, 'chat/' + uIDEnvoyeur + '/' + uIDRecipient);
        //doit trier selon nombre pas selone
        const orderByField = 'messages';
        const orderedQuery = query(dbRefMessage, orderByChild(orderByField));
        onValue(orderedQuery, (snapshot) => {
            const data = snapshot.val();
            // Process the ordered data here
            console.log("Ordered data:", data);
          });
    }

}
export default(Message);