import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import VueResource from 'vue-resource'
import * as filters from './filters'

Vue.use(ElementUI)
Vue.use(VueResource)

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
