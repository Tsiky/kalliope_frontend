import Vue from 'vue'
import Router from 'vue-router'
import HomeView from '@/components/HomeView'
import TriggersView from '@/components/TriggersView'
import RulesView from '@/components/RulesView'
import ChannelsView from '@/components/ChannelsView'
import ActionsView from '@/components/ActionsView'
import ActionsCreateView from '@/components/ActionsCreateView'
import ActionsListView from '@/components/ActionsListView'
import ErrorRouteView from '@/components/ErrorRouteView'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      redirect: '',
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
    },
    {
      path: '/actions',
      name: 'ActionsView',
      component: ActionsView,
      children: [{
        path: '',
        name: 'ActionsListView',
        component: ActionsListView
      }, {
        path: 'create',
        name: 'ActionsCreateView',
        component: ActionsCreateView
      }]
    },
    {
      path: '/404',
      name: 'ErrorRouteView',
      component: ErrorRouteView
    },
    {
      path: '*',
      redirect: '/404'
    }
  ],
  linkExactActiveClass: 'active',
  linkActiveClass: 'active'
})
