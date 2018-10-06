<template>
    <nav class="navbar is-light is-fixed-top" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
            <a class="navbar-item has-text-weight-bold" href="/dashboard">
                Snackbestel.nl
            </a>
            <a @click="menuActive = !menuActive" role="button" class="navbar-burger" v-bind:class="{ 'is-active':  menuActive }" aria-label="menu" aria-expanded="false">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </a>
        </div>
        <div class="navbar-menu navbar-end" v-bind:class="{ 'is-active':  menuActive }">
            <router-link v-if="!userLoggedIn" to="/login" class="navbar-item">Login</router-link>
            <router-link v-if="userLoggedIn" to="/bestellen" class="navbar-item">Bestellen</router-link>                     

            <div v-if="userLoggedIn" class="navbar-item has-dropdown is-hoverable">
                <router-link v-if="userLoggedIn" to="/account" class="navbar-link">Account</router-link>

                <div class="navbar-dropdown is-right">
                    <span class="navbar-item has-text-grey-light">{{ getCurrentUser.email }}</span>

                    <hr class="navbar-divider">
                       
                    <router-link v-if="userLoggedIn" to="/beheer" class="navbar-item">Beheer</router-link>
                    <router-link v-if="userLoggedIn" to="/producten" class="navbar-item">Producten</router-link>
                    <a @click="doSignOut" v-if="userLoggedIn" class="navbar-item">Uitloggen</a>
                </div>
            </div>
           
        </div>
    </nav>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    data() {
        return {
            menuActive: false
        }
    },
    computed: {
        ...mapGetters(['getCurrentUser', 'userLoggedIn'])
    },
    methods: {
        ...mapActions(['signOutUser']),
        doSignOut() {
            this.signOutUser()
                .then(() => {
                    this.$router.replace({ name: 'login' })
                })            
        }
    },
    watch: {
        '$route' () {
            this.menuActive = false
        }
    }
}
</script>

<style lang="scss" scoped>
.navbar-menu{
    padding: 0;
}

.navbar-item{
    padding: .75rem 1.25rem;
}
</style>

