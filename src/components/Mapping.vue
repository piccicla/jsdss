<template>

  <div class="row" style="height:200px">

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

  </div>


</template>

<style>

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
  }
</style>
