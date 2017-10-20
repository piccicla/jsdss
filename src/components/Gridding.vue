<template>

  <div>

    <hr>
    <div class="row justify-content-center">
      <h1 class="ml-2 mt-5">GRIDDING</h1>
    </div>
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
