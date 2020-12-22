<template>
  <div class="container" v-if="this.$store.state.error.length > 0">
    <p class="error">
      {{ this.$store.state.error }}
    </p>
  </div>
</template>

<style scoped>
.container {
  padding: 10px;
  margin: 0 auto;
  font-weight: bold;
  background: rgba(255, 255, 255, 1);
  color: red;
  border-radius: 20px;
}
</style>
