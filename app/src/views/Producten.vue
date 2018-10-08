<template>
    <div class="section">
        <div class="container">

            <div class="columns">
                <div class="column is-12">
                    <div class="content">
                        <h1>Producten</h1>
                        <p>Beheer hier de producten.</p>
                    </div>
                    <button class="button is-primary" @click="addSnack()">Voeg product toe</button>
                </div>
                
            </div>

            <div class="columns is-multiline">
                <b-loading :is-full-page="isFullPage" :active.sync="isLoading" :can-cancel="true"></b-loading>
                <div v-for="(snack, key) in snacks" :key="key" class="column is-3">
                   <div class="card">
                        <div class="card-content">
                            <div class="content">
                                <h2 class="is-size-6">{{ snack.description }}</h2>
                                <p>Prijs: {{ snack.price | toCurrency }}</p>
                            </div>
                        </div>
                        <div class="card-footer">
                            <a @click="editSnack(snack)" class="card-footer-item">Wijzigen</a>
                            <a @click="deleteSnack(snack)" class="card-footer-item">Verwijderen</a>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    </div>
</template>

<script>
import { db } from '@/services/firebase'
import filters from '@/services/filters'
import randomId from 'random-id'
import ProductEditForm from '@/components/ProductEditForm'
import ProductAddForm from '@/components/ProductAddForm'

export default {
    name: 'producten',
    components: {
        ProductEditForm
    },
    data() {
        return {
            snacks: [],            
            isLoading: false,
            isFullPage: false
        }
    },
    methods: {
        initData() {
            this.isLoading = true

            // Get products from Firestore
            db.collection("snacks")
                .onSnapshot((querySnapshot) => {
                    var tempSnacks = []
                    querySnapshot.forEach((doc) => {
                        let tempSnack = doc.data()
                        tempSnack.docId = doc.ref.id
                        tempSnacks.push(tempSnack)
                    })
                    // Push products to data
                    this.snacks = tempSnacks
                    this.isLoading = false
                })
        },
        editSnack(snack) {
            // Launch modal and pass data back to save method
            let self = this
            this.$modal.open({
                parent: this,
                component: ProductEditForm,
                hasModalCard: true,
                props: snack,
                events: {
                    doSave(snack) {
                        self.saveSnack(snack)
                    }
                }
            })
        },
        deleteSnack(snack) {
            this.$dialog.confirm({
                message: 'Weet je zeker dat je ' + snack.description + ' wilt verwijderen?',
                onConfirm: () => {
                    db.collection("snacks").doc(snack.docId).delete()
                        .then(() => {
                            this.$toast.open({
                                message: 'Product is verwijderd',
                                type: 'is-success',
                                duration: 1000
                            })
                        })
                        .catch(() => {
                             this.$toast.open({
                                message: 'Product is verwijderd',
                                type: 'is-success',
                                duration: 1000
                            })
                        })
                }
            })
        },
        saveSnack(snack) {
            // Check if product exists, else make new one
            if(snack.docId) {
                db.collection("snacks").doc(snack.docId).update({
                    description: snack.description,
                    price: snack.price
                })
            } else {
                db.collection("snacks").add({
                    description: snack.description,
                    price: snack.price,
                    id: randomId()
                })
            }
        },
        addSnack() {
            let self = this
            this.$modal.open({
                parent: this,
                component: ProductAddForm,
                hasModalCard: true,
                events: {
                    doSave(snack) {
                        self.saveSnack(snack)
                    }
                }
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
.mb-10 {
    margin-bottom: 10px;
}
</style>