<template>
  <div id="app">
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
