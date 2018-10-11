const functions = require('firebase-functions')
const admin = require('firebase-admin')

// Init serviceaccount
const serviceAccount = require("./services/snackbestel-4c156-firebase-adminsdk-545e7-99e31fbff7.json")

// Init app
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://snackbestel-4c156.firebaseio.com"
})

// Register firestore
const firestore = admin.firestore()

// Register firestore settings
firestore.settings({
    timestampsInSnapshots: true
})

// Endpoint for testing purposes
// Return all users from auth instance
exports.getUsersDev = functions.https.onRequest((request, response) => {
    admin.auth().listUsers()
        .then((listUserResult) => {
            let users = []
            listUserResult.users.forEach((userRecord) => {
                let userData = userRecord.toJSON()

                let user = {
                    uid: userData.uid,
                    email: userData.email,
                    emailVerified: userData.emailVerified,
                    disabled: userData.disabled,
                    meta: {
                        lastSignInTime: userData.metadata.lastSignInTime
                    }
                }

                users.push(user)
            })
            return response.send(users)
        })
        .catch((err) => {
            console.log(`Error occurred: ${err}`)
            return response.send('Error occurred')
        })
});

exports.getUsers = functions.https.onCall((data, context) => {
    return admin.auth().listUsers()
        .then((listUserResult) => {
            let users = []
            
            listUserResult.users.forEach((userRecord) => {
                let userData = userRecord.toJSON()

                let user = {
                    uid: userData.uid,
                    email: userData.email,
                    emailVerified: userData.emailVerified,
                    disabled: userData.disabled,
                    meta: {
                        lastSignInTime: userData.metadata.lastSignInTime
                    }
                }

                users.push(user)
            })
            
            return users

        })
        .catch((err) => {
            console.log(`Error occurred: ${err}`)
            return {
                error: "Error occurred"
            }
        })
})

