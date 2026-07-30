import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: 'AIzaSyBPBSgtl2GmUi6hksy4a7NRoIGuiiF4Te0',
  authDomain: 'firecloak-ea9aa.firebaseapp.com',
  projectId: 'firecloak-ea9aa',
  storageBucket: 'firecloak-ea9aa.appspot.com',
  messagingSenderId: '36970121773',
  appId: '1:36970121773:web:f43fb33af219044ba786a4',
};

const firebaseApp = initializeApp(firebaseConfig);

// A single shared Firestore instance, imported directly wherever it's
// needed (same pattern as SOCIAL_LINKS/NAV_LINKS) rather than an
// Angular DI provider — there's no Angular-specific wrapper installed
// (see the @angular/fire compatibility issue), so this is just the
// plain modular Firebase SDK.
export const firestore = getFirestore(firebaseApp);
