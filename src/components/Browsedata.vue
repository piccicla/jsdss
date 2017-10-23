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
        <select ref="typefield" class="form-control" id="browseType" @change="onTypeChange">
          <option value="">Please select one</option>
          <option value="canopy">canopy</option>
          <option value="soil">soil</option>
          <option value="yield">yield</option>
          <option value="sensor">sensor</option>
        </select>
      </div>
      <div class="form-group col-md-6">
        <label for="browseAvail">Available datasets</label>
        <select ref="datasetfield" class="form-control" id="browseAvail" @change="onDatasetChange">
          <option value="">Please select one</option>
          <option v-for="dataset in datasets" v-bind:value="dataset.id">
            {{ dataset.text }}</option>
        </select>
      </div>

    </div>
    <div class="row">
      <div class="form-group col-12">
        <label for="browseInfo">Info</label>
        <textarea ref="infofield"  class="form-control" id="browseInfo" rows="6" ></textarea>
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


<script>
  /* eslint-disable */
  export default {
    data () {
      return {
        urls:{
          getdatasets: 'processing/database/getdatasets/executesync/',
          getdatasetinfo: 'processing/database/getdatasetinfo/executesync/'
        },
        datasets: [],
        datasetinfo: ''
      }
    },
    methods:{
      onTypeChange(){
        this.$http.post(this.urls.getdatasets, {metatable: this.$refs.typefield.value},
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
            // console.log(response)
            if (response && response.success) {
              this.datasets = response.content[0].value
            } else {
              this.datasets = []
            }
          }
        )
      },
      logErr(er){
        this.errorresult = er;
      },
      onDatasetChange(){
        this.$http.post(this.urls.getdatasetinfo, {
          metatable: this.$refs.typefield.value,
            datasetid: this.$refs.datasetfield.value
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
              const value= response.content[0].value

              this.$refs.infofield.value = "bounding box: " + value.bbox + "\n" +
              "number points: " + value.npoints + "\n" +
              "tool: " + value.tname + "\n" +
              "row orintation(meters): " + value.rowor +
              " | swath_width(meters): " + value.swath +
              " | offset(meters): " + value.offs +
              " | row_spacing(meters): " + value.rowspac + "\n" +
              "values " + JSON.stringify(value.values) + "\n" +
              "comments " + value.comments
            } else {
              this.$refs.infofield.value = ''
          }
          }
        )
      }
    }
  }
</script>
