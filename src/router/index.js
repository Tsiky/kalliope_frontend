import Vue from 'vue'
import Router from 'vue-router'
import HomeView from '@/components/HomeView'
import TriggersView from '@/components/TriggersView'
import RulesView from '@/components/RulesView'
import ChannelsView from '@/components/ChannelsView'

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
    },
    {
      path: '/rules',
      name: 'RulesView',
      component: RulesView
    },
    {
      path: '/channels',
      name: 'ChannelsView',
      component: ChannelsView
    }
  ],
  linkExactActiveClass: 'active'
})
