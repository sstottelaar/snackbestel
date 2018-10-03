<template>
    <div class="section">
        <div class="container">

            <div class="columns">
                <div class="column">
                    <div class="content">
                        <h1>Bestellen</h1>
                        <p>Je huidige saldo is {{ getCurrentUser.credit | toCurrency }}</p>       
                    </div>                    
                </div>
                <div class="column">
                    <div class="panel">
                        <p class="panel-heading">
                            Jouw bestelling
                        </p>
                        <div v-if="this.order.length == 0" class="panel-block">
                            <span>Je hebt nog geen snacks toegevoegd</span>
                        </div>
                        <a @click="removeFromOrder(item)" v-for="(item, key) in order" :key="key" class="panel-block" title="Verwijder item">
                            {{ item.description }} - {{ item.price | toCurrency}}
                        </a>
                        <div v-if="this.order.length !== 0" class="panel-block">                            
                            <span class="has-text-weight-bold">Totaal bedrag {{ totalOrderAmount | toCurrency }}</span>
                        </div>
                        <div v-if="this.order.length !== 0" class="panel-block">
                            <button @click="placeOrder" class="button is-link is-pulled-right">Bestel</button>
                        </div>
                    </div>            
                </div>
            </div>

            <hr>

            <div class="columns">
                <b-loading :is-full-page="isFullPage" :active.sync="isLoading" :can-cancel="true"></b-loading>
                <div v-for="(snack, key) in snacks" :key="key" class="column">
                    <div class="card">
                        <div class="card-image">
                            <figure class="image">
                                <img v-bind:src="snack.imgUrl" alt="">
                            </figure>
                        </div>
                        <div class="card-content">
                            <div class="content">
                                <h2 class="is-size-5">{{ snack.description }}</h2>
                                <p>Prijs: {{ snack.price | toCurrency }}</p>
                            </div>
                        </div>
                        <div class="card-footer">
                            <a @click="addToOrder(snack)" class="card-footer-item">Voeg toe aan bestelling</a>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    </div>
</template>

<script>
import { firebase, db } from '@/services/firebase'
import filters from '@/services/filters'
import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'bestellen',
    data () {
        return {
            snacks: [],
            order: [],
            isLoading: false,
            isFullPage: false
        }
    },
    methods: {
        ...mapActions(['updateCredit']),
        initData() {
            this.isLoading = true
            db.collection("snacks").get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    this.snacks.push(doc.data())
                })
                this.isLoading = false
            })  
        },
        addToOrder(payload) {
            // Check if there is enough credit
            if(this.getCurrentUser.credit > payload.price) {                
                // Add order to order object with unique id so we can delete it
                this.order.push({
                    description: payload.description,
                    price: payload.price,
                    uid: Math.random().toString(36).substring(2, 15)
                })

                // Show success notification
                this.$toast.open({
                    message: payload.description + ' toegevoegd',
                    type: 'is-success',
                    duration: 1000
                })
            } else {
                this.$toast.open({
                    message: 'Je hebt onvoldoende saldo',
                    type: 'is-warning',
                    duration: 2000
                })
            }
        },
        removeFromOrder(payload) {
            // Remove item from order object
            this.order = this.order.filter(snack => snack.uid != payload.uid)
        },
        placeOrder() {
            this.processOrder(this.order)
            .then(() => {
                // Update credit
                let totalSum = this.totalOrderAmount

                // Calculate new credit
                let newCredit = this.$store.state.user.credit - totalSum

                // Write new credit to state
                this.updateCredit(newCredit)

                // Throw success notification
                this.$toast.open({
                    message: 'Je bestelling is geplaatst',
                    type: 'is-success',
                    duration: 2000
                })
                
                // Reset order array
                this.order = []
            })
            .catch((err) => {
                // Throw error notification
                this.$toast.open({
                    message: 'Er is iets mis gegaan',
                    type: 'is-warning',
                    duration: 2000
                })  
            })            
        },
        processOrder(payload){
            // Create new batch ref
            let batch = db.batch()

            // Create refs
            let userRef = db.collection("users").doc(firebase.auth().currentUser.uid)
            let newOrderRef = userRef.collection("orders").doc()

            // Update credit
            let totalSum = 0

            // Calculate total price for order
            payload.forEach(item => totalSum += item.price)

            // Calculate new credit
            let newCredit = this.getCurrentUser.credit - totalSum

            // Write order to user
            batch.set(newOrderRef, {
                order: payload,
                orderDate: Date.now()
            })

            // Write credit to user
            batch.update(userRef, {
                credit: newCredit
            })

            // Return promise
            return batch.commit()
        }
    },
    computed: {
        ...mapGetters(['getCurrentUser']),
        totalOrderAmount() {
            let totalAmount = 0
            this.order.forEach(item => totalAmount += item.price)
            return totalAmount
        }
    },
    filters,
    created() { 
        this.initData()
    }
}
</script>

<style lang="scss" scoped>

</style>

