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
import {store} from '../store/store'

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
          component: Uploaddata,
          beforeEnter: (to, from, next) => { // entering the first component will set the text/path and reset the step
            store.commit('resetStep')
            store.commit('setLeftText', ['exit', 'back to upload'])
            store.commit('setLeftPath', ['/', '/uploadfilter'])
            store.commit('setRightText', ['filter', 'exit'])
            store.commit('setRightPath', ['/uploadfilter/filter', '/'])
            next()
          }
        },
        {
          path: '/uploadfilter/filter',
          name: 'FilterUploaded',
          component: Filter,
          beforeEnter: (to, from, next) => { // updating the step
            store.commit('setStep', 1)
            next()
          }
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
          component: Gridding,
          beforeEnter: (to, from, next) => {
            store.commit('resetStep')
            store.commit('setLeftText', ['exit'])
            store.commit('setLeftPath', ['/'])
            store.commit('setRightText', ['exit'])
            store.commit('setRightPath', ['/'])
            next()
          }
        }
      ]
    }
  ],
  mode: 'hash'
})
