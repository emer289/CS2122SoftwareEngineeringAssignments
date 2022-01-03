import firebase from 'firebase'
import 'firebase/firestore'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCqLXvs4rE0cGSGUULXBbCU-5GIw4iKQl8",
    authDomain: "githubapivis.firebaseapp.com",
    projectId: "githubapivis",
    storageBucket: "githubapivis.appspot.com",
    messagingSenderId: "889008747489",
    appId: "1:889008747489:web:ee422557fb15f000f4d8a0",
    measurementId: "G-6RP3PNKSMJ"
};

firebase.initializeApp(firebaseConfig)

export default firebase