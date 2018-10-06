<template>
    <div class="section">
        <div class="container">

            <div class="columns">
                <div class="column is-12">

                    <div class="content">
                        <h1>Bestellingen</h1>
                        <p>Bekijk al je bestellingen</p>
                    </div>

                    <b-table
                        :data="orders"
                        :loading="loading"
                        default-sort-direction="desc"
                        default-sort="orderDate"
                        detailed
                        detail-key="orderDate"
                        per-page="5">

                        <template slot-scope="props">
                            <b-table-column field="orderDate" width="250" label="Besteldatum" sortable>
                                {{ props.row.orderDate ? new Date(props.row.orderDate).toLocaleDateString() : '' }}
                            </b-table-column>
                            <b-table-column field="order" label="Bestelling" sortable>
                                {{ props.row.order[0].description }}
                            </b-table-column>
                            <b-table-column field="orderSum" label="Totaal" sortable>
                                {{ props.row.orderSum | toCurrency}}
                            </b-table-column>
                        </template>
                        <template slot="footer">
                            <div class="has-text-right">
                                Totaal bestellingen: {{ this.orders.length }}
                            </div>
                        </template>

                        <template slot="detail" slot-scope="props">
                            <p class="has-text-weight-bold">Bestelling van {{ props.row.orderDate ? new Date(props.row.orderDate).toLocaleDateString() : '' }}</p>
                            <ul class="order-detail-list">
                                <li v-for="(item, index) in props.row.order" :key="index">{{ item.description }}</li>
                            </ul>
                        </template>

                    </b-table>
                </div>
            </div>            
            
        </div>
    </div>
</template>

<script>
import { firebase, db } from '@/services/firebase'
import _ from 'lodash'
import filters from '@/services/filters'

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
            db.collection("orders").where("uid", "==", user)
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        let result = doc.data()
                        result.orderSum = _.sumBy(result.order, 'price')
                        this.orders.push(result)
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
    },
    filters
}
</script>

<style lang="scss" scoped>
.order-detail-list {
    border-top: 1px solid whitesmoke;
    margin-top: 15px;

    li{
        padding: 10px 0;
        border-bottom: 1px solid whitesmoke;
    }
}
</style>