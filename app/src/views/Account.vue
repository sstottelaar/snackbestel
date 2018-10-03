<template>
    <div class="section">
        <div class="container">

            <div class="columns">
                <div class="column is-8 is-offset-2">

                    <div class="content">
                        <h1>Account</h1>
                        <p>Hier kun je je eigen account aanpassen.</p>
                    </div>

                    <hr>

                    <h2 class="title is-size-4">Saldo</h2>
                    <p>Je huidige saldo is: {{ user.credit | toCurrency }}</p>
                    <button class="button is-fullwidth m-top">Saldo opwaarderen</button>

                    <hr>

                    <h2 class="title is-size-4">Mijn bestellingen</h2>
                    <!-- <button class="button is-fullwidth m-top">Bekijk bestellingen</button> -->
                    <router-link to="/account/bestellingen" class="button is-fullwidth m-top">Bekijk bestellingen</router-link>

                    <hr>

                    <h2 class="title is-size-4">Wachtwoord wijzigen</h2>
                    <p>Verander hier eenvoudig je wachtwoord.</p>
                    <div class="form-container">
                        <div class="field m-top">
                            <div class="control">
                                <input v-model="password" v-bind:class="{ 'is-success': checkPassword }" type="password" name="password" id="password" class="input" placeholder="Nieuw wachtwoord" autocapitalize="off" required>
                                <input v-model="passwordCheck" v-bind:class="{ 'is-success': checkPassword }" type="password" name="passwordCheck" id="passwordCheck" class="input m-top" placeholder="Herhaal wachtwoord" autocapitalize="off" required>
                            </div>
                        </div>
                        <div class="field">
                            <div class="control">
                                <button @click.prevent="changePassword" v-bind:class="{ 'is-loading': loading }" class="button is-fullwidth">Wijzig wachtwoord</button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>            
            
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import filters from '@/services/filters'
import { firebase } from '@/services/firebase'

export default {
    name: 'account',
    data() {
        return {
            user: [],
            password: '',
            passwordCheck: '',
            loading: false
        }
    },
    methods: {
        initData() {
            this.user = this.getCurrentUser
        },
        changePassword() {
            if(this.checkPassword) {
                this.loading = true
                firebase.auth().currentUser.updatePassword(this.password)
                .then(() => {
                    // Reset input fields
                    this.password = ''
                    this.passwordCheck = ''

                    this.$toast.open({
                        message: 'Je wachtwoord is succesvol gewijzigd',
                        type: 'is-success',
                        duration: 2000
                    })

                    this.loading = false
                })
                .catch((err) => {
                    console.log(err)
                    this.$toast.open({
                        message: err.message,
                        type: 'is-warning',
                        duration: 2000
                    })
                })
            } else {
                this.$toast.open({
                    message: "Wachtwoorden komen niet overeen",
                    type: 'is-warning',
                    duration: 2000
                })
            }
        }
    },
    computed: {
        ...mapGetters(['getCurrentUser']),
        checkPassword() {
            if(this.password.length >= 6 && this.password === this.passwordCheck ) {
                return true
            } else {
                return false
            }
        }
    },
    created() {
        this.initData()
    },
    filters
}
</script>

<style lang="scss" scoped>
.m-top{
    margin-top: 10px;
}
</style>