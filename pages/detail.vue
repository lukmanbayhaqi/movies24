<template>
  <div
    @scroll="handleScroll"
    class="p-5 h-100"
    style="background-color: rgba(46, 55, 64, 0.84); min-height: 100vh; margin-top: 10vh;"
  >
    <!-- Container -->
    <div class="row d-flex justify-content-around align-items-center">
      <b-spinner v-if="isLoading" variant="danger" />

      <div class="col-lg-12" v-else>
        <div class="row">
          <div
            class="col-lg-4 d-flex justify-content-center align-items-center flex-column"
          >
            <b-img
              class="detail-img"
              :src="`https://image.tmdb.org/t/p/w500/${detail.poster_path}`"
              :alt="detail.title"
            />
          </div>
          <div class="col-lg-8">
            <h1 class="mt-3">{{ detail.title }}</h1>
            <i class="mt-3">{{ detail.tagline }}</i>
            <hr />
            <div class="show-desktop-tablet">
              <section class="d-flex">
                <h6 class="mr-2">Genres :</h6>
                <section v-for="({ name }, i) in detail.genres" :key="i">
                  <h6 class="mr-1">
                    {{ name }}{{ i !== detail.genres.length - 1 ? ", " : "" }}
                  </h6>
                </section>
              </section>
            </div>
            <div class="show-only-mobile">
              <section>
                <h6 class="mr-2">Genres :</h6>
                <div class="d-flex">
                  <section v-for="({ name }, i) in detail.genres" :key="i">
                    <h6 class="mr-1">
                      {{ name }}{{ i !== detail.genres.length - 1 ? ", " : "" }}
                    </h6>
                  </section>
                </div>
              </section>
            </div>
            <hr />
            <h6>
              Release Date : {{ formatDate(detail.release_date) }}
              {{
                detail.production_countries.length > 0
                  ? ` (${detail.production_countries[0].iso_3166_1})`
                  : ""
              }}
            </h6>
            <hr />
            <h6>Duration : {{ detail.runtime }}</h6>
            <hr />
            <h6>Popularity : {{ detail.popularity }}</h6>
            <hr />
            <div class="show-desktop-tablet">
              <section class="d-flex">
                <h6 class="mr-1">Production Companies :</h6>
                <section
                  v-for="({ name }, i) in detail.production_companies"
                  :key="i"
                >
                  <h6>
                    {{ name }}
                    {{
                      i !== detail.production_companies.length - 1 ? ", " : ""
                    }}
                  </h6>
                </section>
              </section>
            </div>
            <div class="show-only-mobile">
              <section>
                <h6 class="mr-1">Production Companies :</h6>
                <section
                  v-for="({ name }, i) in detail.production_companies"
                  :key="i"
                >
                  <h6>
                    {{ name }}
                    {{
                      i !== detail.production_companies.length - 1 ? ", " : ""
                    }}
                  </h6>
                </section>
              </section>
            </div>
            <hr />
            <h6>Status : {{ detail.status }}</h6>
            <hr />
            <h6>
              Original Language :
              {{
                detail.spoken_languages.length > 0
                  ? ` ${detail.spoken_languages[0].english_name}`
                  : "-"
              }}
            </h6>
            <hr />
            <h6>Budget : ${{ formatNumber(detail.budget) }}</h6>
            <hr />
            <h6>Revenue : ${{ formatNumber(detail.revenue) }}</h6>
            <hr />
          </div>
        </div>
        <div class="row p-5 show-only-desktop">
          <h3 class="mb-3 w-100">Overview</h3>
          <h6>{{ detail.overview }}</h6>
        </div>
        <div class="row py-5 px-3 show-tablet-mobile">
          <h3 class="mb-3">Overview</h3>
          <h6>{{ detail.overview }}</h6>
        </div>
      </div>
    </div>

    <!-- similiar movies  -->
    <h3 v-if="!isLoading" class="mb-3 ml-4">Similiar Movies</h3>
    <div
      v-if="!isLoading"
      class="w-100 d-flex flex-wrap justify-content-around"
    >
      <div
        class="my-card mb-5"
        v-for="({ title, poster_path, id }, i) in returnSimiliarMovies"
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
            <b class="movie-title-similiar text-center">
              <a :href="detailMovie(id, true)" target="_blank">
                {{ title }}
              </a>
            </b>
          </h5>
        </div>
      </div>
    </div>
    <div
      v-if="!isLoading"
      class="d-flex justify-content-center align-items-center w-100"
    >
      <b-button
        v-if="!isShowMore"
        pill
        variant="info"
        @click="() => (isShowMore = true)"
      >
        Show More
      </b-button>
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
import moment from "moment";

