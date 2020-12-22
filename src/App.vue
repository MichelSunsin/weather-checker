<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
    <WeatherChecker />
  </div>
</template>

<script>
import WeatherChecker from './components/WeatherChecker.vue'
import store from './store/WeatherStore'

export default {
  name: 'App',
  store,
  components: {
    WeatherChecker,
  },
}
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

#app {
  padding: 20px;
  height: 100vh;
  min-height: 500px;
}

@media (max-width: 500px) {
  #app {
    padding: 0;
  }
}
</style>
