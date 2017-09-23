import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Filter from '@/components/Filter'
import Userform from '@/components/Userform'
import Uploaddata from '@/components/Uploaddata'
import Browsedata from '@/components/Browsedata'
import UploadFilter from '@/components/wizards/Uploadfilter'
import Interpolate from '@/components/wizards/Interpolate'
import Footer from '@/components/Footer'
import Gridding from '@/components/Gridding'
import Mapping from '@/components/Mapping'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '*',
      component: Home
    },
    {
      path: '/mapping',
      component: Mapping
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
    },
    {
      path: '/uploadfilter',
      components: {
        default: UploadFilter,
        'footer': Footer
      },
      children: [
        {
          path: '/',
          component: Uploaddata
        },
        {
          path: '/uploadfilter/filter',
          name: 'FilterUploaded',
          component: Filter
        }
      ]
    },
    {
      path: '/interpolate',
      components: {
        default: Interpolate,
        'footer': Footer
      },
      children: [
        {
          path: '/',
          component: Gridding
        }
      ]
    }
  ],
  mode: 'hash'
})
