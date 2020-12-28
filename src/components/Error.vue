<template>
  <div class="error-container" v-show="this.$store.state.error.length > 0">
    <p class="error">
      {{ this.$store.state.error }}
    </p>
  </div>
</template>
