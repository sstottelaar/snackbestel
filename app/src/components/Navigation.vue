<template>
    <nav class="navbar is-white is-fixed-top" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
            <router-link class="navbar-item has-text-weight-bold" to="/dashboard">
                Snackbestel.nl
            </router-link>
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
.navbar {
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.06);

    .navbar-brand {
        font-size: 16px;
        font-family: "Product Sans", non-serif;
        color: rgba(0, 105, 255, 1);
    }
}
</style>

