import Vue from 'vue'
import Router from 'vue-router'
import ItemList from '../components/ItemList.vue'
import Hello from '../components/Hello.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    { path: '/books', component: ItemList },
    { path: '/hello', component: Hello }
    // { path: '*', redirect: '/' }
  ]
})
