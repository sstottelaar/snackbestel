import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

let config = {
    apiKey: "AIzaSyAm_ujSRkXKqEb0RZbJS3N-F62df2BrG5I",
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