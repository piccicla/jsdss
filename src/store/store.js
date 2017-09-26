/* eslint-disable */
// central store, import and merge the substores
import Vue from 'vue'
import Vuex from 'vuex'
import filter from './modules/filter'
import footer from './modules/footer'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state : {
    wizard:  '', // this will tell if the application is showing a wizard, otherwise is empty
    allowedWizards: [ 'uploadfilter', 'interpolate']
  },
  getters: {
    getWizard: state => {
      return state.wizard
    },
    getAllowedWizard: state => {
      return state. allowedWizards
    }
  },
  mutations : { // update the store synchronously
    setWizard: (state, wtype) => {
      if (!( this.getters.getAllowedWizard.indexOf(wtype)===-1)){
        state.wizard = wtype
      }
      else{
        console.log('wizard ' + wtype + ' is not allowed')
      }
    },
  },
  modules: { // put here the substores
    filter,
    footer
  }
})

