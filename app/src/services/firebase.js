import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

let config = {
    apiKey: process.env.VUE_APP_GOOGLE_API_KEY,
    authDomain: "snackbestel-4c156.firebaseapp.com",
    databaseURL: "https://snackbestel-4c156.firebaseio.com",
    projectId: "snackbestel-4c156",
    storageBucket: "",
    messagingSenderId: "37498768046"
}

firebase.initializeApp(config)

const db = firebase.firestore()

db.settings({
    timestampsInSnapshots: true
})

export { firebase, db }