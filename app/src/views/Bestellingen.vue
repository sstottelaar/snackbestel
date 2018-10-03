<template>
    <div class="section">
        <div class="container">

            <div class="columns">
                <div class="column is-8 is-offset-2">

                    <div class="content">
                        <h1>Bestellingen</h1>
                        <p>Bekijk al je bestellingen</p>
                    </div>

                    <b-table :data="orders" :loading="loading" default-sort-direction="desc">
                        <template slot-scope="props">
                            <b-table-column field="orderDate" label="Besteldatum" sortable>
                                {{ props.row.orderDate ? new Date(props.row.orderDate).toLocaleDateString() : '' }}
                            </b-table-column>
                            <b-table-column field="order" label="Bestelling" sortable>
                                {{ props.row.order[0].description }}
                            </b-table-column>
                        </template>
                        <template slot="footer">
                            <div class="has-text-right">
                                Totaal: {{ this.orders.length }}
                            </div>
                        </template>
                    </b-table>

                </div>
            </div>            
            
        </div>
    </div>
</template>

<script>
import { firebase, db } from '@/services/firebase'

export default {
    name: 'bestellingen',
    data() {
        return {
            orders: [],
            loading: false
        }
    },
    methods: {
        initData() {
            this.loading = true

            let user = firebase.auth().currentUser.uid

            // Get data from Firebase
            db.collection("users").doc(user).collection("orders")
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        this.orders.push(doc.data())
                    })
                    this.loading = false
                })
                .catch((err) => {
                    console.error(err)
                    this.loading = false
                })
        }
    },
    created() {
        this.initData()
    }
}
</script>

<style lang="scss" scoped>

</style>