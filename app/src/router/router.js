import Vue from 'vue'
import VueRouter from 'vue-router'
import { firebase } from '@/services/firebase'

// Load components
import LoginView from '@/views/Login'
import DashboardView from '@/views/Dashboard'
import BestellenView from '@/views/Bestellen'
import AccountView from '@/views/Account'
import BestellingenView from '@/views/Bestellingen'

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
    }
]

let router = new VueRouter({
    routes,
    linkActiveClass: 'is-active',
    mode: 'history'
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
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