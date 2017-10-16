<template>
  <div id="app">

    <!--navbar-->
    <nav class="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
      <a class="navbar-brand" href="#">SDSS</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarsExampleDefault">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <!--<a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>-->
            <router-link to="/" class="nav-link" active-class="active" exact>Home<span class="sr-only">(current)</span></router-link>
          </li>
          <li class="nav-item">
            <router-link to="/mapping" class="nav-link" active-class="active" exact>Mapping</router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link disabled" href="#">Disabled</a>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="http://example.com" id="dropdown01" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Singles</a>
            <div class="dropdown-menu" aria-labelledby="dropdown01">

              <router-link to="/userform" class="dropdown-item" active-class="active" >User</router-link>
              <router-link to="/uploaddata" class="dropdown-item" active-class="active" >Upload data</router-link>
              <router-link to="filter" class="dropdown-item" active-class="active" >Filter data</router-link>
              <router-link to="/browsedata" class="dropdown-item" active-class="active" >Browse data</router-link>
              <router-link to="/test" class="dropdown-item" active-class="active" >Test vue-resource</router-link>

            </div>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="http://example.com" id="dropdown02" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Guided</a>
            <div class="dropdown-menu" aria-labelledby="dropdown01">

              <router-link to="/uploadfilter" class="dropdown-item" active-class="active" >Upload and filter</router-link>
              <router-link to="/interpolate" class="dropdown-item" active-class="active" >Interpolate</router-link>
            </div>
          </li>

        </ul>
        <form class="form-inline my-2 my-lg-0">
          <input class="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search">
          <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>
      </div>
    </nav>

    <div class="container-fluid">
      <!-- here insert the content -->
      <!--header-->

      <router-view name="header"></router-view>

      <!--body-->

      <router-view></router-view>

      <!--footer-->
      <router-view name="footer"></router-view>

    </div><!-- /.container-fluid -->

  </div><!-- app -->

</template>

<script>

// import p from './assets/js/prova.js'
// require('./assets/js/main.js')
// import './assets/js/histo.js' // empty imports just execute the bodies
// import './assets/js/colors.js'
// import './assets/js/jscolor.min.js'

// import Footer from './components/Footer.vue'
export default {
  name: 'app',
  components: {
    // appFooter: Footer
  },
  created: function () {
    // console.log(window.jsdss)
    // console.log(window.jscolor)
  }
}
</script>

<style>

</style>
