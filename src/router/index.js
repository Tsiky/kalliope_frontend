import Vue from 'vue'
import Router from 'vue-router'
import HomeView from '@/components/HomeView'
import TriggersView from '@/components/TriggersView'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HomeView',
      component: HomeView
    },
    {
      path: '/triggers',
      name: 'TriggersView',
      component: TriggersView
    }
  ]
})
