<template>
  <div>

    <hr>
    <div class="row justify-content-center">
      <h1 class="ml-2 mt-5">UPLOAD DATASET</h1>
    </div>
    <hr>


    <div class="border border-primary bg-light my-1">

      <div class="row">
        <h4 class="px-3">MANDATORY</h4>
      </div>

      <div class="row p-2">
        <div class="form-group col-md-4 ">
          <label for="dataType">Type</label>
          <select class="form-control" id="dataType">
            <option>canopy</option>
            <option>soil</option>
            <option>yield</option>
            <option>sensor</option>
          </select>
        </div>
        <div class="form-group col-md-4">
          <label for="dataTool">Tool</label>
          <select class="form-control" id="dataTool">
          </select>
          <button class="btn btn-primary float-right my-4">New tool</button>
        </div>

        <div class="form-group col-md-4">
          <label for="dataOrientation">Row orientation</label>
          <select class="form-control" id="dataOrientation">
            <option>north-south</option>
            <option>west-east</option>
          </select>
        </div>
      </div>
      <div class="row p-2">
        <div class="form-group col-md-4">
          <label for="dataDate">Date</label>
          <input type="text" class="form-control" id="dataDate">

        </div>

        <div class="form-group col-md-4">
          <label for="dataTime">Time</label>
          <input type="text" class="form-control" id="dataTime">
        </div>


      </div>
    </div>

    <div class="border border-secondary bg-light my-1">
      <div class="row">
        <h4 class="px-3">OPTIONAL</h4>
      </div>
      <div class="row p-2">
        <div class="form-group col-md-4">
          <label for="dataSwath">Swath width</label>
          <input type="text" class="form-control" id="dataSwath">

        </div>
        <div class="form-group col-md-4">
          <label for="dataOffset">Offset</label>
          <input type="text" class="form-control" id="dataOffset">
        </div>
        <div class="form-group col-md-4">
          <label for="dataSpacing">Row spacing</label>
          <input type="text" class="form-control" id="dataSpacing">
        </div>
      </div>
      <div class="row p-2">
        <div class="form-group col-md-8">
          <label for="dataComments">Comments</label>
          <textarea class="form-control" id="dataComments" rows="4" ></textarea>
        </div>
      </div>

    </div>


    <div class="border border-primary bg-light my-1">

      <div class="row p-2">
        <div class="form-group col-md-4 col-xl-3">
          <label for="dataFile">Upload file (.csv, or .zip)</label>
          <input type="file" class="form-control-file" id="dataFile">
          <small class="form-text text-muted" id="fileHelp">use .zip for shapefiles</small>
        </div>
        <button class="btn btn-danger col-11 mx-auto mx-lg-0  col-md-3 col-xl-1 h-25 mt-4">Upload</button>
      </div>
    </div>

    <hr>

    <div class="border mt-2 bg-light ">


      <div class="row  col-sm-12"> <!--outer row-->



        <div class="col-12 col-md-10">
          <div class="row">
            <h4 class="p-2">MANDATORY</h4>
          </div>
          <div class="row">

            <div class="form-group col-md-4">
              <label for="dataLat">Latitude(Y)</label>
              <select class="form-control" id="dataLat"></select>
            </div>
            <div class="form-group col-md-4">
              <label for="dataLon">Longitude(X)</label>
              <select class="form-control" id="dataLon"></select>
            </div>
            <div class="form-group col-md-4">
              <label for="dataValue1">Value 1</label>
              <select class="form-control" id="dataValue1"></select>
            </div>
          </div>
          <hr>
          <div class="row">
            <h4 class="p-2">OPTIONAL</h4>
          </div>
          <div class="row ">
            <div class="form-group col-md-4">
              <label for="dataValue2">Value 2</label>
              <select class="form-control" id="dataValue2"></select>
              <label for="dataValue5">Value 5</label>
              <select class="form-control" id="dataValue5"></select>
            </div>
            <div class="form-group col-md-4">
              <label for="dataValue3">Value 3</label>
              <select class="form-control" id="dataValue3"></select>
              <label for="dataValue6">Value 6</label>
              <select class="form-control" id="dataValue6"></select>
            </div>
            <div class="form-group col-md-4">
              <label for="dataValue4">Value 4</label>
              <select class="form-control" id="dataValue4"></select>
              <label for="dataRows">Rows</label>
              <select class="form-control" id="dataRows"></select>
            </div>
          </div>
        </div>


        <div class="col-12 col-md-2">
          <button class="btn btn-danger h-100 w-100">Set fields</button>
        </div>

      </div> <!--outer row-->

    </div> <!--border-->


  </div>
</template>
