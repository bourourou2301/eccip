import { writable, type Writable } from 'svelte/store';

// type User = {
//  sEmail: string;
//  sPrenom: string;
//  sNom: string;
//  sPhotoURL?: string | null;
//  sUid: string;
//  sRole: string;
// };

export type SessionState = {
//  sUser: User;
 sUid: string;
 sLoading: boolean;
 sLoggedIn: boolean;
};

export const session = <Writable<SessionState>>writable();