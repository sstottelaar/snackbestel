<template>
    <div class="section">
        <div class="container">

            <div class="columns">
                <div class="column is-8 is-offset-2">
                    <b-loading :is-full-page="isFullPage" :active.sync="isLoading" :can-cancel="true"></b-loading>

                    <div class="content">
                        <h1>Beheer</h1>
                        <p>Beheer hier alle bestellingen voor deze week.</p>
                    </div>

                    <hr>

                    <ul class="snacklist">
                        <li v-for="(item, index) in orderedSnacks" :key="index">{{ item.description }} - {{ item.amount }}</li>
                    </ul>

                </div>
            </div>            
            
        </div>
    </div>
</template>

<script>
import { firebase, db } from '@/services/firebase'
import moment from 'moment'

export default {
    name: 'beheer',
    data() {
        return {
            orders: [],
            isLoading: false,
            isFullPage: false
        }
    },
    methods: {
        initData() {
            this.isLoading = true

            // Get monday of current week
            function getMonday(date) {
                let day = date.getDay() || 7;  
                if(day !== 1) 
                    date.setHours(-24 * (day - 1)); 
                return date;
            }

            let dt = getMonday(new Date()).getTime();

            // Get orders from Firestore
            db.collection("orders").where("orderDate", ">=", dt)
                .onSnapshot((querySnapshot) => {
                    var tempOrders = []
                    querySnapshot.forEach((doc) => {
                        doc.data().order.forEach((rule) => {
                            tempOrders.push(rule)
                        })
                    })
                    // Push orders to data
                    this.orders = tempOrders
            
                    // Disable loading
                    this.isLoading = false    
                })
            // this.isLoading = false  
        }
    },
    computed: {
        orderedSnacks() {

            let counter = []

            this.orders.forEach((order) => {

                var tempSnack = {}
                tempSnack.description = order.description

                // Retrieve all snacks from same description
                let temp = this.orders.filter((item) => {
                    return item.description == order.description
                })

                // Define total amount of snacks of each type
                tempSnack.amount = temp.length

                // Add snack to counter
                counter.push(tempSnack)
            })

            // Return array with only unique snacks
            return _.uniqBy(counter, "description")
        }
    },
    created() {
        this.initData()
    }
}
</script>

<style lang="scss" scoped>
.snacklist {
    li {
        padding: 10px 0;
        border-bottom: 2px solid whitesmoke;
        
        &:last-child{
            border-bottom: 0;
        }
    }
}
</style>