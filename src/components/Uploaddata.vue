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
          <select class="form-control" id="dataType" @change="onTypeChange">
            <option value="canopy">canopy</option>
            <option value="soil">soil</option>
            <option value="yield">yield</option>
            <option value="sensor">sensor</option>
          </select>
        </div>
        <div class="form-group col-md-4">
          <label for="dataTool">Tool</label>

          <select ref="toolfield" class="form-control" id="dataTool" @change="onToolChange">
            <option disabled value="">Please select one</option>
            <option v-for="tool in tools" v-bind:value="tool.id">
              {{ tool.text }}
            </option>

          </select>

          <button class="btn btn-primary float-right my-4">New tool</button>
        </div>

        <div class="form-group col-md-4">
          <label for="dataOrientation">Row orientation</label>
          <select ref="roworientationfield" class="form-control" id="dataOrientation">
            <option value="ns">north-south</option>
            <option value="we">west-east</option>
          </select>
        </div>
      </div>
      <div class="row p-2">
        <div class="form-group col-md-4">
          <label for="dataDate">Date</label>
          <input ref="datefield" type="date" class="form-control" id="dataDate" required pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}">

        </div>

        <div class="form-group col-md-4">
          <label for="dataTime">Time</label>
          <input ref="timefield" type="time" class="form-control" id="dataTime" pattern="[0-9]{2}:[0-9]{2}">
        </div>


      </div>
    </div>

    <div class="border border-secondary bg-light my-1">
      <div class="row">
        <h4 class="px-3">OPTIONAL</h4>
      </div>
      <div class="row p-2">
        <div class="form-group col-md-3">
          <label for="dataSwath">Swath width</label>
          <input ref="swathfield" type="number" step="0.01" class="form-control" id="dataSwath">

        </div>
        <div class="form-group col-md-1">
          <label for="swathunit">unit</label>
          <select ref="swathunit" class="form-control" id="swathunit">
            <option value="m">meters</option>
            <option value="cm">centimeters</option>
            <option value="f">feet</option>
            <option value="i">inches</option>
          </select>
        </div>
        <div class="form-group col-md-3">
          <label for="dataOffset">Offset</label>
          <input ref="offsetfield" type="number" step="0.01" class="form-control" id="dataOffset">
        </div>
        <div class="form-group col-md-1">
          <label for="offsetunit">unit</label>
          <select ref="offsetunit" class="form-control" id="offsetunit">
            <option value="m">meters</option>
            <option value="cm">centimeters</option>
            <option value="f">feet</option>
            <option value="i">inches</option>
          </select>
        </div>
        <div class="form-group col-md-3">
          <label for="dataSpacing">Row spacing</label>
          <input ref="rowspacingfield" type="number" step="0.01" class="form-control" id="dataSpacing">
        </div>
        <div class="form-group col-md-1">
          <label for="rowspacingunit">unit</label>
          <select ref="rowspacingunit" class="form-control" id="rowspacingunit">
            <option value="m">meters</option>
            <option value="cm">centimeters</option>
            <option value="f">feet</option>
            <option value="i">inches</option>
          </select>
        </div>
      </div>
      <div class="row p-2">
        <div class="form-group col-md-8">
          <label for="dataComments">Comments</label>
          <textarea ref="commentsfield" class="form-control" id="dataComments" rows="4" ></textarea>
        </div>
      </div>

    </div>


    <div class="border border-primary bg-light my-1">

      <div class="row p-2">
        <div class="form-group col-md-4 col-xl-3">
          <label for="dataFile">Upload file (.csv, or .zip)</label>
          <input ref="filefield" type="file" class="form-control-file" id="dataFile" @change="onFileChange">
          <small class="form-text text-muted" id="fileHelp">use .zip for shapefiles</small>
        </div>
        <button class="btn btn-danger col-11 mx-auto mx-lg-0  col-md-3 col-xl-1 h-25 mt-4" @click="upload"  >Upload</button>
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
              <select ref="latfield" class="form-control" id="dataLat"></select>
            </div>
            <div class="form-group col-md-4">
              <label for="dataLon">Longitude(X)</label>
              <select ref="lonfield" class="form-control" id="dataLon"></select>
            </div>
            <div class="form-group col-md-4">
              <label for="dataValue1">Value 1</label>
              <select ref="value1field" class="form-control" id="dataValue1"></select>
            </div>
          </div>
          <hr>
          <div class="row">
            <h4 class="p-2">OPTIONAL</h4>
          </div>
          <div class="row ">
            <div class="form-group col-md-4">
              <label for="dataValue2">Value 2</label>
              <select ref="value2field" class="form-control" id="dataValue2"></select>
              <label for="dataValue5">Value 5</label>
              <select ref="value5field" class="form-control" id="dataValue5"></select>
            </div>
            <div class="form-group col-md-4">
              <label for="dataValue3">Value 3</label>
              <select ref="value3field" class="form-control" id="dataValue3"></select>
              <label for="dataValue6">Value 6</label>
              <select ref="value6field" class="form-control" id="dataValue6"></select>
            </div>
            <div class="form-group col-md-4">
              <label for="dataValue4">Value 4</label>
              <select ref="value4field" class="form-control" id="dataValue4"></select>
              <label for="dataRows">Rows</label>
              <select ref="rowfield" class="form-control" id="dataRows"></select>
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

