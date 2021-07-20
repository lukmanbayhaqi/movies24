<template>
  <div id="app">
    <Navbar />
    <Nuxt />
    <div
      class="d-flex justify-content-center align-items-center w-100"
      v-if="isLoading"
    >
      <b-spinner variant="danger" label="loading" />
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    isLoading: false
  }),
  mounted() {
    this.loadMovies();
  },
  methods: {
    loadMovies() {
      this.isLoading = true;

      this.$store
        .dispatch("movie/fetchMovies")
        .then()
        .catch(console.error)
        .finally(() => (this.isLoading = false));
    }
  }
};
</script>
