/* store for webservices parameters  */
const state = {

  // /database/upload
  file: void 0,
  metatable: '',
  toolid: '',
  datetime: '',
  roworientation: '',

  swathwidth: '',
  ofset: '',
  rowspacing: '',
  comments: '',
  folderid: '',
  datasetid: '',
  fileformat: '',
  // /database/getfields
  fieldnames: [],
  // / database /todatabase/
  filename: '',
  lat: '',
  lon: '',
  value1: '',
  value2: '',
  value3: '',
  value4: '',
  value5: '',
  value6: '',
  row: '',
  response: 'data is not uploaded',
  // / database /getjson
  values: '',
  limit: '',
  geojson: {},
  // /database/getvmap/
  vmap: {},
  // / database /uploadids/
  ids: '', // todo: look at filter.js and decide
  exclude: '' // todo: look at filter.js and decide
}

const getters = { // put here functions for common calculations to avoid duplicate code in the components
  // /////// /database/upload
  getFile: state => {
    return state.file
  },
  getMetatable: state => {
    return state.metatable
  },
  getToolid: state => {
    return state.toolid
  },
  getDatetime: state => {
    return state.datetime
  },
  getRoworientation: state => {
    return state.roworientation
  },

  getSwathwidth: state => {
    return state.swathwidth
  },
  getOfset: state => {
    return state.ofset
  },
  getRowspacing: state => {
    return state.rowspacing
  },
  getComments: state => {
    return state.comments
  },
  getFolderid: state => {
    return state.folderid
  },
  getDatasetid: state => {
    return state.datasetid
  },
  getFileformat: state => {
    return state.fileformat
  },
  // ////// /database/getfields
  getFieldnames: state => {
    return state.fieldnames
  },
  // ///// / database /todatabase/
  getFilename: state => {
    return state.filename
  },
  getLat: state => {
    return state.lat
  },
  getLon: state => {
    return state.lon
  },
  getValue1: state => {
    return state.value1
  },
  getValue2: state => {
    return state.value2
  },
  getValue3: state => {
    return state.value3
  },
  getValue4: state => {
    return state.value4
  },
  getValue5: state => {
    return state.value5
  },
  getValue6: state => {
    return state.value6
  },
  getRow: state => {
    return state.row
  },
  getResponse: state => {
    return state.response
  },
  // ///// / database /getjson
  getValues: state => {
    return state.values
  },
  getLimit: state => {
    return state.limit
  },
  getGeojson: state => {
    return state.geojson
  },
  // ///// /database/getvmap/
  getVmap: state => {
    return state.vmap
  },
  // //// / database /uploadids/
  getIds: state => {
    return state.ids
  }, // todo: look at filter.js and decide
  getExclude: state => {
    return state.exclude
  } // todo: look at filter.js and decide
}

const mutations = { // update the store synchronously

  // /database/upload
  setFile: (state, text) => {
    state.file = text
  },
  resetFile: state => {
    state.file = void 0
  },
  setMetatable: (state, text) => {
    state.metatable = text
  },
  resetMetatable: state => {
    state.metatable = ''
  },
  setToolid: (state, text) => {
    state.toolid = text
  },
  resetToolid: state => {
    state.toolid = ''
  },
  setDatetime: (state, text) => {
    state.datetime = text
  },
  resetDatetime: state => {
    state.datetime = ''
  },
  setRoworientation: (state, text) => {
    state.roworientation = text
  },
  resetRoworientation: state => {
    state.roworientation = ''
  },
  setSwathwidth: (state, text) => {
    state.swathwidth = text
  },
  resetSwathwidth: state => {
    state.swathwidth = ''
  },
  setOfset: (state, text) => {
    state.ofset = text
  },
  resetOfset: state => {
    state.ofset = ''
  },
  setRowspacing: (state, text) => {
    state.rowspacing = text
  },
  resetRowspacing: state => {
    state.rowspacing = ''
  },
  setComments: (state, text) => {
    state.comments = text
  },
  resetComments: state => {
    state.comments = ''
  },
  setFolderid: (state, text) => {
    state.folderid = text
  },
  resetFolderid: state => {
    state.folderid = ''
  },
  setDatasetid: (state, text) => {
    state.datasetid = text
  },
  resetDatasetid: state => {
    state.datasetid = ''
  },
  setFileformat: (state, text) => {
    state.fileformat = text
  },
  resetFileformat: state => {
    state.fileformat = ''
  },
  //  database/getfields
  setFieldnames: (state, text) => {
    state.fieldnames = text
  },
  resetFieldnames: state => {
    state.fieldnames = ''
  },
  // / database /todatabase/
  setFilename: (state, text) => {
    state.filename = text
  },
  resetFilename: state => {
    state.filename = ''
  },
  setLat: (state, text) => {
    state.lat = text
  },
  resetLat: state => {
    state.lat = ''
  },
  setLon: (state, text) => {
    state.lon = text
  },
  resetLon: state => {
    state.lon = ''
  },
  setValue1: (state, text) => {
    state.value1 = text
  },
  resetValue1: state => {
    state.value1 = ''
  },
  setValue2: (state, text) => {
    state.value2 = text
  },
  resetValue2: state => {
    state.value2 = ''
  },
  setValue3: (state, text) => {
    state.value3 = text
  },
  resetValue3: state => {
    state.value3 = ''
  },
  setValue4: (state, text) => {
    state.value4 = text
  },
  resetValue4: state => {
    state.value4 = ''
  },
  setValue5: (state, text) => {
    state.value5 = text
  },
  resetValue5: state => {
    state.value5 = ''
  },
  setValue6: (state, text) => {
    state.value6 = text
  },
  resetValue6: state => {
    state.value6 = ''
  },
  setRow: (state, text) => {
    state.row = text
  },
  resetRow: state => {
    state.row = ''
  },
  setResponse: (state, text) => {
    state.response = text
  },
  resetResponse: state => {
    state.response = ''
  },
  // / database /getjson
  setValues: (state, text) => {
    state.values = text
  },
  resetValues: state => {
    state.values = ''
  },
  setLimit: (state, text) => {
    state.limit = text
  },
  resetLimit: state => {
    state.limit = ''
  },
  setGeojson: (state, text) => {
    state.geojson = text
  },
  resetGeojson: state => {
    state.geojson = ''
  },
  // /database/getvmap/
  setVmap: (state, text) => {
    state.vmap = text
  },
  resetVmap: state => {
    state.vmap = ''
  },
  // / database /uploadids/
  setIds: (state, text) => {
    state.ids = text
  }, // todo: look at filter.js and decide
  resetIds: state => {
    state.ids = ''
  },
  setExclude: (state, text) => {
    state.exclude = text
  }, // todo: look at filter.js and decide
  resetExclude: state => {
    state.exclude = ''
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
