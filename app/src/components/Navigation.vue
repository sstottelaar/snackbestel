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
            <router-link v-if="userLoggedIn" to="/dashboard" class="navbar-item">Dashboard</router-link>
            <router-link v-if="userLoggedIn" to="/bestellen" class="navbar-item">Bestellen</router-link>
            <router-link v-if="userLoggedIn" to="/account" class="navbar-item">Account</router-link>
            <span v-if="userLoggedIn" class="navbar-item">{{ getCurrentUser.email }}</span>
            <a @click="doSignOut" v-if="userLoggedIn" class="navbar-item">Uitloggen</a>
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

