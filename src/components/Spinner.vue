<template>
  <div
    class="spinner-container white-faded-background"
    v-show="this.$store.state.isLoading === true"
  >
    <img src="../assets/logo.png" alt="Loading..." />
    <h2>Fetching data...</h2>
  </div>
</template>
