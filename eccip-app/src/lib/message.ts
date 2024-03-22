import firebase from '$lib/firebase';
import { ref, set, type DatabaseReference } from 'firebase/database';

const db = firebase.database;
const dbRefString: string = 'messages/';


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

    public async envoyerMessage (uIDEnvoyeur: string, uIDRecipient: string, unMessage: string) {
        let dbRefMessage: DatabaseReference = ref(db, dbRefString + '/' + uIDEnvoyeur + '/' + uIDRecipient);
        set(dbRefMessage, unMessage);
    }  

    public async recuprerMessagesEnvoyes(uIDEnvoyeur: string, uIDRecipient: string) {

    }

}
export default(Message);