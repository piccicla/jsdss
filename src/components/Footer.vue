<template>
  <div class="row bg-dark text-center">

    <div class="col-sm-6 p-2  ">
      <button class="btn btn-primary  w-100" @click="goBack">{{previousFooterText}}</button>
    </div>

    <div class="col-sm-6 p-2 ">
      <button class="btn btn-primary  w-100" @click="goNext">{{nextFooterText}}</button>
    </div>

  </div>
</template>


<script>
  // /* eslint-disable */
  export default {
    data () {
      return {
        // todo variables should be changed depending on the operation
        previousFooterText: 'EXIT',
        nextFooterText: 'NEXT',
        previousLink: 'home',
        nextLink: 'FilterUploaded'
      }
    },
    methods: {
      goBack () {
        this.$router.push({name: this.previousLink})
      },
      goNext () {
        this.$router.push({name: this.nextLink})
      }
    }
  }

</script>