export default {
  layout: "main",
  name: "Detail",
  data: () => ({
    isLoading: true,
    detail: {},
    similiarMovies: [],
    showChevronUp: false,
    isShowMore: false,
    titleHead: "Movies24",
    metaHead: [
      {
        hid: "keywords",
        name: "keywords",
        content: "Movies24 Lukman Bayhaqi"
      },
      {
        hid: "description",
        name: "description",
        content:
          "List movies using TMDB API that show to you now playing movies around the world created by Lukman Bayhaqi"
      }
    ]
  }),
  head() {
    return {
      title: this.titleHead,
      meta: this.metaHead
    };
  },
  created() {
    window.scrollTo(0, 0);
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  mounted() {
    if (
      JSON.stringify(this.$route.query) === "{}" ||
      !this.$route.query.id ||
      this.$route.query.id === ""
    )
      this.$router.push("/");
    else this.fetchDetailMovie();
  },
  computed: {
    returnSimiliarMovies() {
      if (this.isShowMore) return this.similiarMovies;

      return this.similiarMovies.slice(0, 5);
    }
  },
  methods: {
    fetchDetailMovie() {
      this.isLoading = true;
      get(
        `https://api.themoviedb.org/3/movie/${this.$route.query.id}?api_key=5aeb53d2e95dd778417b0eda692a733e&language=en-US`
      )
        .then(({ data }) => {
          let hour = 0;

          for (let i = 1; i < 24; i++) {
            if (data.runtime / i > 60) hour++;
          }

          data.runtime =
            hour > 0
              ? `${hour} hour ${data.runtime - 60 * hour} minute`
              : `${data.runtime} minute`;

          this.detail = data;
          this.titleHead = `Movies24 - ${data.title}`;
          this.metaHead = [
            {
              hid: "keywords",
              name: "keywords",
              content: `Film ${data.title}`
            },
            {
              hid: "description",
              name: "description",
              content: data.overview
            }
          ];

          return get(
            `https://api.themoviedb.org/3/movie/${this.$route.query.id}/similar?api_key=5aeb53d2e95dd778417b0eda692a733e&page=1`
          );
        })
        .then(({ data }) => {
          this.similiarMovies = data.results;
        })
        .catch(console.error)
        .finally(() => (this.isLoading = false));
    },
    handleScroll(e) {
      let { scrollTop } = e.srcElement.scrollingElement;

      if (scrollTop > 300) this.showChevronUp = true;
      else this.showChevronUp = false;
    },
    handleScrollToTop() {
      let scroll = document.getElementById("app");

      scroll?.scrollIntoView({
        block: "start",
        behavior: "smooth"
      });
    },
    detailMovie(id, isHref) {
      if (isHref) return `${window.location.origin}/detail?id=${id}`;
      else window.open(`${window.location.origin}/detail?id=${id}`, "_blank");
    },
    formatNumber(num) {
      if (!!!num) return 0;

      let parts = num.toString().split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return parts.join(".");
    },
    formatDate(date) {
      if (!date) return "-";

      return moment(date).format("D MMMM YYYY");
    }
  }
};
</script>

<style lang="scss">
.detail-img {
  height: 60vh;
  border-radius: 5px;
}

.movie-title-similiar {
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
