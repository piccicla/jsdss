<template>

  <div>

    <hr>
    <div class="row justify-content-center">
      <h1 class="ml-2 mt-5">BROWSE DATASET</h1>
    </div>
    <hr>

    <div class="row">
      <div class="form-group col-md-6">
        <label for="browseType">Type</label>
        <select class="form-control" id="browseType">
          <option>canopy</option>
          <option>soil</option>
          <option>yield</option>
          <option>sensor</option>
        </select>
      </div>
      <div class="form-group col-md-6">
        <label for="browseAvail">Available datasets</label>
        <select class="form-control" id="browseAvail">
        </select>
      </div>

    </div>
    <div class="row">
      <div class="form-group col-12">
        <label for="browseInfo">Info</label>
        <textarea class="form-control" id="browseInfo" rows="5" ></textarea>
      </div>
    </div>


  </div>


</template>
