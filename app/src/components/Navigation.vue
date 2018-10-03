<template>
    <nav class="navbar is-light" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
            <a class="navbar-item has-text-weight-bold" href="/dashboard">
                Snackbestel.nl
            </a>
            <!-- <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </a> -->
        </div>
        <div class="navbar-menu navbar-end is-active">            
            <router-link v-if="!userLoggedIn" to="/login" class="navbar-item">Login</router-link>
            <router-link v-if="userLoggedIn" to="/dashboard" class="navbar-item">Dashboard</router-link>
            <router-link v-if="userLoggedIn" to="/bestellen" class="navbar-item">Bestellen</router-link>
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
    }
}

</script>

<style lang="scss" scoped>

</style>

