import firebase from "firebase"
import firestore from "firebase/firestore"

var firebaseConfig = {
    apiKey: "AIzaSyD6TKzNhbmLVw0VkhZXuSYrk0ySyiuAkcQ",
    authDomain: "geo-ninja-16f96.firebaseapp.com",
    databaseURL: "https://geo-ninja-16f96.firebaseio.com",
    projectId: "geo-ninja-16f96",
    storageBucket: "geo-ninja-16f96.appspot.com",
    messagingSenderId: "606146782532",
    appId: "1:606146782532:web:24d41e4ff4daa1bf0de311",
    measurementId: "G-DY02Q1GVV7"
  };
  // Initialize Firebase
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  export default firebaseApp.firestore()