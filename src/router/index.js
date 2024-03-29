import Vue from 'vue'
import Router from 'vue-router'
import HomeView from '@/components/HomeView'
import TriggersView from '@/components/TriggersView'
import MediasView from '@/components/MediasView'
import MediasListView from '@/components/MediasListView'
import MediasCreateView from '@/components/MediasCreateView'
import ChannelsView from '@/components/ChannelsView'
import ChannelsListView from '@/components/ChannelsListView'
import ChannelsCreateView from '@/components/ChannelsCreateView'
import ActionsView from '@/components/ActionsView'
import ActionsCreateView from '@/components/ActionsCreateView'
import ActionsUpdateView from '@/components/ActionsUpdateView'
import ActionsListView from '@/components/ActionsListView'
import SituationsView from '@/components/SituationsView'
import SituationsCreateView from '@/components/SituationsCreateView'
import SituationsDetailsView from '@/components/SituationsDetailsView'
import SituationsUpdateView from '@/components/SituationsUpdateView'
import SituationsListView from '@/components/SituationsListView'
import UsersListView from '@/components/UsersListView'
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
      path: '/medias',
      name: 'MediasView',
      component: MediasView,
      children: [{
        path: '',
        name: 'MediasListView',
        component: MediasListView
      }, {
        path: 'create',
        name: 'MediasCreateView',
        component: MediasCreateView
      }]
    },
    {
      path: '/channels',
      name: 'ChannelsView',
      component: ChannelsView,
      children: [{
        path: '',
        name: 'ChannelsListView',
        component: ChannelsListView
      }, {
        path: 'create',
        name: 'ChannelsCreateView',
        component: ChannelsCreateView
      }]
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
      }, {
        path: 'update/:key',
        name: 'ActionsUpdateView',
        component: ActionsUpdateView
      }]
    },
    {
      path: '/situations',
      name: 'SituationsView',
      component: SituationsView,
      children: [{
        path: '',
        name: 'SituationsListView',
        component: SituationsListView
      }, {
        path: 'create',
        name: 'SituationsCreateView',
        component: SituationsCreateView
      }, {
        path: 'details/:key',
        name: 'SituationsDetailsView',
        component: SituationsDetailsView
      }, {
        path: 'update/:key',
        name: 'SituationsUpdateView',
        component: SituationsUpdateView
      }]
    },
    {
      path: '/users',
      name: 'UsersListView',
      component: UsersListView
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
