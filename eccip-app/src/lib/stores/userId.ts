import { writable } from 'svelte/store';

export const userId = writable("1");
// const userId = localStorage.getItem('userId')
// export const userIdStore = writable(userId ? JSON.parse(userId) : []);

