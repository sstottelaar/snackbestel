<template>
    <div class="section">
        <div class="container">

            <div class="columns">
                <div class="column is-8 is-offset-2">
                    <h1 class="title">Hi {{ getCurrentUser.name }}</h1>
                </div>
            </div>            
            
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import moment from 'moment'

export default {
    name: 'dashboard',
    computed: {
        ...mapGetters(['getCurrentUser'])
    }
}
</script>

<style lang="scss" scoped>
</style>