import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase'

Vue.config.productionTip = false

const config = {
  apiKey: '',
  authDomain: '',
  databaseURL: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: ''
}

firebase.initializeApp(config)

export const db = firebase.firestore()

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
