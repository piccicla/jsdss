<template>
  <div class="row bg-dark text-center">

    <div class="col-sm-6 p-2  ">
      <button  class="btn btn-primary  w-100" @click="goLeft"  :disabled="leftDisabled">{{leftText}}</button>
    </div>

    <div class="col-sm-6 p-2 ">
      <button  class="btn btn-primary  w-100" @click="goRight" :disabled="rightDisabled">{{rightText}}</button>
    </div>

  </div>
</template>


<script>
  // /* eslint-disable */
  export default {
    /* data () {
      return {
        leftText: 'EXIT',
        rightText: 'NEXT',
        leftPath: 'home',
        rightPath: 'FilterUploaded'
      }
    }, */
    computed: { // listen for variation in the centralstore and update text and links
      leftText: function () {
        let t = this.$store.getters.getLeftText
        return t[this.$store.getters.getStep]
      },
      rightText: function () {
        let t = this.$store.getters.getRightText
        return t[this.$store.getters.getStep]
      },
      leftPath: function () {
        let t = this.$store.getters.getLeftPath
        return t[this.$store.getters.getStep]
      },
      rightPath: function () {
        let t = this.$store.getters.getRightPath
        return t[this.$store.getters.getStep]
      },
      leftDisabled: function () {
        return this.$store.getters.getLeftButtonDisabled
      },
      rightDisabled: function () {
        return this.$store.getters.getRightButtonDisabled
      }
    },
    methods: {
      goLeft () {
        this.$router.push(this.leftPath)
      },
      goRight () {
        this.$router.push(this.rightPath)
      }
    }
  }

</script>



