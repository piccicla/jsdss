<template>
  <div>



    <hr>
    <div class="row justify-content-center">
      <h1 class="ml-2 mt-5">FILTER DATA</h1>
    </div>
    <hr>

    <div class="row">

      <div class="col-lg-6 bg-light">

        <div class="row ml-0">

          <!-- clip: draw,edit, apply -->
          <button id="addClip">Draw boundary</button>
          <button id="editClip">Edit boundary</button>
          <button id="clip">Clip</button>
          <span class="separator"></span>

          <!-- remove selected points, clear selection -->
          <button id="addRemoved">Add to removed</button>
          <button id="clearTempRemoved">Clear</button>

        </div>

        <div class="row">
          <!-- map for keep points -->
          <div id="map-keep" class="map col-12"></div>
        </div>

        <div class="row">

          <div class="row ml-3 my-1">
            <!-- message for average value after box selection -->
            <span id="infoAverageKeep" class="redtext">Average value</span>
          </div>

          <div class="w-100"></div>
          <div class="row ml-3 my-1">
            <!-- update style, set automatic update -->
            <button id="applyColors">Update style</button>
            <input type="checkbox" id="automateColors"><span class="greentext">automate style</span>
          </div>
          <div class="w-100"></div>
          <div class="row ml-3 my-1">
            <!-- choose colors for style -->
            <!--<span class="redtext">Color1&nbsp;</span><input class="jscolor" onchange="updateLowColor(this.jscolor)" value="FFFFFF" size="6">-->
            <!--<span class="redtext">&nbsp;Color2&nbsp;</span><input class="jscolor" onchange="updateHighColor(this.jscolor)" value="FF0000" size="6"><br>-->
            <!--<span class="redtext">Color1&nbsp;</span><input id ="lowColor" class="jscolor" v-on:change="updateLowColor(this.jscolor)" value="FFFFFF" size="6">-->
            <!--<span class="redtext">&nbsp;Color2&nbsp;</span><input id="highColor" class="jscolor" v-on:change="updateHighColor(this.jscolor)" value="FF0000" size="6"><br>-->
            <span class="redtext">Color1&nbsp;</span><input id ="lowColor" class="jscolor" value="FFFFFF" size="6">
            <span class="redtext">&nbsp;Color2&nbsp;</span><input id="highColor" class="jscolor" value="FF0000" size="6"><br>

          </div>
          <div class="w-100"></div>
          <div class="row ml-3 my-1">
            <!-- update min/max, set automatic update, read min/max -->
            <button id="calcMinMax">Update min-max</button><input type="checkbox" id="automateMinMax" class="redtext"><span class="greentext">automate minmax</span><br>
            <div id="infoKeep" class="redtext ml-3">min:  max: </div>
          </div>
          <div class="w-100"></div>
          <div class="row ml-3 my-1">
            <!-- calculate histogram, set the number of bins -->
            <button id="histogram">Histogram</button><span id="infoBin" class="redtext">&nbsp;Num.bins </span><input type="text" id="nBins" value="10" size="6">
            <select ref="jsonfield" class="form-control" id="jsonfield" @change="onValueChange">
              <option v-for="value in fields" v-bind:value="value">
                {{ value }}
              </option>
            </select>
          </div>

          <div class="w-100"></div>
          <!-- select points to remove outside a range -->
          <div class="row ml-3 my-1">
            <button id="clipRange">Clip range</button><span class="redtext">&nbsp;Low threshold</span><input type="text" id="lowTh" value="0" size="6"><span class="redtext">&nbsp;High threshold</span><input type="text" id="highTh" value="1" size="6"><br>
          </div>

        </div>

      </div>

      <!-- map of removed points -->
      <div class="col-lg-6 bg-light mt-2 mt-lg-0">
        <div class="row ml-0">
          <!-- move selected points to the keep map -->
          <button id="keepSelection">Keep selected</button>
          <!-- move all the points back to the keep map -->
          <button id="keepAll" >Clear</button>
        </div>
        <div class="row">
          <!-- map for removed points -->
          <div id="map-remove" class="map  col-12"></div>
        </div>
        <div class="row ml-0">
          <!-- message for average value after box selection -->
          <div id="infoAverageRemove"  class="redtext">Average value</div>
        </div>
      </div>

    </div><!-- maps row-->

    <div class="row"><!-- histogram -->
      <div class="col-lg-6 bg-light" id="histogramChart" style="height:400px;"></div>
    </div><!--row-->

    <div class="row"><!-- submit data -->
      <!--<button  type="button" id="uploadSelection" class="col-lg-6 btn btn-danger">Update data</button>-->
      <button  type="button" id="uploadSelection" class="col-lg-6 btn btn-danger"  @click="uploadSelection">Update data</button>
    </div><!--row-->


  </div>
</template>

