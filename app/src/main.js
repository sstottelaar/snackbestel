import Vue from 'vue'
import App from './App.vue'
import { firebase } from '@/services/firebase'
import router from '@/router/router'
import store from '@/store/store'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

// Use libraries
Vue.use(Buefy)

Vue.config.productionTip = false

let app;

firebase.auth().onAuthStateChanged(() => {

  if(!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})
