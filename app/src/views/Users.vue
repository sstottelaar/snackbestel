<template>
    <div class="section">
        <div class="container">            

            <div class="columns">                
                <b-loading :is-full-page="isFullPage" :active.sync="isLoading" :can-cancel="true"></b-loading>

                <div class="column is-12">
                    <h1 class="title">Gebruikers</h1>
                    <p>Hier vind je het overzicht van alle gebruikers.</p>
                    <ul class="user-list">
                        <li v-for="(user, key) in users" :key="key">{{ user.email }}</li>
                    </ul>
                </div>
            </div>            
            
        </div>
    </div>
</template>

<script>
import { firebase } from '@/services/firebase'

export default {
    name: 'users',
    data() {
        return {
            isLoading: false,
            isFullPage: false,
            users: []
        }
    },
    created() {
        this.isLoading = true
        let getUsers = firebase.functions().httpsCallable('getUsers')
        getUsers().then((result) => {
            this.isLoading = false
            this.users = result.data
        })
        
    }
}
</script>

<style lang="scss" scoped>
.user-list {
    margin-top: 10px;
    
    li{
        border-bottom: 1px whitesmoke solid;
        padding: 10px 0;

        &:last-child {
            border-bottom: 0;
        }
    }
}
</style>