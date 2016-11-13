import Vue from 'vue'
import Router from 'vue-router'
import ItemList from '../components/ItemList.vue'
import Detail from '../components/Detail.vue'
import User from '../components/User.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    { path: '/books', component: ItemList },
    { path: '/books/:id', component: Detail },
    { path: '/users/:id', component: User },
    { path: '/', redirect: '/books' }
  ]
})
