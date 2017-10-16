/* store for wizard tools, keep track of the passages */
const state = {
  step: 0,
  rightText: [],
  rightPath: [],
  leftText: [],
  leftPath: []
}

const getters = { // put here functions for common calculations to avoid duplicate code in the components
                  // myfunc: state =>{}
  /* getDataType: state => {
    return state.data.dataType
  },
  getAllowedDataType: state => {
    return state.data.allowedDataTypes
  } */
  getStep: state => {
    return state.step
  },
  getRightText: state => {
    return state.rightText
  },
  getRightPath: state => {
    return state.rightPath
  },
  getLeftText: state => {
    return state.leftText
  },
  getLeftPath: state => {
    return state.leftPath
  }
}

const mutations = { // update the store synchronously
  updateStep: (state, step) => {
    state.step += 1
  },
  resetStep: state => {
    state.step = 0
  },
  setStep: (state, step) => {
    state.step = step
  },
  setRightText: (state, text) => {
    state.rightText = text
  },
  setRightPath: (state, text) => {
    state.rightPath = text
  },
  setLeftText: (state, text) => {
    state.leftText = text
  },
  setLeftPath: (state, text) => {
    state.leftPath = text
  }
}

/* const actions = { // wait for asynchronous action to finish then update the store
                  // myfunc: context =>{ context.commit('mutation')}
} */

export default {
  state,
  getters,
  mutations // ,
  // actions
}
