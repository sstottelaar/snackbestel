import Vue from 'vue'
import VueRouter from 'vue-router'
import { firebase } from '@/services/firebase'

// Load components
import LoginComponent from '@/components/Login'
import DashboardComponent from '@/components/Dashboard'
import BestellenComponent from '@/components/Bestellen'

Vue.use(VueRouter)

let routes = [
    {
        path: '*',
        redirect: 'login'
    },
    {
        path: '/login',
        name: 'login',
        component: LoginComponent
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: DashboardComponent,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/bestellen',
        name: 'bestellen',
        component: BestellenComponent,
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

// router.beforeEach((to, from, next) => {
//     let currentUser = firebase.auth().currentUser
//     let requiresAuth = to.matched.some(record => record.meta.requiresAuth)

//     if(requiresAuth && !currentUser) next ('login')
//     else if (!requiresAuth && currentUser) next ('dashboard')
//     else next()
// })

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