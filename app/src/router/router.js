import Vue from 'vue'
import VueRouter from 'vue-router'
import { firebase } from '@/services/firebase'
import store from '@/store/store'

// Init current user
let currentUser = store.state.user

// Load components
import LoginView from '@/views/Login'
import DashboardView from '@/views/Dashboard'
import BestellenView from '@/views/Bestellen'
import AccountView from '@/views/Account'
import BestellingenView from '@/views/Bestellingen'
import BeheerView from '@/views/Beheer'
import ProductenView from '@/views/Producten'
import UsersView from '@/views/Users'

Vue.use(VueRouter)

let routes = [
    {
        path: '*',
        redirect: 'login'
    },
    {
        path: '/login',
        name: 'login',
        component: LoginView
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: DashboardView,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/bestellen',
        name: 'bestellen',
        component: BestellenView,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/account',
        name: 'account',
        component: AccountView,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/account/bestellingen',
        name: 'bestellingen',
        component: BestellingenView,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/beheer',
        name: 'beheer',
        component: BeheerView,
        meta: {
            requiresAuth: true,
            moderatorOnly: true
        }
    },
    {
        path: '/producten',
        name: 'producten',
        component: ProductenView,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/gebruikers',
        name: 'gebruikers',
        component: UsersView,
        meta: {
            requiresAuth: true,
            moderatorOnly: true
        }
    }
]

let router = new VueRouter({
    routes,
    linkActiveClass: 'is-active',
    mode: 'history'
})

router.beforeEach((to, from, next) => {

    // Check if user is logged in and is a moderator
    if (to.matched.some(record => record.meta.moderatorOnly)) {
        // Check if user is logged in
        let user = firebase.auth().currentUser
        let userRole = currentUser.role
        
        if(user && userRole == "moderator"){
            next()
        } else {
            next('login')
        }

    } else if(to.matched.some(record => record.meta.requiresAuth)) {
        // Check if user is logged in
        let user = firebase.auth().currentUser
        
        if(!user){
            next('login')
        } else {
            next()
        }
    } else {
        next()
    }
})

export default router