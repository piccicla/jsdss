// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import {store} from './store/store'
import VueResource from 'vue-resource'
//
//
// here importing the wideapp javascript, each component will import other javascript
import './assets/css/jsdss.css'
//
//
Vue.config.productionTip = false
Vue.use(VueResource)

Vue.http.options.root = 'http://localhost:8100/'

/* eslint-disable no-new */
const vm = new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

window.vm = vm
