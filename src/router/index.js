import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Filter from '@/components/Filter'
import Userform from '@/components/Userform'
import Uploaddata from '@/components/Uploaddata'
import Browsedata from '@/components/Browsedata'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/filter',
      name: 'Filter',
      component: Filter
    },
    {
      path: '/userform',
      name: 'Userform',
      component: Userform
    },
    {
      path: '/uploaddata',
      name: 'Uploaddata',
      component: Uploaddata
    },
    {
      path: '/browsedata',
      name: 'Browsedata',
      component: Browsedata
    }
  ]
})
