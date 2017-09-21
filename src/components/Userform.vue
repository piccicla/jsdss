<template>
  <div>

    <hr>
    <div class="row justify-content-center">
      <h1 class="ml-2 mt-5">SET UP USER AND VINEYARD</h1>
    </div>
    <hr>

    <div class="row">
      <h4 class="ml-3">User</h4>
    </div>
    <div class="row">
      <div class="form-group col-md-6">
        <label for="userName">Name</label>
        <input type="text" class="form-control" id="userName" placeholder="name">
      </div>
      <div class="form-group col-md-6">
        <label for="userSurname">Surname</label>
        <input type="text" class="form-control" id="userSurname" placeholder="surname">
      </div>
    </div>
    <div class="row">
      <button class="btn btn-primary ml-3 ">Update</button>
    </div>

    <hr>

    <div class="row">
      <h4 class="ml-3">Update vineyard</h4>
    </div>

    <div class="row">
      <div class="form-group col-md-4">
        <label for="vinName">Name</label>
        <select class="form-control" id="vinName"></select>
      </div>
      <div class="form-group col-md-5">
        <label for="vinComments">Comments</label>
        <textarea class="form-control" id="vinComments" rows="3" ></textarea>
      </div>

      <div class="col-md-3">
        <button class="btn btn-primary">Update</button>
      </div>
    </div>
    <br>

    <div class="row">
      <h4 class="ml-3">Add new vineyard</h4>
    </div>

    <div class="row">
      <div class="form-group col-md-4">
        <label for="newVinName">Name</label>
        <input type="text" class="form-control" id="newVinName">
      </div>
      <div class="form-group col-md-5">
        <label for="newVinComments">Comments</label>
        <textarea class="form-control" id="newVinComments" rows="3" ></textarea>
      </div>
      <div class="col-md-3">
        <button class="btn btn-primary">Add</button>
      </div>
    </div>

    <hr>

    <div class="row">
      <h4 class="ml-3">Update field for vineyard {{vineyard}}</h4>
    </div>

    <div class="row">
      <div class="form-group col-md-4">
        <label for="fieldName">Name</label>
        <select class="form-control" id="fieldName"></select>
      </div>
      <div class="form-group col-md-5">
        <label for="fieldComments">Comments</label>
        <textarea class="form-control" id="fieldComments" rows="3" ></textarea>
      </div>
      <div class="col-md-3">
        <button class="btn btn-primary">Update</button>
      </div>
    </div>

    <br>

    <div class="row">
      <h4 class="ml-3">Add new field for vineyard {{vineyard}}</h4>
    </div>

    <div class="row">
      <div class="form-group col-md-4">
        <label for="newFieldName">Name</label>
        <input type="text" class="form-control" id="newFieldName">
      </div>
      <div class="form-group col-md-5">
        <label for="newFieldComments">Comments</label>
        <textarea class="form-control" id="newFieldComments" rows="3" ></textarea>
      </div>
      <div class="col-md-3">
        <button class="btn btn-primary">Add</button>
      </div>
    </div>

    <hr>

    <div class="row">
      <h4 class="ml-3">Update boundary for field {{field}}</h4>
    </div>
    <div class="row">
      <div class="form-group col-md-4">
        <label for="boundName">Name</label>
        <select class="form-control" id="boundName"></select>
      </div>
      <div class="form-group col-md-5">
        <label for="boundComments">Comments</label>
        <textarea class="form-control" id="boundComments" rows="3" ></textarea>
      </div>
      <div class="col-md-3">
        <button class="btn btn-primary">Update</button>
      </div>
    </div>
    <br>

    <div class="row">
      <div class="form-group col-md-5">
        <h4 class="ml-2">Add new boundary for field {{field}}</h4>
        <label for="newBoundName">Name</label>
        <input type="text" class="form-control" id="newBoundName">
        <label for="newBoundComments">Comments</label>
        <textarea class="form-control" id="newBoundComments" rows="3" ></textarea>
        <button class="btn btn-primary col-12 my-1">Draw</button>
        <button class="btn btn-primary col-12 my-1">Delete</button>
        <button class="btn btn-primary col-12 my-1">Edit</button>
        <button class="btn btn-danger col-12 my-1">Add</button>
      </div>
      <div class="form-group col-md-7">
        <div id="boundaryMap" class="border border-dark"></div>
      </div>

    </div>


  </div>

</template>


<script>
  /* eslint-disable */
  export default {
    name: 'userform',
    data () {
      return {
        vineyard: '//vname//',
        field: '//fname//'
      }
    },
    mounted () {
      // ol view, shared between maps
      var view = new ol.View({
        center: [ -13626654, 4639902 ], // todo: automate center when downlading data
        zoom: 15
      })

      var bingLayer = new ol.layer.Tile({
        visible: true,
        preload: Infinity,
        source: new ol.source.BingMaps({
          key: 'AhpitiRZ52gxx8vlBVKnuZoEA6B0OHYRjILKE11zB1823EU9l2SoJ4ZVGWFCYxRz',
          imagerySet: 'AerialWithLabels',
          // use maxZoom 19 to see stretched tiles instead of the BingMaps
          // "no photos at this zoom level" tiles
          maxZoom: 19
        })
      })
      // map with points to be kept
      const mapKeep = new ol.Map({
        target: 'boundaryMap',
        renderer: 'webgl',
        layers: [
          /* new ol.layer.Tile({
                  source: new ol.source.OSM()
                }), */

          bingLayer

          // wms image, just to see if it works
          /* ,new ol.layer.Image({
                visible: false,
                extent: [-13884991, 2870341, -7455066, 6338219],
                source: new ol.source.ImageWMS({
                  url: 'https://ahocevar.com/geoserver/wms',
                  params: {'LAYERS': 'topp:states'},
                  ratio: 1,
                  serverType: 'geoserver',
                  crossOrigin: 'anonymous' //used this to avoid CORS error
                })
              }) */
        ],
        view: view
      })
    }
  }
</script>
