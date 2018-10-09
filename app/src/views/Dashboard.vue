<template>
    <div class="section">
        <div class="container">

            <div class="columns">
                <div class="column is-8 is-offset-2">
                    <h1 class="title">Hi {{ getCurrentUser.details.name }}</h1>
                    <p>Je hebt nog 1 uur om je bestelling door te geven.</p>
                </div>
            </div>            
            
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'dashboard',
    computed: {
        ...mapGetters(['getCurrentUser'])
    }
}
</script>

<style lang="scss" scoped>

</style>