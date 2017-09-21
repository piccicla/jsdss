<template>
  <div>



    <hr>
    <div class="row justify-content-center">
      <h1 class="ml-2 mt-5">FILTER DATA AND INTERPOLATE</h1>
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
            <div id="infoAverageKeep" class="redtext">Average value</div>
            <!-- update style, set automatic update -->
            <button id="applyColors">Update style</button>
            <input type="checkbox" id="automateColors"><span class="greentext">automate style</span>
          </div>
          <div class="w-100"></div>
          <div class="row ml-3 my-1">
            <!-- choose colors for style -->
            <span class="redtext">Color1&nbsp;</span><input class="jscolor" onchange="updateLowColor(this.jscolor)" value="FFFFFF" size="6">
            <span class="redtext">&nbsp;Color2&nbsp;</span><input class="jscolor" onchange="updateHighColor(this.jscolor)" value="FF0000" size="6"><br>
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
            <button id="histogram">Histogram</button><span id="infoBin" class="redtext">&nbsp;Num.bins </span><input type="text" id="nBins" value="10" size="6"><br>
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
      <button  type="button" id="uploadSelection" class="col-lg-6 btn btn-danger">Update data</button>
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

  export default {
    name: 'mappa',
    data () {
      return {
        msg: 'Welcome to Your OpenLayers3 map',
        mapKeep: void 0,
        mapRemove: void 0
      }
    },
    mounted () {
      // INITIALIZE MAPS
      // ol view, shared between maps
      const view = new ol.View({
        center: [ -13626654, 4639902 ], // todo: automate center when downlading data
        zoom: 15
      })
      const bingLayer = new ol.layer.Tile({
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
      this.mapKeep = new ol.Map({
        target: 'map-keep',
        renderer: 'webgl',
        layers: [
          /* new ol.layer.Tile({
            source: new ol.source.OSM()
          }), */
          bingLayer
        ],
        view: view
      })
      // ///this is the map with the points to be removed////////////
      this.mapRemove = new ol.Map({
        target: 'map-remove',
        renderer: 'webgl',
        layers: [
          /* new ol.layer.Tile({
            source: new ol.source.OSM()
          }), */
          bingLayer
        ],
        view: view
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
    },
    destroyed(){
      this.mapKeep.setTarget(null);
      this.mapKeep = null;
      this.mapRemove.setTarget(null);
      this.mapRemove = null;
    }
  }
</script>
