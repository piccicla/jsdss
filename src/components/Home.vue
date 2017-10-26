<template>


  <!--<div class="row" style="height:200px;paddind-top:150px">
    <h1 class="col align-self-center">{{ msg }}</h1>-->
  <div>
  <header id="home-section">

    <div class="dark-overlay">
      <div class="home-inner">
        <div class="container">
          <div class="row">
            <div class="col-lg-8 d-none d-lg-block">
              <h1 class="display-4"><strong>SDSS platform</strong></h1>

              <div class="d-flex flex-row">
                <div class="p-4 align-self-start">
                  <i class="fa fa-check"></i>
                </div>
                <div class="p-4 align-self-end">
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                  Aenean commodo ligula eget dolor. Aenean massa.
                  Cum sociis natoque penatibus et magnis dis parturient montes,
                  nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu,

                </div>
              </div>
              <div class="d-flex flex-row">
                <div class="p-4 align-self-start">
                  <i class="fa fa-check"></i>
                </div>
                <div class="p-4 align-self-end">
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                  Aenean commodo ligula eget dolor. Aenean massa.
                  Cum sociis natoque penatibus et magnis dis parturient montes,
                  nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu,

                </div>
              </div>
              <div class="d-flex flex-row">
                <div class="p-4 align-self-start">
                  <i class="fa fa-check"></i>
                </div>
                <div class="p-4 align-self-end">
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                  Aenean commodo ligula eget dolor. Aenean massa.
                  Cum sociis natoque penatibus et magnis dis parturient montes,
                  nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu,

                </div>
              </div>
            </div>
            <div class="col-lg-4">

              <div class="card bg-primary text-center card-form">
                <div class="card-body">
                  <h3>Sign in</h3>
                  <p></p>
                  <form>
                    <div class="form-group">
                      <input type="text" class="form-control form-control-lg" placeholder="UserName">
                    </div>
                    <div class="form-group">
                      <input type="password" class="form-control form-control-lg" placeholder="Password">
                    </div>
                    <input type="submit" class="btn btn-outline-light btn-block">
                  </form>

                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </header>

  <!-- explore head -->

  <section id="explore-head-section">

    <div class="containter">

      <div class="row">

        <div class="col text-center">

          <div class="py-5">
            <h1 class="display-4">Explore</h1>

            <p class="lead">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
              Aenean commodo ligula eget dolor. Aenean massa.
            </p>
            <a href="#" class="btn btn-outline-secondary">Find Out More</a>

          </div>

        </div>

      </div>

    </div>

  </section>

  <!-- explore section -->

  <section id="explore-section" class="bg-light text-muted py-5">

    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <img src="/static/img/explore.jpeg" alt="" class="img-fluid mb-3 rounded-circle">
        </div>
        <div class="col-md-6">
          <h3>Explore & connect</h3>
          <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
            Aenean commodo ligula eget dolor. Aenean massa.</p>
          <div class="d-flex flex-row">
            <div class="p-4 align-self-start">
              <i class="fa fa-check"></i>
            </div>
            <div class="p-4 align-self-end">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
              Aenean commodo ligula eget dolor. Aenean massa.
              Cum sociis natoque penatibus et magnis dis parturient montes,
              nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu,

            </div>
          </div>
          <div class="d-flex flex-row">
            <div class="p-4 align-self-start">
              <i class="fa fa-check"></i>
            </div>
            <div class="p-4 align-self-end">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
              Aenean commodo ligula eget dolor. Aenean massa.
              Cum sociis natoque penatibus et magnis dis parturient montes,
              nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu,

            </div>
          </div>
        </div>
      </div>
    </div>



  </section>


  <!-- MAIN FOOTER -->

  <footer id="main-footer" class="bg-dark">

    <div class="containner">

      <div class="row">

        <div class="col text-center">

          <h1 class="h3">SDSS</h1>
          <p>Copyright &copy; 2017</p>
          <button class="btn btn-primary" data-toggle="modal" data-target="#contactModal">Contact Us</button>

        </div>
      </div>

    </div>

  </footer>


  </div>

</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to JSDSS'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  body {
    background: white;
    color: white; }

  #home-section {
    background: url("/static/img/home.jpg") no-repeat;
    background-size: cover;
    background-attachement: fixed;
    min-height: 700px; }

  .home-inner {
    color: white;
    padding-top: 150px; }

  .dark-overlay {
    background-color: rgba(0, 0, 0, 0.3);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    min-height: 700px; }

  .card-form {
    opacity: 0.8; }

  .home-inner .fa {
    color: #008ed6;
    background: white;
    padding: 4px;
    border-radius: 5px;
    font-size: 30px; }

  #explore-section .fa {
    color: #fff;
    background: #333;
    border-radius: 5px;
    font-size: 30px; }

  footer {
   color: white;
  }

</style>
