import Vue from 'vue'
import Vuex from 'vuex'
import { firebase } from '@/services/firebase'
import VuexPersist from 'vuex-persist'

Vue.use(Vuex)

let vuexLocalStorage = new VuexPersist({
    key: 'vuex',
    storage: window.localStorage
})

let store = new Vuex.Store({
    state: {
        user: {
            id: '',
            name: '',
            email: '',
            credit: '',
            loggedIn: false,
            role: ''
        }
    },
    actions: {
        loginUser({commit}, payload) {
            commit('registerUser', payload)
        },
        signOutUser: ({commit}) => {
            firebase.auth().signOut()
                .then(() => {
                    commit('clearUser')
                })
        },
        updateCredit({commit}, payload) {
            commit('setCredit', payload)
        }
    },
    mutations: {
        registerUser(state, payload) {
            state.user.details = payload.details
            state.user.email = payload.email
            state.user.name = payload.name
            state.user.id = payload.uid
            state.user.credit = payload.credit
            state.user.loggedIn = true
            state.user.role = payload.role
        },
        clearUser: (state) => {
            // Clear all fields
            state.user.loggedIn = false
        },
        setCredit: (state, payload) => {
            state.user.credit = payload
        }
    },
    getters: {
        getCurrentUser(state) {
            return state.user
        },
        userLoggedIn: (state) => {
            return state.user.loggedIn
        }
    },
    plugins: [vuexLocalStorage.plugin]
})

export default store