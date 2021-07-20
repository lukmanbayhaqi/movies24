<template>
  <div
    class="h-100"
    style="background-color: rgba(46, 55, 64, 0.84); min-height: 100vh;"
  >
    <!-- Container -->
    <div
      class="w-100 d-flex flex-wrap justify-content-around pt-5"
      style="margin-top: 10vh;"
      id="container-scroll"
      @scroll="handleScroll"
    >
      <div
        class="my-card mb-5"
        v-for="({ title, poster_path, id }, i) in returnMovies"
        :key="i"
      >
        <b-card
          class="p-3"
          :img-src="`https://image.tmdb.org/t/p/w500/${poster_path}`"
          :img-alt="title"
          overlay
          @click="detailMovie(id)"
        />
        <div class="d-flex justify-content-around align-items-center my-2">
          <h5>
            <b class="movie-title-home text-center">
              <a :href="detailMovie(id, true)" target="_blank">
                {{ title }}
              </a>
            </b>
          </h5>
        </div>
      </div>
    </div>

    <!-- Loading -->
    <div class="w-100 d-flex justify-content-center pb-5">
      <b-spinner v-if="isLoading" variant="primary" type="grow" />
    </div>

    <!-- Floating Action Button -->
    <div class="btn-group-fab" role="group" aria-label="FAB Menu">
      <button
        v-if="showChevronUp"
        type="button"
        class="btn btn-main btn-primary has-tooltip"
        data-placement="left"
        title="Menu"
        @click="handleScrollToTop"
      >
        <h4><b-icon icon="chevron-up" color="white" /></h4>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  layout: "main",
  data: () => ({
    isLoading: false,
    showChevronUp: false,
    movieList: []
  }),
  created() {
    window.scrollTo(0, 0);
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  computed: {
    returnMovies() {
      return this.$store.state.movie.movieList;
    }
  },
  methods: {
    handleScroll(e) {
      let {
        scrollTop,
        clientHeight,
        scrollHeight
      } = e.srcElement.scrollingElement;

      if (scrollTop > 300) this.showChevronUp = true;
      else this.showChevronUp = false;

      if (scrollTop + clientHeight >= scrollHeight - 1 && !this.isLoading) {
        this.isLoading = true;

        this.$store
          .dispatch("movie/loadMoreMovies")
          .then(() => {})
          .catch(() => {})
          .finally(() => (this.isLoading = false));
      }
    },
    handleScrollToTop() {
      let scroll = document.getElementById("app");

      scroll?.scrollIntoView({
        block: "start",
        behavior: "smooth",
        inline: "nearest"
      });
    },
    detailMovie(id, isHref) {
      if (isHref) return `${window.location.origin}/detail?id=${id}`;
      else window.open(`${window.location.origin}/detail?id=${id}`, "_blank");
    }
  }
};
</script>

<style lang="scss">
.movie-title-home {
  color: #fff !important;
  display: block;
  text-shadow: 0 2px 3px #000;
  line-height: 1em;

  width: 70vw;

  @media only screen and (min-width: 600px) {
    width: 35vw;
  }
  @media only screen and (min-width: 800px) {
    width: 15vw;
  }
}
</style>
