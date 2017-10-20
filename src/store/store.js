/* eslint-disable */
// central store, import and merge the substores
import Vue from 'vue'
import Vuex from 'vuex'
import filter from './modules/filter'
import footer from './modules/footer'
import parameters from './modules/parameters'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state : {
    wizard:  '', // this will tell if the application is showing a wizard, otherwise is empty
    allowedWizards: [ 'uploadfilter', 'interpolate'],
    bingkey: 'AhpitiRZ52gxx8vlBVKnuZoEA6B0OHYRjILKE11zB1823EU9l2SoJ4ZVGWFCYxRz', // the BingMap key for background maps
    debug: false // used in production to debug outputs
  },
  getters: {
    getWizard: state => {
      return state.wizard
    },
    getAllowedWizard: state => {
      return state.allowedWizards
    },
    getBingkey: state => {
      return state.bingkey
    },
    getDebug: state => {
      return state.debug
    }
  },
  mutations : { // update the store synchronously
    setWizard: (state, wtype) => {
      if (!( state.allowedWizards.indexOf(wtype)===-1)){
        state.wizard = wtype
      }
      else{
        console.log('wizard ' + wtype + ' is not allowed')
      }
    },
    resetWizard:(state, text) =>{
      state.wizard = ''
    },
    setDebug:(state, text) =>{
      state.debug = text
    }
  },
  modules: { // put here the substores
    filter,
    footer,
    parameters
  }
})

