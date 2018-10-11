import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/functions'

// Define config
let config = {
    apiKey: process.env.VUE_APP_GOOGLE_API_KEY,
    authDomain: "snackbestel-4c156.firebaseapp.com",
    databaseURL: "https://snackbestel-4c156.firebaseio.com",
    projectId: "snackbestel-4c156",
    storageBucket: "",
    messagingSenderId: "37498768046"
}

// Initialize Firebase
firebase.initializeApp(config)

// Create db reference
const db = firebase.firestore()

// Create functions reference
const functions = firebase.functions()

// Use settings
db.settings({
    timestampsInSnapshots: true
})

export { firebase, db, functions }