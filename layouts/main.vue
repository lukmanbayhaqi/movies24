<template>
  <div
    id="app"
    style="background-color: rgba(46, 55, 64, 0.84); min-height: 100vh;"
  >
    <Navbar />
    <Nuxt />
    <div
      class="d-flex justify-content-center align-items-center w-100"
      v-if="isLoading"
    >
      <b-spinner variant="danger" label="loading"></b-spinner>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    isLoading: false
  })
};
</script>
