<template>
  <b-navbar
    class="navbar-movies border-bottom border-danger"
    toggleable="lg"
    type="dark"
    variant="dark"
  >
    <b-navbar-brand @click="() => $router.push('/')">
      <b-img
        class="movies-logo"
        src="https://tvadvertising.uk/wp-content/uploads/2017/12/movies24.png"
        alt="movies"
      ></b-img>
    </b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item class="mt-2 ml-3" @click="changePage('/')">
          <div class="d-flex flex-row align-items-center">
            <h4 style="color: whitesmoke">
              <b class="d-flex justify-content-center align-items-center">
                <b-icon
                  icon="house-door-fill"
                  font-scale="0.9"
                  class="mr-2"
                  color="red"
                />
                Home
              </b>
            </h4>
          </div>
        </b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  name: "Navbar",
  methods: {
    changePage(route) {
      this.$router.push(route);
    }
  }
};
</script>

<style lang="scss">
.movies-logo {
  width: 50vw;

  @media only screen and (min-width: 600px) {
    width: 30vw;
  }
  @media only screen and (min-width: 800px) {
    width: 10vw;
  }
}

.navbar-movies {
  position: fixed !important;
  width: 100% !important;
  z-index: 100 !important;
  top: 0;
}
</style>