<script>
  /* eslint-disable */
  export default {
    data () {
      return {
        urls:{
          tools: 'processing/database/gettools/executesync/',
          upload: 'processing/database/upload/executesync/'
        },
        tools: [],
        formData: '',
        file: ''
      }
    },
    methods: {

      // onchange of type refresh the tool dropdown
      onTypeChange(e) {
        console.log(e.target.value)
        this.$store.commit('setMetatable', e.target.value)
        // updatetools
        this.updateTools()

      },
      onToolChange(e) {
        //console.log(e.target.value)
        //this.selectedTool = e.target.value
        //console.log(this.selectedTool)
      },
      updateTools() { // query the database and get id and name for the tools
        this.$http.post(this.urls.tools, {metatable: this.$store.getters.getMetatable},
          { //headers: {'Content-Type': 'multipart/form-data'},
            emulateJSON: true //Send request body as application/x-www-form-urlencoded content type, yo avoid FormData
          }).then(
          response => {
            return response.json()
          },
          error => {
            console.log(error)
          }
        ).then(
          response => {
            // console.log(response)
            if (response.success) {
              this.tools = response.content[0].value
            } else {
              this.tools = []
            }
            //console.log(this.tools)
          }
        )
      },
      onFileChange() {
        const files = this.$refs.filefield.files;
        // const data = new FormData();
        // data.append('logo', files[0]);
        console.log(files[0])
        this.file = files[0]
      },
      upload() {
        //TODO: check  type of optional fields


        if (!this.$refs.filefield.files[0]) {
          console.log("mandatory file is missing")
          return
        }

        if (!this.$refs.toolfield.value) {
          console.log("mandatory tool is missing")
          return
        }
        else if (!this.$refs.roworientationfield.value) {
          console.log("mandatory roworientation is missing")
          return
        }
        else if (!this.$refs.datefield.value) {
          console.log("mandatory date is missing")
          return
        } else if (!this.$refs.timefield.value) {
          console.log("mandatory time is missing")
          return
        }

        this.$store.commit('setToolid', this.$refs.toolfield.value)
        this.$store.commit('setRoworientation', this.$refs.roworientationfield.value)
        // TODO: check datetime fields
        this.$store.commit('setDatetime', this.$refs.datefield.value + ' ' + this.$refs.timefield.value)

        this.formData = new FormData();
        this.formData.append('file', this.file);
        this.formData.append('metatable', this.$store.getters.getMetatable);
        this.formData.append('toolid', this.$store.getters.getToolid);
        this.formData.append('datetime', this.$store.getters.getDatetime);
        this.formData.append('roworientation', this.$store.getters.getRoworientation);

        if (this.$refs.swathfield.value) {
          this.$store.commit('setSwathwidth', this.$refs.swathfield.value)
          this.formData.append('swathwidth', this.$store.getters.getSwathwidth);
        }

        if (this.$refs.offsetfield.value) {
          this.$store.commit('setOfset', this.$refs.offsetfield.value)
          this.formData.append('ofset', this.$store.getters.getOfset);
        }

        if (this.$refs.rowspacingfield.value) {
          this.$store.commit('setRowspacing', this.$refs.rowspacingfield.value)
          this.formData.append('rowspacing', this.$store.getters.getRowspacing);
        }
        if (this.$refs.commentsfield.value) {
          this.$store.commit('setComments', this.$refs.commentsfield.value)
          this.formData.append('comments', this.$store.getters.getComments);
        }
        // ////////////////////call the service/////////////////////////////
        this.$http.post(this.urls.upload, this.formData,
          {
            headers: {'Content-Type': 'multipart/form-data'}
            //,emulateJSON: true //Send request body as application/x-www-form-urlencoded content type, yo avoid FormData
          })
          .then(response => {
            return response.json()// this is a promise
          }, error => {
            this.logErr(error)
          })
          .then(
            response => {
              console.log(response)
            }
          )
      },
      logErr(er){
        this.errorresult = er;
      }
    },
    computed:{
      selectedTool: function(){
        if (this.$refs.droptool.value){
          return this.$refs.droptool.value}
        else{
          return ""}
      }
    },
    created(){
      this.$store.commit('setMetatable','canopy')
      // populate the tools dropdown for canopyupdate tools
      this.updateTools()
    }
  }
</script>
