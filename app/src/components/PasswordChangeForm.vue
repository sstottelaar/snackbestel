<template>
    <div class="modal-card">
        <header class="modal-card-head">Wijzig je wachtwoord</header>
        <section class="modal-card-body">
            <b-field label="Nieuw wachtwoord" :type="this.errors.inputError ? 'is-danger': ''" :message="this.errors.inputError ? this.errors.message : ''">
                <b-input placeholder="Nieuw wachtwoord" type="password" minlength="6" v-model="password" name="password"></b-input>
            </b-field>
            <b-field label="Herhaal nieuw wachtwoord" :type="this.errors.inputError ? 'is-danger': ''" :message="this.errors.inputError ? this.errors.message : ''">
                <b-input placeholder="Herhaal nieuw wachtwoord" type="password" minlength="6" v-model="passwordRepeat" name="passwordRepeat"></b-input>
            </b-field>
        </section>
        <footer class="modal-card-foot">            
            <button @click="$parent.close()" class="button is-fullwidth is-outlined">Annuleren</button>
            <button @click="savePassword()" class="button is-primary is-fullwidth">Opslaan</button>
        </footer>

    </div>
</template>

<script>
export default {
    name: 'PasswordChangeForm',
    data() {
        return {
            password: '',
            passwordRepeat: '',
            errors: {
                inputError: false,
                message: ''
            }
        }
    },
    methods: {
        savePassword() {
            if(!this.password.length == 0 && this.password == this.passwordRepeat) {
                let payload = {
                    password: this.password,
                    passwordRepeat: this.passwordRepeat
                }

                this.$emit('changePassword', payload)
                this.$parent.close()
            } else if (this.password.length == 0 || this.password.length == 0) {
                this.errors.inputError = true
                this.errors.message = 'Geen wachtwoord opgegeven'
            } else {
                this.errors.inputError = true
                this.errors.message = 'Wachtwoorden komen niet overeen'
            }        
        }
    }
}
</script>

<style lang="scss" scoped>

</style>


