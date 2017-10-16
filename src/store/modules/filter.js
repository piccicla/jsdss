/* store for the filter tool */
const state = {
  data: {
    allowedDataTypes: ['canopy', 'yield', 'soil', 'sensor'], // these are the allowed datatypes according to the database design
    dataType: '',  // canopy|soil|yield|sensor this will be used for the filtering tool
    uploadIds: [] // these are the ids for the filtered fetures
  }
}

const getters = { // put here functions for common calculations to avoid duplicate code in the components
  // myfunc: state =>{}
  getDataType: state => {
    return state.data.dataType
  },
  getAllowedDataType: state => {
    return state.data.allowedDataTypes
  }
}
const mutations = { // update the store synchronously
  setDataType: (state, dtype) => {
    state.data.dataType = dtype
  },
  updateIds: (state, ids) => {
    state.data.uploadIds = ids
  }
}

const actions = { // wait for asynchronous action to finish then update the store
  // myfunc: context =>{ context.commit('mutation')}
}

export default {
  state,
  getters,
  mutations,
  actions
}
