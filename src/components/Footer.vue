<template>
  <div class="row bg-dark text-center">

    <div class="col-sm-6 p-2  ">
      <button class="btn btn-primary  w-100" @click="goLeft">{{leftText}}</button>
    </div>

    <div class="col-sm-6 p-2 ">
      <button class="btn btn-primary  w-100" @click="goRight">{{rightText}}</button>
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



