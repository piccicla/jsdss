<template>

  <div>

    <hr>
    <div class="row justify-content-center">
      <h1 class="ml-2 mt-5">GRIDDING</h1>
    </div>


    <img src="/static/img/grid.gif" align="center">


    <hr>
  </div>

</template>


<script>
export default {
  beforeRouteLeave (to, from, next) { // set wizard to empty
    this.$store.commit('resetWizard', '')
    next()
  }
}
</script>


<style scoped>

  img {
    display:block;
    margin:auto;
  }


</style>
