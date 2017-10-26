<template>

  <div class="row" style="height:200px">

    <div id="map" class="map col-12"></div>
  </div>


  <!--<div class="row" style="height:200px">
    <div class="col-sm-12 col-md-3" style="border:1px solid #333">
          left panel
    </div>
    <div class="col-sm-12 col-md-9" style="border:1px solid #333">
      <div class="row mapbox" style="border:1px solid #333">
        <div class="">map</div>
      </div>
      <div class="row bottombox" style="border:1px solid #333">
        <div class="">map footer</div>
      </div>
    </div>
  </div>-->


</template>


<script>
  /* eslint-disable */
  export default{
    data () {
      return {
        map: void 0
      }
    },
    mounted () {
      this.map = new ol.Map({
        view: new ol.View({
          center: [-15000, 6700000],
          zoom: 5
        }),
        layers: [
          new ol.layer.Tile({
            source: new ol.source.OSM()
          })
        ],
        target: 'map'
      })
    },
    destroyed () {
      this.map.setTarget(null)
      this.map = null
    }
  }

</script>


<style scoped>

  .map {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    font-family: Arial, sans-serif;
  }
  /*
  .mapbox{
    position: absolute;
    top:0%;
    left:0%;
    right:0%;
    height: 80%;
  }
  .bottombox {
    position: absolute;
    bottom:0%;
    left:0%;
    right:0%;
    height: 20%;
  }*/
</style>
