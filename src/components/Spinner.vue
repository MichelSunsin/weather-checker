<template>
  <div class="container" v-if="this.$store.state.isLoading === true">
    <img src="../assets/logo.png" alt="Loading..." />
    <h2>Fetching data...</h2>
  </div>
</template>

<style scoped>
.container {
  padding: 20px;
  margin: 0 auto;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.5);
}
img {
  width: 100px;
  height: 100px;
}

h2 {
  color: white;
  text-shadow: 2px 2px rgba(0, 0, 0, 0.5);
}
</style>
