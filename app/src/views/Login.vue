<template>
    <div class="section">
                
        <!-- Loader -->
        <b-loading :is-full-page="isFullPage" :active.sync="isLoading" :can-cancel="true"></b-loading>

        <div class="container">

            <div class="columns">
                <div class="column is-4 is-offset-4">

                    <div class="content">
                        <h1 class="title">Aanmelden</h1>
                        <p>Log in om je bestelling te plaatsen.</p>
                    </div>

                    <!-- Login input -->
                    <div class="form-container">
                        <b-field label="Email">
                            <b-input v-model="email" type="email" placeholder="Werk email" autocapitalize="off" required></b-input>
                        </b-field>
                        <b-field label="Wachtwoord">
                            <b-input v-model="password" @keyup.enter="doLogin" type="password" placeholder="Wachtwoord" password-reveal required></b-input>
                        </b-field>
                        <div class="field">
                            <div class="control">
                                <button @click.prevent="doLogin" class="button is-link">Inloggen</button>
                            </div>
                        </div>

                        <div v-if="error.active" class="notification is-danger">
                            {{ error.message }}
                        </div>

                        <div class="field">
                            <div class="content">
                                <p class="has-text-grey-light">Wachtwoord vergeten?</p>
                            </div>
                        </div>
                    </div>
                    <!-- /Login input -->
                    
                </div>
            </div>            
            
        </div>
    </div>
</template>

<script>
import { firebase, db } from '@/services/firebase'

export default {
    data() {
        return {
            email: '',
            password: '',
            error: {
                active: false,
                message: ''
            },
            isLoading: false,
            isFullPage: true
        }
    },
    methods: {
        doLogin() {
            this.isLoading = true
            // Login in to Firebase
            firebase.auth().signInWithEmailAndPassword(this.email, this.password)
                .then(() => {

                    // Get userdata from Firebase database
                    db.collection("users").doc(firebase.auth().currentUser.uid).get()
                        .then((doc) => {

                            // If user records exists, proces it
                            if(doc.exists) {
                                let firebaseData = doc.data()
                                firebase.auth().currentUser.details = firebaseData
                                firebase.auth().currentUser.credit = firebaseData.credit
                                firebase.auth().currentUser.name = firebaseData.name
                                firebase.auth().currentUser.role = firebaseData.role
                            } else {
                                // TODO: create default user and write it to Firebase
                                console.log('User does not exist')
                            }
                        
                            // On succesful login and getting data, write it to store
                            this.$store.dispatch('loginUser', firebase.auth().currentUser)
                            this.isLoading = false
                        })
                        .catch(() => {
                            // If user is not found in DB log error
                            // TODO: Make new record in DB with 0 credit
                            this.$store.dispatch('loginUser', firebase.auth().currentUser)
                            this.isLoading = false
                        })

                    // Redirect user
                    this.$router.replace({ name: 'dashboard' })

                    // Open notifictation after succesful login
                    this.$toast.open({
                        message: 'Je bent ingelogd!',
                        type: 'is-success',
                        duration: 1000
                    })
                })
                .catch((error) => {                    
                    this.isLoading = false
                    this.error.active =  true
                    this.error.message = error.message
                })
        }
    }
}
</script>

<style lang="scss" scoped>

</style>

