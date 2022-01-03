import * as firebase from "firebase/app"

const config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: "githubapivis.firebaseapp.com",
    projectId: "githubapivis",
    storageBucket: "githubapivis.appspot.com",
    messagingSenderId: "889008747489",
    appId: "1:889008747489:web:ee422557fb15f000f4d8a0",
    measurementId: "G-6RP3PNKSMJ"
};


firebase.initializeApp(config);

export default firebase
