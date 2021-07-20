<template>
  <div>
    <!-- Container -->
    <div
      class="w-100 d-flex flex-wrap justify-content-around pt-5"
      style="margin-top: 10vh;"
      id="container-scroll"
      @scroll="handleScroll"
    >
      <div
        class="my-card mb-5"
        v-for="({ title, favorite, poster_path }, i) in returnMovies"
        :key="i"
      >
        <b-card
          class="p-3"
          :img-src="`https://image.tmdb.org/t/p/w500/${poster_path}`"
          :img-alt="title"
          overlay
          @click="() => $router.push(`/detail/${returnIndexPokemon()}`)"
        />
        <div class="d-flex justify-content-around align-items-center my-2">
          <h5>
            <b class="movie-title-home">
              <router-link :to="`/detail/${returnIndexPokemon()}`">
                {{ title }}
              </router-link>
            </b>
          </h5>

          <h5>
            <b-icon
              :id="favorite ? 'remove-from-favorite' : 'add-to-favorite'"
              style="cursor: pointer;"
              :icon="favorite ? 'suit-heart-fill' : 'suit-heart'"
              :color="favorite ? 'red' : 'orangered'"
              @click="addToFavorite(i)"
              v-b-tooltip.hover
              :title="favorite ? 'remove from favorite' : 'add to favorite'"
            />
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

    <b-tooltip target="add-to-favorite" triggers="hover">
      Add To Favorite
    </b-tooltip>
    <b-tooltip target="remove-from-favorite" triggers="hover">
      Remove From Favorite
    </b-tooltip>
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
      // return this.$store.state.movieList;
      return this.movieList;
    }
  },
  methods: {
    addToFavorite(index) {
      this.$store.commit("setFavorite", { index });
    },
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
          .dispatch("loadMoreMovies")
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
    returnIndexPokemon(url) {
      // const arr = url.split("/");
      // return arr[arr.length - 2];
    }
  }
};
</script>

<style lang="scss">
.movie-title-home {
  width: 10vw;
  display: block;
  line-height: 1em;

  text-shadow: 0 2px 3px #000;
  line-height: 1em;

  a {
    color: #fff !important;
  }
}
</style>
