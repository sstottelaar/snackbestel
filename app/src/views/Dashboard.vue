<template>
    <div class="section">
        <div class="container">

            <div class="columns">
                <div class="column is-8 is-offset-2">
                    <h1 class="title">Hi {{ getCurrentUser.name }}</h1>
                    <p>Je hebt nog {{ hoursLeft }} om je bestelling door te geven.</p>
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
        ...mapGetters(['getCurrentUser']),
        hoursLeft() {
            return moment(moment().hour(11).minute(0).second(0).millisecond(0).day("Friday").utc(1)).lang("nl").fromNow(true, "S")
        }
    }
}
</script>

<style lang="scss" scoped>
</style>