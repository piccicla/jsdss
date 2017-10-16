<template>

  <div>

    <div class="row  mt-5">

      <div class="form-group col-md-6 mt-5">
        <label for="url">URL</label>
        <input type="text" class="form-control" id="url" placeholder="url" v-model="url">
      </div>
    </div>
    <div class="row">
      <div class="form-group col-md-6">
        <label for="folderid">folderid</label>
        <input type="text" class="form-control" id="folderid" placeholder="name" v-model="user.folderid">
      </div>
      <div class="form-group col-md-6">
        <label for="fileformat">fileformat</label>
        <input type="text" class="form-control" id="fileformat" placeholder="surname" v-model="user.fileformat">
      </div>
    </div>
    <div class="row">
      <div class="form-group col-md-3">
        <label for="metatable">metatable</label>
          <input type="text" class="form-control" id="metatable" placeholder="name" v-model="user.metatable">
      </div>
      <div class="form-group col-md-3">
        <label for="toolid">toolid</label>
        <input type="text" class="form-control" id="toolid" placeholder="surname" v-model="user.toolid">
      </div>
    </div>
    <div class="row">
        <div class="form-group col-md-3">
          <label for="datetime">datetime</label>
          <input type="text" class="form-control" id="datetime" placeholder="datetime" v-model="user.datetime">
        </div>
        <div class="form-group col-md-3">
          <label for="roworientation">roworientation</label>
          <input type="text" class="form-control" id="roworientation" placeholder="roworientation" v-model="user.roworientation">
        </div>
    </div>

    <div class="row">
      <div class="form-group col-md-6">
        <label for="file">Upload file (.csv, or .zip)</label>
        <input ref="image" type="file" id="file" @change="onFileChange">
      </div>
    </div>



    <div class="row">
      <button class="btn btn-primary ml-3 " @click="submit"  >Update</button>
    </div>

    <textarea class="mt-3" rows="4" cols="100">
      {{this.testresult}}
    </textarea>
    <textarea rows="4" cols="100">
      {{this.errorresult}}
    </textarea>

  </div>


</template>


<script>
  /* eslint-disable */
  export default{
    data () {
      return {
        url: 'processing/database/getfields/executesync/',
        user: {
          folderid: 'a5f9e0915ecb94449b26a8dc52b970cc0',
          fileformat: 'zip',
          metatable: 'canopy',
          toolid: '1',
          datetime: '2017-10-16 14:19:25.01',
          file: '',
          roworientation: 'NE',

        },
        testresult: 'result...',
        errorresult: 'error...',
        formData: ''
      }
    },
    methods: {
      submit () {



        // console.log(this.user.name)
        //var formData = new FormData();
        //formData.append('folderid', this.user.folderid);
        //formData.append('fileformat', this.user.fileformat);
        //this.$http.post(this.url, formData,....

        this.formData = new FormData();
        this.formData.append( 'file', this.user.file);
        this.formData.append( 'metatable', this.user.metatable);
        this.formData.append( 'toolid', this.user.toolid);
        this.formData.append( 'datetime', this.user.datetime);
        this.formData.append( 'roworientation', this.user.roworientation);
        this.formData.append( 'folderid', this.user.folderid);
        this.formData.append( 'fileformat', this.user.fileformat);
        this.$http.post(this.url, this.formData,

        /*this.$http.post(this.url, {folderid: this.user.folderid, fileformat: this.user.fileformat,
          file: this.user.file, metatable: this.user.metatable, toolid: this.user.toolid,
          datetime: this.user.datetime, roworientation: this.user.roworientation},*/

        {headers: {'Content-Type': 'multipart/form-data'}
          //,emulateJSON: true //Send request body as application/x-www-form-urlencoded content type, yo avoid FormData
        })

          .then(
            response => {
              //console.log(response)
              return response.json()// this is a promise
              //console.log(data)
            },
            error => {
              //console.log(error)
              this.logErr(error)
            }
          )
          .then(
            response => {
              //console.log(response)
              if (response){
                this.testresult = response;
                this.errorresult = 'error...'
              }
              else{
                this.testresult = 'response...'
              }
              //console.log(response)
            },
          )
      },
      logErr(er){
          this.errorresult = er;
      },

      onFileChange() {
        const files = this.$refs.image.files;
        // const data = new FormData();
        // data.append('logo', files[0]);
        console.log(files[0])
        this.user.file = files[0]
      }

    }
  }
</script>

<style>




</style>
