import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyBM4wUx7-z-ANqO6SJEiXcumFWfWMcs0bw",
    authDomain: "text-react.firebaseapp.com",
    databaseURL: "https://text-react.firebaseio.com",
    projectId: "text-react",
    storageBucket: "text-react.appspot.com",
    messagingSenderId: "766800882372"
};

firebase.initializeApp(config);
firebase.firestore().settings({ timestampsInSnapshots: true });

export default firebase;