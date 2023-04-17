import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyABPYPgv-RFiyhhCJEmNaKNDEZbHDrjegI',
  authDomain: 'chat-app-1448d.firebaseapp.com',
  projectId: 'chat-app-1448d',
  storageBucket: 'chat-app-1448d.appspot.com',
  messagingSenderId: '215544162155',
  appId: '1:215544162155:web:c6eea6f31bd9bfd8c08e2e',
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
