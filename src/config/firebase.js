import firebase from 'firebase';

firebase.initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_DATABSE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID
});
  
export const db = firebase.firestore();