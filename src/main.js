import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import VueResource from 'vue-resource'
// import VueRouter from 'vue-router'
import * as filters from './filters'
import router from './router'

Vue.use(ElementUI)
Vue.use(VueResource)
// Vue.use(VueRouter)

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  router,
  components: { App }
})
