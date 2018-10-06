<template>
    <div class="modal-card">
        <header class="modal-card-head">Voeg product toe</header>
        <section class="modal-card-body">
            <b-field label="Snack naam">
                <b-input placeholder="Snack naam" type="text" minlength="3" maxlength="20" v-model="tempSnack.description" name="snackName" :has-counter="false"></b-input>
            </b-field>
            <b-field label="Snack prijs">
                <b-input placeholder="Snack prijs" type="number" min="0" max="50" v-model="tempSnack.price"></b-input>
            </b-field>
        </section>
        <footer class="modal-card-foot">
            <button @click="$parent.close()" class="button is-fullwidth is-outlined">Annuleren</button>            
            <button @click="saveSnack(tempSnack)" class="button is-primary is-fullwidth">Opslaan</button>
        </footer>

    </div>
</template>

<script>
export default {
    name: 'ProductAddForm',
    data() {
        return {
            tempSnack: {
                description: '',
                price: '',
                id: '',
                docId: ''
            }
        }
    },
    methods: {
        saveSnack() {
            this.$emit('doSave', this.tempSnack)
            this.$parent.close()
        }
    }
}
</script>

<style lang="scss" scoped>

</style>


