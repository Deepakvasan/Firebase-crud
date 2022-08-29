const { initializeApp } = require('firebase/app');
const { getFirestore, collection, setDoc, getDocs, doc, updateDoc, deleteDoc} = require('firebase/firestore');
const firebaseConfig = {
    apiKey: "AIzaSyDYtFPMipRv07QyVfeCAYT1D_nITtMNIZk",
    authDomain: "robo-club-crud.firebaseapp.com",
    projectId: "robo-club-crud",
    storageBucket: "robo-club-crud.appspot.com",
    messagingSenderId: "523152537459",
    appId: "1:523152537459:web:1e014eb4f8e0d362cf3706"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const user = collection(db, "users");

module.exports.user = user;
module.exports.setDoc = setDoc;
module.exports.getDocs = getDocs;
module.exports.doc = doc;
module.exports.db = db;
module.exports.updateDoc = updateDoc;
module.exports.deleteDoc = deleteDoc;