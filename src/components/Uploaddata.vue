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
              {{ tool.text }}</option>
          </select>

          <button class="btn btn-primary float-right my-4" data-toggle="modal" data-target="#myModal">New tool</button>
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
            <option value="m">meter</option>
            <option value="f">foot</option>
            <option value="i">yard</option>
          </select>
        </div>
        <div class="form-group col-md-3">
          <label for="dataOffset">Offset</label>
          <input ref="offsetfield" type="number" step="0.01" class="form-control" id="dataOffset">
        </div>
        <div class="form-group col-md-1">
          <label for="offsetunit">unit</label>
          <select ref="offsetunit" class="form-control" id="offsetunit">
            <option value="m">meter</option>
            <option value="f">foot</option>
            <option value="i">yard</option>
          </select>
        </div>
        <div class="form-group col-md-3">
          <label for="dataSpacing">Row spacing</label>
          <input ref="rowspacingfield" type="number" step="0.01" class="form-control" id="dataSpacing">
        </div>
        <div class="form-group col-md-1">
          <label for="rowspacingunit">unit</label>
          <select ref="rowspacingunit" class="form-control" id="rowspacingunit">
            <option value="m">meter</option>
            <option value="f">foot</option>
            <option value="i">yard</option>
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
        <button class="btn btn-danger col-11 mx-auto mx-lg-0  col-md-3 col-xl-1 h-25 mt-4" @click="upload"  :disabled="uploaddisabled" >Upload</button>
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
              <select ref="latfield" class="form-control" id="dataLat">
              <option v-for="field in fields" v-bind:value="field">
                {{ field }}
              </option>
              </select>

            </div>
            <div class="form-group col-md-4">
              <label for="dataLon">Longitude(X)</label>
              <select ref="lonfield" class="form-control" id="dataLon">
                <option v-for="field in fields" v-bind:value="field">
                  {{ field }}</option>
              </select>
            </div>
            <div class="form-group col-md-4">
              <label for="dataValue1">Value 1</label>
              <select ref="value1field" class="form-control" id="dataValue1" >
                <option v-for="field in fields" v-bind:value="field">
                  {{ field }}</option>
              </select>
            </div>
          </div>
          <hr>
          <div class="row">
            <h4 class="p-2">OPTIONAL</h4>
          </div>
          <div class="row ">
            <div class="form-group col-md-4">
              <label for="dataValue2">Value 2 (UTC Time if available)</label>
              <select ref="value2field" class="form-control" id="dataValue2" @change="onValue2Change">
                <option v-for="field in fields" v-bind:value="field">
                  {{ field }}</option>
              </select>
              <label for="dataValue5">Value 5</label>
              <select ref="value5field" class="form-control" id="dataValue5" :disabled="v5disabled"  @change="onValue5Change">
                <option v-for="field in fields" v-bind:value="field">
                  {{ field }}</option>
              </select>
            </div>
            <div class="form-group col-md-4">
              <label for="dataValue3">Value 3</label>
              <select ref="value3field" class="form-control" id="dataValue3" :disabled="v3disabled"   @change="onValue3Change">
                <option v-for="field in fields" v-bind:value="field">
                  {{ field }}</option>
              </select>
              <label for="dataValue6">Value 6</label>
              <select ref="value6field" class="form-control" id="dataValue6" :disabled="v6disabled"  >
                <option v-for="field in fields" v-bind:value="field">
                  {{ field }}</option>
              </select>
            </div>
            <div class="form-group col-md-4">
              <label for="dataValue4">Value 4</label>
              <select ref="value4field" class="form-control" id="dataValue4" :disabled="v4disabled"  @change="onValue4Change">
                <option v-for="field in fields" v-bind:value="field">
                  {{ field }}</option>
              </select>
              <label for="dataRows">Rows</label>
              <select ref="rowfield" class="form-control" id="dataRows">
                <option v-for="field in fields" v-bind:value="field">
                  {{ field }}</option>
              </select>
            </div>
          </div>
        </div>

        <div class="col-12 col-md-2">
          <button class="btn btn-danger h-100 w-100" @click="todatabase" :disabled="setfieldsdisabled">Set fields</button>
        </div>

      </div> <!--outer row-->

    </div> <!--border-->



    <!-- MODAL -->
    <div class="modal" id="myModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Add tool</h5>
            <button class="close" data-dismiss="modal">&times;</button>
          </div>
          <div class="modal-body">

            <div class="form-group col-12">
              <label for="newToolName">Name</label>
              <input ref="newtoolnamefield" type="text" class="form-control" id="newToolName">
            </div>

            <div class="row p-2">
              <div class="form-group col-12">
                <label for="newToolComments">Comments</label>
                <textarea ref="newtoolcomments" class="form-control" id="newToolComments" rows="4" ></textarea>
              </div>
            </div>

         </div>
          <div class="modal-footer">
            <button class="btn btn-primary" >Add</button>
            <button class="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
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
          tools: 'processing/database/gettools/executesync/',
          upload: 'processing/database/upload/executesync/',
          fields: 'processing/database/getfields/executesync/',
          todatabase: 'processing/database/todatabase/executesync/'
        },
        tools: [],
        formData: '',
        file: '',
        fields: [],
        v3disabled: true,
        v4disabled: true,
        v5disabled: true,
        v6disabled: true,
        uploaddisabled: false,
        setfieldsdisabled: true

      }
    },
    beforeRouteLeave (to, from, next) { //set wizard to empty
      this.$store.commit('resetWizard', '')
      next()
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
      onValue2Change(e){
        if(this.$refs.value2field.value==="not_available"){
          this.$refs.value3field.value="not_available";
          this.$refs.value4field.value="not_available";
          this.$refs.value5field.value="not_available";
          this.$refs.value6field.value="not_available";
          this.v3disabled=true;this.v4disabled=true;this.v5disabled=true;this.v6disabled=true
        } else(this.v3disabled=false)
      },
      onValue3Change(e){
        if(this.$refs.value3field.value==="not_available"){
          this.$refs.value4field.value="not_available";
          this.$refs.value5field.value="not_available";
          this.$refs.value6field.value="not_available";
          this.v4disabled=true;this.v5disabled=true;this.v6disabled=true
        } else(this.v4disabled=false)
      },
      onValue4Change(e){
        if(this.$refs.value4field.value==="not_available"){
          this.$refs.value5field.value="not_available";
          this.$refs.value6field.value="not_available";
          this.v5disabled=true;this.v6disabled=true
        } else(this.v5disabled=false)
      },
      onValue5Change(e){
        if(this.$refs.value5field.value==="not_available"){
          this.$refs.value6field.value="not_available";
          this.v6disabled=true
        } else(this.v6disabled=false)

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
            this.logErr(error)
          }
        ).then(
          response => {
            // console.log(response)

            if (response && response.success) {
              this.tools = response.content[0].value
            } else {
              this.tools = []
            }
            //console.log(this.tools)
          }
        )
      },
      logErr(er){
        this.errorresult = er;
      },
      onFileChange() {
        const files = this.$refs.filefield.files;
        // const data = new FormData();
        // data.append('logo', files[0]);
        console.log(files[0])
        console.log(files[0].name)
        this.file = files[0]
      },
      upload() {
        //TODO: check  type of optional fields
        console.log(this.$parent.$parent.$)



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

        this.$store.commit('setFilename', this.$refs.filefield.files[0].name)
        this.$store.commit('setToolid', this.$refs.toolfield.value)
        this.$store.commit('setRoworientation', this.$refs.roworientationfield.value)
        // TODO: check datetime fields
        this.$store.commit('setDatetime', this.$refs.datefield.value + ' ' + this.$refs.timefield.value)

        this.uploaddisabled = true //disable upload button

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

              if (response && response.success) {

                // put the results in the store and call the getfields service
                this.$store.commit('setFolderid',response.content[0].value) // folderid
                this.$store.commit('setDatasetid',response.content[1].value) // datasetid
                this.$store.commit('setFileformat',response.content[2].value) // fileformat

                this.fields = [] // delete the dropdown menus

                this.getFields()

              } else{}
            }
          )
      },

      getFields() { // query the database and get fields of uploaded dataset
        this.$http.post(this.urls.fields, {
            folderid: this.$store.getters.getFolderid,
            fileformat: this.$store.getters.getFileformat
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
              console.log(response.content)
              this.fields = response.content[0].value

              this.setfieldsdisabled = false
            } else{
              console.log(response)
              this.uploaddisabled = false //disable upload button
            }
          }
        )
      },

      todatabase() {

        // check mandatory fields
        if (this.$refs.latfield.value === "not_available") {
          console.log("mandatory lat is missing")
          return
        }
        if (this.$refs.lonfield.value === "not_available") {
          console.log("mandatory long is missing")
          return
        }
        if (this.$refs.value1field.value === "not_available") {
          console.log("mandatory value1 is missing")
          return
        }

        this.$store.commit('setLat', this.$refs.latfield.value)
        this.$store.commit('setLon', this.$refs.lonfield.value)
        this.$store.commit('setValue1', this.$refs.value1field.value)

        this.setfieldsdisabled = true // disable button

        this.formData = new FormData();

        this.formData.append('metatable', this.$store.getters.getMetatable);
        this.formData.append('filename', this.$store.getters.getFilename);
        this.formData.append('datasetid', this.$store.getters.getDatasetid);
        this.formData.append('folderid', this.$store.getters.getFolderid);
        this.formData.append('lat', this.$store.getters.getLat);
        this.formData.append('lon', this.$store.getters.getLon);
        this.formData.append('value1', this.$store.getters.getValue1);

        // check optional fields
        if (this.$refs.rowfield.value !== "not_available") {
          this.$store.commit('setRow', this.$refs.rowfield.value)
          this.formData.append('row', this.$store.getters.getRow);
        }
        if (this.$refs.value2field.value !== "not_available") {
          this.$store.commit('setValue2', this.$refs.value2field.value)
          this.formData.append('value2', this.$store.getters.getValue2)
          if (this.$refs.value3field.value !== "not_available") {
            this.$store.commit('setValue3', this.$refs.value3field.value)
            this.formData.append('value3', this.$store.getters.getValue3)
            if (this.$refs.value4field.value !== "not_available") {
              this.$store.commit('setValue4', this.$refs.value4field.value)
              this.formData.append('value4', this.$store.getters.getValue4)
              if (this.$refs.value5field.value !== "not_available") {
                this.$store.commit('setValue5', this.$refs.value5field.value)
                this.formData.append('value5', this.$store.getters.getValue5)
                if (this.$refs.value6field.value !== "not_available") {
                  this.$store.commit('setValue6', this.$refs.value6field.value)
                  this.formData.append('value6', this.$store.getters.getValue6)
                }
              }
            }
          }
        }
        // call service
        this.$http.post(this.urls.todatabase, this.formData,
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
              if (response && response.success) {
                // console.log('')
                this.$store.commit('setRightButtonDisabled', false) // enable next button
              } else{
                this.setfieldsdisabled = false
              }
            }
          ) // end service call

      } //end todatabase()
    }, // end methods
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

      // the next button is disabled
      this.$store.commit('setRightButtonDisabled', true)

    }
  }
</script>
