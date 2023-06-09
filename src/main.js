import Vue from 'vue'

import App from './App.vue'

import ElementUI from 'element-ui'

import VueRouter from 'vue-router'

import router from './router'

import store from './store/index.js'

import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueRouter)

new Vue({
  el: '#app',
  render: h => h(App),
  router: router,
  store,
  beforeCreate() {
    Vue.prototype.$bus = this
  }
})
