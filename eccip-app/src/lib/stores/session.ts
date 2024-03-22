import { writable, type Writable } from 'svelte/store';

type SessionState = {
 sUid: string | undefined;
 sLoading: boolean | undefined;
 sLoggedIn: boolean | undefined;
};

export let session: Writable<SessionState> = writable({
    sUid: undefined,
    sLoading: undefined,
    sLoggedIn: undefined
});