<script>
  /* eslint-disable */
  // openlayers npm - this is lacking webgl renderer
  /* import 'ol/ol.css'
  import Map from 'ol/map'
  import View from 'ol/view'
  import TileLayer from 'ol/layer/tile'
  import XYZSource from 'ol/source/xyz' */
  // importing the library takes forever
  // import '../assets/js/ol/ol.js'
  // import '../assets/css/ol.css'
  // ECharts
  const echarts = require('echarts/lib/echarts')
  require('echarts/lib/chart/bar')
  require('echarts/lib/component/tooltip')
  require('echarts/lib/component/title')

  import '../assets/js/histo.js' // empty imports just execute the bodies
  import '../assets/js/colors.js'
  import '../assets/js/jscolor.min.js'
  // import '../assets/js/main.js'


  export default {
    name: 'mappa',
    data () {
      return {
        fields: [],
        msg: 'Welcome to Your OpenLayers3 map',
        // mapKeep: void 0,
        // mapRemove: void 0
        //rgb1: [254, 255,255],
        //rgb2: [255, 0, 0]
        urls:{
          getjson : 'processing/database/getjson/executesync/',
        }
      }
    },
    beforeRouteLeave (to, from, next) { //set wizard to empty
      this.$store.commit('resetWizard', '')
      next()
    },
    methods:{

      onValueChange(e){
        // when selecting a field update the averages of selected features
        var average = document.getElementById('infoAverageKeep');
        var averageRemove = document.getElementById('infoAverageRemove')
        average.innerHTML = 'Average value ' +window.jsdss.histo.calculateaverage(window.jsdss.maps.selectedFeatures,window.jsdss.maps.jsonfield.value);
        averageRemove.innerHTML = 'Average value ' + window.jsdss.histo.calculateaverage(window.jsdss.maps.selectedFeaturesRight,window.jsdss.maps.jsonfield.value)
      },

      // set the starting colors for the visualization and convert to rgb
      // these methods don't work because pick, this.jscolor is not passed, therefore I added the event listener in the mountes()
      /*updateLowColor:function (pick) {
        this.rgb1=[Math.round(pick.rgb[0]),Math.round(pick.rgb[1]),Math.round(pick.rgb[2])]
        console.log("updatinglowcolor")
        console.log(this.rgb1)
        window.jsdss.colors.rgb1 = this.rgb1
      },
      updateHighColor:function (pick) {
        this.rgb2=[Math.round(pick.rgb[0]),Math.round(pick.rgb[1]),Math.round(pick.rgb[2])]
        console.log("updatinghighcolor")
        console.log(this.rgb1)
        window.jsdss.colors.rgb2 = this.rgb2
      }*/
      uploadSelection(){
        // const geojsource = this.$store.state.data.geojsource
        const geojsource = window.jsdss.data.geojsource
        //window.jsdss.data.uploadIds = []
        const uploadIds = []
        if (geojsource.getFeatures().length){
          // switch (window.jsdss.data.dataType) {
          if(!(this.$store.getters.getAllowedDataType.indexOf(this.$store.getters.getDataType)===-1)){ // check against the allowed datatypes
          switch (this.$store.getters.getDataType){ // use getter
            case "canopy":
              geojsource.getFeatures().forEach(function(f){uploadIds.push(f.get("id_cdata"))})
              break;
            case "yield":
              geojsource.getFeatures().forEach(function(f){uploadIds.push(f.get("id_ydata"))})
              break;
            case "soil":
              geojsource.getFeatures().forEach(function(f){uploadIds.push(f.get("id_sdata"))})
              break;
            case "sensor":
              geojsource.getFeatures().forEach(function(f){uploadIds.push(f.get("id_sdata"))})
              break;
          }
          // this.$store.state.data.uploadIds = uploadIds // set here to avoid performance problems
          this.$store.commit('updateIds',uploadIds) // commit mutation to the store
          console.log('features ready to be uploaded')
          }
          else {console.log(this.$store.getters.getDataType + ' is not an allowed datatype')}
        }
      },



      setLayout(){


        //////////////////////// get reference to dom elements
        var average = document.getElementById('infoAverageKeep');
        var automateColors = document.getElementById('automateColors');
        var averageRemove = document.getElementById('infoAverageRemove')
        var clearTempRem = document.getElementById('clearTempRemoved');
        var addRemoved = document.getElementById('addRemoved');
        var addClip = document.getElementById('addClip');
        var editClip = document.getElementById('editClip');
        var clip = document.getElementById('clip');
        var applyColors = document.getElementById('applyColors');
        var infoKeep = document.getElementById('infoKeep');
        var histogram = document.getElementById('histogram');
        var clipRange = document.getElementById('clipRange');
        var keepAll = document.getElementById('keepAll');
        var keepSelection = document.getElementById('keepSelection');
        var uploadSelection = document.getElementById('uploadSelection');
        /////////////////////
        var lowColor = document.getElementById('lowColor');
        var higColor = document.getElementById('highColor');

        //////////////////utility functions

        //function to calculate the average value of a field for a ol.Collection of features
        /*function calculateaverage(featureCollection,field, precision=2){
          var sum = 0;
          //featureCollection.array_.forEach(function(f){ sum+=f.getProperties()[field]});
          featureCollection.getArray().forEach(function(f){ sum+=f.getProperties()[field]});
          return (sum / featureCollection.getLength()).toFixed(precision);
        }*/
        ////////////////////////////////

        //ol view, shared between maps
        window.jsdss.maps.view = new ol.View({
          center: [0, 0 ], //todo: automate center when downlading data
          zoom: 1
        })


        var bingLayer = new ol.layer.Tile({
          visible: true,
          preload: Infinity,
          source: new ol.source.BingMaps({
            key:  this.$store.getters.getBingkey,
            imagerySet: 'AerialWithLabels',
            // use maxZoom 19 to see stretched tiles instead of the BingMaps
            // "no photos at this zoom level" tiles
            maxZoom: 19
          })
        })


        // map with points to be kept
        window.jsdss.maps.mapKeep = new ol.Map({
          target: 'map-keep',
          renderer:'webgl',
          layers: [
            /*
              new ol.layer.Tile({
                source: new ol.source.OSM()
              }),*/

            bingLayer

            // wms image, just to see if it works
            /*,new ol.layer.Image({
              visible: false,
              extent: [-13884991, 2870341, -7455066, 6338219],
              source: new ol.source.ImageWMS({
                url: 'https://ahocevar.com/geoserver/wms',
                params: {'LAYERS': 'topp:states'},
                ratio: 1,
                serverType: 'geoserver',
                crossOrigin: 'anonymous' //used this to avoid CORS error
              })
            })*/

          ],
          view:  window.jsdss.maps.view
        })


        /////////  original  dataset //////////////

        //source for geojson, this should be downloaded from the server
        //NOTE geojsource is not put in the Vuex store because that would add automatically create getter and setter
        // function for all the values, this will decrease the efficiency when selecting/deselecting features
        window.jsdss.data.geojsource =new ol.source.Vector({
          format: new ol.format.GeoJSON()
          // ,url: '/static/points.json' //todo: downlading data
        })

        // common style for points, final aplication may let the usert set the style
        var pointStyle = new ol.style.Style({
          image: new ol.style.Circle({
            radius: 4,
            fill: new ol.style.Fill({color: 'red'}),
            stroke: new ol.style.Stroke({color: 'white', width: 1})
          })
        })
        // point geojson layer from url
        var pointLayer = new ol.layer.Vector({
          visible: true,
          source: window.jsdss.data.geojsource,
          style: pointStyle
        });
        window.jsdss.maps.mapKeep.addLayer(pointLayer)


        ///// try to read custom geojson ////////////////////
        var routeJSON0 = {"features": [{"geometry": {"coordinates": [-122.4100972, 38.42791286], "type": "Point"}, "type": "Feature", "properties": {"value": 0.805, "id_cdata": 5}}, {"geometry": {"coordinates": [-122.42, 38.42791286], "type": "Point"}, "type": "Feature", "properties": {"value": 0.805, "id_cdata": 7}}],"type": "FeatureCollection"}

        var routeJSON = {"features": [{"geometry": { "type": "Polygon",
          "coordinates": [[ [-122.415, 38.42791286], [-122.4100972, 38.42791286], [-122.4100972, 38.43], [-122.415, 38.43], [-122.415, 38.42791286] ]]}, "type": "Feature", "properties": {"value": 0.805, "id_cdata": 7}}],"type": "FeatureCollection"}

        var format = new ol.format.GeoJSON({
          featureProjection:"EPSG:3857"   /// spcify the map projection ;is this necessary?
        })
        var vectorSource = new ol.source.Vector({
          features: format.readFeatures(routeJSON)
        })
        // point geojson layer from local source
        var drawLayer = new ol.layer.Vector({
          visible: true,
          source: vectorSource,
          /*
              style: new ol.style.Style({
                image: new ol.style.Circle({
                  radius: 4,
                  fill: new ol.style.Fill({color: 'red'}),
                  stroke: new ol.style.Stroke({color: 'white', width: 1})
                })
              })*/

        })
        //window.jsdss.maps.mapKeep.addLayer(drawLayer);
        //////////////////////////////////////////////

        /////////////////create an overlay to show the  info
        var overlay = new ol.Overlay({
          element: document.getElementById('popup-container'),
          positioning: 'bottom-center',
          offset: [0, -10]
        })
        window.jsdss.maps.mapKeep.addOverlay(overlay);
        //show info when clicking on the point   //todo: make it work
        /*var showInfo = window.jsdss.maps.mapKeep.on('click', function(e) {
          overlay.setPosition();
          var features = window.jsdss.maps.mapKeep.getFeaturesAtPixel(e.pixel);
          if (features) {
            //console.log(features)
            var coords = features[0].getGeometry().getCoordinates();
            var hdms = ol.coordinate.toStringHDMS(ol.proj.toLonLat(coords));
            //overlay.getElement().innerHTML = hdms;
            overlay.getElement().innerHTML = features[0].getProperties()['value']
            overlay.setPosition(coords);
          }
        });*/

        //delete average value when clicking on the map
        window.jsdss.maps.mapKeep.on('click', function(e) {
          average.innerHTML = 'Average value ';
        })


        /////// draw a new boundary for clipping
        const sourceClip = new ol.source.Vector();
        const layer = new ol.layer.Vector({
          source: sourceClip
        })
        window.jsdss.maps.mapKeep.addLayer(layer); //todo: the user should select a boundary from the database too


        //initialize interaction for drawing a polygon
        var drawPolygon = new ol.interaction.Draw({
          type: 'Polygon',
          source: sourceClip
        })

        //initialize interaction for editing a polygon
        var editPolygon = new ol.interaction.Modify({
          source: sourceClip
        })


        // select points to remove
        var select = new ol.interaction.Select({
          layers:[pointLayer]
          //,multi: true
        })
        window.jsdss.maps.mapKeep.addInteraction(select)

        var selectedFeatures = select.getFeatures()
        window.jsdss.maps.selectedFeatures = selectedFeatures
        //window.jsdss.maps.mapKeep.unByKey(showInfo);	//todo: let the single selection with info


        // set the starting colors for the visualization and convert to rgb
        /*var rgb1= [254, 255,255]; var rgb2= [255, 0, 0];


        function updateLowColor(pick) {}
          rgb1=[Math.round(pick.rgb[0]),Math.round(pick.rgb[1]),Math.round(pick.rgb[2])]
        }
        function updateHighColor(pick) {
          rgb2=[Math.round(pick.rgb[0]),Math.round(pick.rgb[1]),Math.round(pick.rgb[2])];
        }*/

        //todo: how to sTart dragbox on a mobile device?
        var dragBox = new ol.interaction.DragBox({
          condition: ol.events.condition.platformModifierKeyOnly
        })

        // a DragBox interaction used to select features to delete by drawing boxes
        window.jsdss.maps.mapKeep.addInteraction(dragBox)
        dragBox.on('boxend', function() {

          // features that intersect the box are added to the collection of
          // selected features
          var extent = dragBox.getGeometry().getExtent();
          if ("includes" in Array.prototype){	//check ecmascript6 'includes'

            window.jsdss.data.geojsource.forEachFeatureIntersectingExtent(extent, function(feature) {
              //if  (!(selectedFeatures.array_.includes(feature)))
              if  (!(selectedFeatures.getArray().includes(feature)))
              {selectedFeatures.push(feature)}
            })
          }
          else{ //noecmascript6

            window.jsdss.data.geojsource.forEachFeatureIntersectingExtent(extent, function(feature) {

              //check if the feature is already in the selection, if not add
              //let add = true
              //for (var i = 0, ii = selectedFeatures.array_.length; i < ii; ++i) {
              /*if (selectedFeatures.array_[i] === feature) {
                        add=false;
                      break;  //exit for EachF...
                    }*/
              //if(add){selectedFeatures.push(feature);}
              //}


              /*if  (!(selectedFeatures.array_.indexOf(feature) > -1)){
                        selectedFeatures.push(feature);
                    };*/

              //if  (!(selectedFeatures.array_.indexOf(feature) > -1))
              if  (!(selectedFeatures.getArray().indexOf(feature) > -1))
              {selectedFeatures.push(feature);}

            }) //end geojsource.forEachFeatureIntersectingExtent
          }

          // show average value for all the selected points
          average.innerHTML = 'Average value ' +window.jsdss.histo.calculateaverage(selectedFeatures,window.jsdss.maps.jsonfield.value);
        })


        /*dragBox.on('boxend', function() {
        //selectedFeatures.clear();
            let sum = 0;
            select.getFeatures().array_.forEach(function(f){ sum+=f.getProperties()['value']});
            average.innerHTML = 'Average value ' + (sum/select.getFeatures().getLength()).toFixed(2);
        });*/


        ///// this is the map with the points to be removed  ////////////
        window.jsdss.maps.mapRemove = new ol.Map({
          target: 'map-remove',
          renderer:'webgl',
          layers: [
            /*
            new ol.layer.Tile({
              source: new ol.source.OSM()
            }),*/
            bingLayer
          ],
          view:  window.jsdss.maps.view
        })

        // empty the average when clicking on the map
        window.jsdss.maps.mapRemove.on('click', function(){
          averageRemove.innerHTML = 'Average value '
        })

        // empty vector source for features to be moved back to the keep map
        var selectedVectorSource = new ol.source.Vector()
        var selectedVector = new ol.layer.Vector({
          source:selectedVectorSource,style: pointStyle
        })
        window.jsdss.maps.mapRemove.addLayer(selectedVector);


        // a normal select interaction to handle click
        var selectRight = new ol.interaction.Select({
          layers:[selectedVector]
          //,multi: true
        })
        window.jsdss.maps.mapRemove.addInteraction(selectRight)
        var selectedFeaturesRight = selectRight.getFeatures()
        window.jsdss.maps.selectedFeaturesRight = selectedFeaturesRight

        //window.jsdss.maps.mapKeep.unByKey(showInfo);	//todo: fix label for single selection

        // a DragBox interaction by drawing boxes; used to select features to be sent bak to the keep map
        //todo: how do I select on mobile devices
        var dragBoxRight = new ol.interaction.DragBox({
          condition: ol.events.condition.platformModifierKeyOnly
        })
        window.jsdss.maps.mapRemove.addInteraction(dragBoxRight)
        dragBoxRight.on('boxend', function() {
          // features that intersect the box are added to the collection of
          // selected features
          var extentRight = dragBoxRight.getGeometry().getExtent()
          if ("includes" in Array.prototype){	//check ecmascript6 'includes'
            selectedVectorSource.forEachFeatureIntersectingExtent(extentRight, function(feature) {
              //if  (!(selectedFeaturesRight.array_.includes(feature)))
              if  (!(selectedFeaturesRight.getArray().includes(feature)))
              {selectedFeaturesRight.push(feature)}
            })
          }
          else{

            selectedVectorSource.forEachFeatureIntersectingExtent(extentRight, function(feature) {

              //if  (!(selectedFeaturesRight.array_.indexOf(feature) > -1))
              if  (!(selectedFeaturesRight.getArray().indexOf(feature) > -1))
              {selectedFeaturesRight.push(feature)}
            })
          }

          // show average value for all the selected points
          //console.log(calculateaverage(selectedFeaturesRight,'value'));
          averageRemove.innerHTML = 'Average value ' + window.jsdss.histo.calculateaverage(selectedFeaturesRight,window.jsdss.maps.jsonfield.value)

        });


        ///////////////////////////////////BUTTONS KEEP MAP////////////////////////
        lowColor.addEventListener('change', function(){
          window.jsdss.colors.rgb1=[Math.round(this.jscolor.rgb[0]),Math.round(this.jscolor.rgb[1]),Math.round(this.jscolor.rgb[2])]
          //console.log(window.jsdss.colors.rgb1)
        })
        highColor.addEventListener('change', function(){
          window.jsdss.colors.rgb2=[Math.round(this.jscolor.rgb[0]),Math.round(this.jscolor.rgb[1]),Math.round(this.jscolor.rgb[2])]
          //console.log(window.jsdss.colors.rgb2)
        })

        //clear all the selected features on the keep map
        clearTempRem.addEventListener('click', function () {
          if(selectedFeatures){
            selectedFeatures.clear()
            average.innerHTML = 'Average value '
          }
        });

        //  add selected features to the remove map
        addRemoved.addEventListener('click', function () {
          if(selectedFeatures.getLength()){

            //move features to the other map
            //selectedVectorSource.addFeatures(selectedFeatures.array_);
            selectedVectorSource.addFeatures(selectedFeatures.getArray());
            //remove features from the layer

            selectedFeatures.forEach(function(feature){
              //console.log('remove feature');
              window.jsdss.data.geojsource.removeFeature(feature)
            });
            //clear this selection
            selectedFeatures.clear()

            //automatic style change?
            if(automateColors.checked){
              //console.log('changing style');
              window.jsdss.colors.styleGraduated(pointLayer, window.jsdss.maps.jsonfield.value, window.jsdss.colors.rgb1, window.jsdss.colors.rgb2 )
            }
          }
        })

        // draw a new boundary
        var clipping = false
        addClip.addEventListener('click', function () {
          clipping = !clipping
          if(clipping){
            if(editing){
              editing = !editing
              editClip.innerHTML = 'Edit boundary'
              window.jsdss.maps.mapKeep.removeInteraction(editPolygon)
            }
            addClip.innerHTML = 'Stop Clip'
            window.jsdss.maps.mapKeep.addInteraction(drawPolygon);

          }else{
            addClip.innerHTML = 'Add Clip'
            window.jsdss.maps.mapKeep.removeInteraction(drawPolygon);
          }
        })

        drawPolygon.on('drawstart', function(e) {
          sourceClip.clear()
        })


        // edit the boundary
        var editing = false
        editClip.addEventListener('click', function () {
          ////console.log("changing editing");
          if(sourceClip.getFeatures().length){ //if there is a polygon
            editing = !editing
            if(editing){
              if(clipping){
                //console.log("removing clipping interaction");
                clipping=!clipping
                addClip.innerHTML = 'Add Clip'
                window.jsdss.maps.mapKeep.removeInteraction(drawPolygon)
              }
              //console.log("I am editing");
              editClip.innerHTML = 'Stop edit'
              window.jsdss.maps.mapKeep.addInteraction(editPolygon);
            }else{
              //console.log("I am NOT editing");
              editClip.innerHTML = 'Edit boundary'
              window.jsdss.maps.mapKeep.removeInteraction(editPolygon)
            }
          }
        });
        //every time a new boundary is added delete the current
        drawPolygon.on('drawstart', function(e) {
          sourceClip.clear()
        });

        // clip the features with the current boundary
        // todo: this is inefficient, think about using turf.js
        clip.addEventListener('click', function () {

          if(sourceClip.getFeatures().length){

            /*
                var thePolygonExtent = sourceClip.getFeatures()[0].getGeometry().getExtent()
                var thefeaturesinside = window.jsdss.data.geojsource.getFeaturesInExtent(sourceClip.getFeatures()[0].getGeometry().getExtent());


                var tempFeatures = []

                window.jsdss.data.geojsource.getFeatures().forEach(function(feature){

                    if  (!(thefeaturesinside.includes(feature))){
                        tempFeatures.push(feature);
                    }

                });

                if (tempFeatures.length >0){
                    selectedVectorSource.addFeatures(tempFeatures);
                }

            }*/

            /*
              var thePolygonExtent = sourceClip.getFeatures()[0].getGeometry().getExtent()

              var tempFeatures = []
              var tempFeatures2 = []
              window.jsdss.data.geojsource.forEachFeatureIntersectingExtent(thePolygonExtent, function(f){
                      tempFeatures.push(f);
                  })

              window.jsdss.data.geojsource.getFeatures().forEach(function(feature){

                      if  (!(tempFeatures.includes(feature))){
                          tempFeatures2.push(feature);
                      }

                  });

                  if (tempFeatures2.length >0){
                      selectedVectorSource.addFeatures(tempFeatures2);
                  }
                  */
            var tempFeatures = []
            var polygonGeometry = sourceClip.getFeatures()[0].getGeometry()

            window.jsdss.data.geojsource.getFeatures().forEach(function(feature){

              var coords = feature.getGeometry().getCoordinates()

              if  (!(polygonGeometry.intersectsCoordinate(feature.getGeometry().getCoordinates()))){

                tempFeatures.push(feature)

              }

            });

            if (tempFeatures.length >0){
              //add features to new map
              selectedVectorSource.addFeatures(tempFeatures);
              //remove features from original map
              tempFeatures.forEach(function(feature){
                //console.log('remove feature');
                window.jsdss.data.geojsource.removeFeature(feature)
                //remove polygon
                sourceClip.clear();
              });
            }

            //automatic style change?
            if(automateColors.checked){
              //console.log('changing style');
              window.jsdss.colors.styleGraduated(pointLayer, window.jsdss.maps.jsonfield.value, window.jsdss.colors.rgb1, window.jsdss.colors.rgb2 )
            }

          } // end if(sourceClip.getFeatures().length)
        });   //end clip.addEventListener('click')

        // applyStyle
        // http://openlayersbook.github.io/ch06-styling-vector-layers/example-07.html
        // mastering openlayers3 pag 91
        // openlayers3 cookbook p.212
        applyColors.addEventListener('click', function () {
          //console.warn('applyStyle disabled due to performance');
          //console.log(window.jsdss.colors.rgb1)
          //console.log(window.jsdss.colors.rgb2)
          window.jsdss.colors.styleGraduated(pointLayer, window.jsdss.maps.jsonfield.value, window.jsdss.colors.rgb1, window.jsdss.colors.rgb2 )

        });


        var histo =[]
        histogram.addEventListener('click', function () {
          /*
            var linspace = function linspace(a,b,n) {
                if(typeof n === "undefined") n = Math.max(Math.round(b-a)+1,1);
                if(n<2) { return n===1?[a]:[]; }
                var i,ret = Array(n);
                n--;
                for(i=n;i>=0;i--) { ret[i] = (i*b+(n-i)*a)/n; }
                return ret;
            };

            var x = linspace(0, 100, 100),
                y = [],
                num;

            console.log(x);

            for(var i = 0; i < 2000; i ++){
                num = - Math.log(Math.random());
                y.push(num);
                console.log(num);
            }
            var histos  = window.jsdss.histo.histogram({
                data : y,
                bins : x
            });

            console.log(histos);
            */

          var nBins = parseInt(document.getElementById('nBins').value);
          histo  = window.jsdss.histo.histogram(pointLayer, window.jsdss.maps.jsonfield.value, nBins) //todo: user can select multiple values
          ///////////////////
          if (window.jsdss.debug.debug ){
            window.jsdss.debug.histo = histo
            console.log(histo);
          }
          ////////////////


          /////get the min and max values from the histogram, the loops are necessary to
          /////skip empty bins
          //var min = histo[0].x
          var min = void 0
          for (var i = 0; i< histo.length; i++) {
            if(histo[i].length){ //this is true when length>0
              //min = histo[i].x; this would return the edge of the bin
              min = Math.min.apply(Math, histo[i])
              break
            }
          }
          //var length = histo.length
          //var max = histo[length-1].x + histo[length-1].dx
          var max = void 0
          for (var i = histo.length-1; i>-1; i--) {
            if(histo[i].length){ //this is true when length>0
              //max = histo[i].x + histo[i].dx;//this would return the edge of the bin
              max = Math.max.apply(Math, histo[i])
              break
            }
          }

          infoKeep.innerHTML = 'min: ' + min + ' max: ' + max;
          document.getElementById('lowTh').value = min;
          document.getElementById('highTh').value = max;


          // update echarts histogram // todo: change with bokehjs when I get an answer for the bug
          // I need a list with all the central values and a list with all the height

          var centers = []
          var high = []
          if (histo.length>0){
            for (var i = 0; i< histo.length; i++) {
              centers.push(((histo[i].x+(histo[i].x+histo[i].dx))/2).toFixed(2)) // central value
              high.push(histo[i].length)
            }

            myChart.setOption({
              xAxis: {
                data: centers
              },
              series: [{
                // find series by name
                name: 'data',
                data: high
              }]
            });

            if (window.jsdss.debug.debug ) {
              window.jsdss.debug.centers = centers
              //console.log(centers);
              window.jsdss.debug.high = high
              //console.log(high);
            }

          }
        })


        //get threshold values

        clipRange.addEventListener('click', function () {

          var lowTh = parseFloat(document.getElementById('lowTh').value)

          var highTh = parseFloat(document.getElementById('highTh').value)

          if (lowTh<highTh){
            window.jsdss.histo.selectOutsideRange( pointLayer, window.jsdss.maps.jsonfield.value, selectedFeatures, lowTh,highTh)
          } else{
            console.log('check threshold values!')
          }
        });

        ///////////////////////////////////BUTTONS REMOVE MAP////////////////////////

        // move back all the features to the keep map

        keepAll.addEventListener('click', function () {
          if(selectedVectorSource.getFeatures().length)
          {

            //clear any selection
            selectedFeaturesRight.clear()
            //move features to the other map
            window.jsdss.data.geojsource.addFeatures(selectedVectorSource.getFeatures())
            //clear the layer
            selectedVectorSource.clear();
            averageRemove.innerHTML = 'Average value '

            //automatic style change?
            if(automateColors.checked){
              //console.log('changing style');
              window.jsdss.colors.styleGraduated(pointLayer, window.jsdss.maps.jsonfield.value, window.jsdss.colors.rgb1, window.jsdss.colors.rgb2 )
            }

          }
        });

        // move the selected features back to the original map

        keepSelection.addEventListener('click', function () {
          if(selectedFeaturesRight.getLength()){

            //move features to the other map
            //geojsource.addFeatures(selectedFeaturesRight.array_);
            window.jsdss.data.geojsource.addFeatures(selectedFeaturesRight.getArray());
            //remove features from the layer
            selectedFeaturesRight.forEach(function(feature){
              //console.log('remove feature');
              selectedVectorSource.removeFeature(feature);
            });
            //clear this selection
            selectedFeaturesRight.clear()
            averageRemove.innerHTML = 'Average value '

            //automatic style change?
            if(automateColors.checked){
              //console.log('changing style');
              window.jsdss.colors.styleGraduated(pointLayer, window.jsdss.maps.jsonfield.value, window.jsdss.colors.rgb1, window.jsdss.colors.rgb2 )
            }

          }
        });


        // add the selected features ID to a list, ready to be uploaded with a POST request
        uploadSelection.addEventListener('click', function () {
          // const geojsource = window.jsdss.data.geojsource
          /*window.jsdss.data.uploadIds = []
          if (geojsource.getFeatures().length){
            // switch (window.jsdss.data.dataType) {
            switch (window.vm.$store.state.data.dataType){
              case "canopy":
                geojsource.getFeatures().forEach(function(f){window.jsdss.data.uploadIds.push(f.get("id_cdata"))})
                break;
              case "yield":
                geojsource.getFeatures().forEach(function(f){window.jsdss.data.uploadIds.push(fget("id_ydata"))})
                break;
              case "soil":
                geojsource.getFeatures().forEach(function(f){window.jsdss.data.uploadIds.push(f.get("id_sdata"))})
                break;
              case "sensor":
                geojsource.getFeatures().forEach(function(f){window.jsdss.data.uploadIds.push(f.get("id_sdata"))})
                break;
            }

            console.log('features ready to be uploaded')
          }*/

          // convert to string ready for the post request
          // "111111111,"*20000 will be around 200kb
          // uploadIds = uploadIds.toString();
        })


        // INITIALIZE HISTOGRAM
        // based on prepared DOM, initialize echarts instance
        var myChart = echarts.init(document.getElementById('histogramChart'))
        // use configuration item and data specified to show chart
        var option = {
          title: {
            text: 'Histogram'
          },
          tooltip: {},
          legend: {
            data: ['Histogram']
          },
          xAxis: {
            data: []
          },
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: [{
            name: 'Histogram',
            type: 'bar',
            data: []
          }]

        }
        myChart.setOption(option)


        // download the points
        this.getJson(window.jsdss.data.geojsource, window.jsdss.maps.view)


      }, // ends etlayout()

      getJson(vectorSource, view) { // query the database and get geojson data
        this.$http.post(this.urls.getjson, {
            // metatable: this.$store.getters.getMetatable,
            // datasetid: this.$store.getters.getDatasetid
            metatable: 'canopy',
            datasetid: 64    // todo: set for production
          },
          { //headers: {'Content-Type': 'multipart/form-data'},
            emulateJSON: true //Send request body as application/x-www-form-urlencoded content type, yo avoid FormData
          }).then(
          response => {
            return response.json()
          },
          error => {
            this.logErr(error)
          }
        ).then(
          response => {
            if (response && response.success) {
              console.log(response.content[0].value)

              // get features from the geojson data
              var features = (new ol.format.GeoJSON()).readFeatures(response.content[0].value,{featureProjection:"EPSG:3857"});

              /*
              var vectorSource = new ol.source.Vector({
                //features: features,
                format: new ol.format.GeoJSON()
              });
              window.features = features
              window.vectorSource = vectorSource*/

              // here set the
              vectorSource.clear();
              vectorSource.addFeatures(features)
              //vectorSource.changed()
              //vectorSource.refresh()

              // change view to dataset center
              view.setCenter( ol.extent.getCenter( vectorSource.getExtent()))
              view.setZoom(15)

              // set the dropdown values, delete geomtry and id_Xdata fields
              var keys = vectorSource.getFeatures()[0].getKeys()
              keys.splice(keys.indexOf('id_'+this.$store.getters.getDataType[0]+'data'), 1)
              keys.splice(keys.indexOf('geometry'), 1)
              this.fields = keys

            } else{
              console.log(response)
            }
          }
        )
      },

      logErr(er){
        this.errorresult = er;
      }
    }, // end methods

    mounted () {


      // todo: if we are in wizard mode we need to get parameters from the global store and download the data
      // todo: if we are not in wizard mode there should be a way to select the data to filter

      // INITIALIZE MAPS
      // ol view, shared between maps
      // initialize a custom namespace if not available
      window.jsdss = window.jsdss || {};
      window.jsdss.data = {};
      window.jsdss.maps = {};
      window.jsdss.colors.rgb1 = [255, 255, 255]
      window.jsdss.colors.rgb2 = [0, 0, 0]
      window.jsdss.maps.jsonfield = this.$refs.jsonfield
      ////////////storing debug variables
      window.jsdss.debug = {};
      window.jsdss.debug.histo = []
      window.jsdss.debug.dataType = 'canopy'

      this.$store.commit('setDebug',true)
      window.jsdss.debug.debug = true
      ////////////////
      // dataType should be passed by the framework, now just debug
      if (this.$store.getters.getDebug) {
        window.jsdss.data.dataType = window.jsdss.debug.dataType;
        // this.$store.state.data.dataType = window.jsdss.debug.dataType;
        this.$store.commit('setDataType',window.jsdss.debug.dataType) // commit mutation
      }


      // if we are in wizard mode we need to download the data
      if(this.$store.getters.getWizard){

        console.log('wizard mode')
        if (this.$store.getters.getDebug) {
        this.$store.commit('setDataType',window.jsdss.debug.dataType) // todo: change after testing
        } else{
          this.$store.commit('setDataType', this.$store.getters.getMetatable)
        }
        this.setLayout()
      }

      else{
        console.log('non wizard mode')
        if (this.$store.getters.getDebug) {
          this.$store.commit('setDataType', window.jsdss.debug.dataType) // todo: change after testing
        }
        this.setLayout()
      }

    },
    destroyed(){
      window.jsdss.maps.mapKeep.setTarget(null)
      window.jsdss.maps.mapKeep = null
      window.jsdss.maps.mapRemove.setTarget(null)
      window.jsdss.maps.mapRemove = null
      // remove the geojson datasource
      window.jsdss.data.geojsource = null
      window.jsdss.maps.selectedFeaturesRight = null
      window.jsdss.maps.selectedFeatures = null
    },
    created(){
      // console.log(this.$store.getters.getWizard)
    }
  }
</script>
