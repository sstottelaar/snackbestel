<template>
    <div class="section">
        <div class="container">

            <div class="columns is-multiline">

                <div class="column is-12">
                    <h1 class="title">Account</h1>
                    <p class="has-text-grey-light">Ingelogd als {{ getCurrentUser.email }}</p>
                </div>

                <div class="column is-4">
                    <div class="card">
                        <header class="card-header">
                            <span class="card-header-title">
                               Mijn Saldo
                            </span>
                        </header>
                        <div class="card-content">
                            <div class="columns is-vcentered">
                                <div class="column is-6 has-text-weight-bold">
                                    {{ getCurrentUser.credit | toCurrency }}
                                </div>
                                <div class="column is-6">
                                    Huidige saldo
                                </div>                                
                            </div>
                        </div>
                        <footer class="card-footer">
                            <a href="#" class="card-footer-item">Opwaarderen</a>
                        </footer>
                    </div>
                </div>

                <div class="column is-4">
                    <div class="card">
                        <header class="card-header">
                            <span class="card-header-title">
                                Mijn bestellingen
                            </span>
                        </header>
                        <div class="card-content">
                            <div class="columns is-vcentered">
                                <div class="column is-12">
                                    Bekijk hier je bestelhistorie
                                </div>                              
                            </div>
                        </div>
                        <footer class="card-footer">
                            <router-link to="/account/bestellingen" class="card-footer-item">Bekijk bestellingen</router-link>
                        </footer>
                    </div>
                </div>

                <div class="column is-4">
                    <div class="card">
                        <header class="card-header">
                            <span class="card-header-title">
                                Wijzig wachtwoord
                            </span>
                        </header>
                        <div class="card-content">
                            <div class="columns is-vcentered">
                                <div class="column is-12">
                                    Wijzig hier je wachtwoord
                                </div>                              
                            </div>
                        </div>
                        <footer class="card-footer">
                            <a @click="openChangePasswordModal" class="card-footer-item">Wijzig wachtwoord</a>
                        </footer>
                    </div>
                </div>

                <my-profile :user="this.getCurrentUser"></my-profile>  

            </div> 
            
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import filters from '@/services/filters'
import { firebase } from '@/services/firebase'
import PasswordChangeForm from '@/components/PasswordChangeForm'
import MyProfile from '@/components/MyProfile'

export default {
    name: 'account',
    components: {
        PasswordChangeForm,
        MyProfile
    },
    data() {
        return {
            user: [],
            loading: false
        }
    },
    methods: {
        initData() {
            this.user = this.getCurrentUser
        },
        savePassword(payload) {
            this.loading = true
            firebase.auth().currentUser.updatePassword(payload.password)
            .then(() => {
                this.$toast.open({
                    message: 'Je wachtwoord is succesvol gewijzigd',
                    type: 'is-success',
                    duration: 2000
                })

                this.loading = false
            })
            .catch((err) => {
                this.$toast.open({
                    message: err.message,
                    type: 'is-warning',
                    duration: 2000
                })
            })
        },
        openChangePasswordModal() {
            let self = this
            this.$modal.open({
                component: PasswordChangeForm,
                events: {
                    changePassword(payload) {
                        self.savePassword(payload)
                    }
                }
            })
        }
    },
    computed: {
        ...mapGetters(['getCurrentUser'])
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