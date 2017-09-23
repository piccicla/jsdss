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


    <div class="row">
      <div class="form-group col-12">
        <label for="browseInfo">Processing</label>
        <table class="table table-hover">
          <thead>
          <tr>
            <th>#</th>
            <th>Operation</th>
            <th>Status</th>
            <th>Link</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Interpolation</td>
            <td class="bg-warning">running</td>
            <td></td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>interpolation</td>
            <td class="bg-danger">failed</td>
            <td></td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>interpolation</td>
            <td class="bg-success">Success</td>
            <td><button>xxx</button></td>
          </tr>

          </tbody>
        </table>
      </div>
    </div>


  </div>


</template>
