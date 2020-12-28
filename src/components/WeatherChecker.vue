<template>
  <div
    class="main-container"
    :class="currentWeather && (temp > 20 ? 'warm' : 'cold')"
  >
    <div style="display:flex;">
      <input
        class="search-input"
        type="text"
        placeholder="Type in a city name"
        v-model="query"
        @keypress.enter="fetchWeather"
      />
      <button @click="clearWeather" v-show="isLocalWeather === false">
        Clear
      </button>
      <button
        class="search-button"
        :disabled="query.length === 0"
        @click="fetchWeather"
      >
        Search
      </button>
    </div>
    <Error />
    <div class="weather-container" v-if="currentWeather !== null">
      <div class="weather-box white-faded-background">
        <h2>
          {{ city }}
          <span v-if="currentWeather !== null">,</span>
          {{ country }}
        </h2>
        <h1>{{ temp }}ºC</h1>
        <h2>{{ new Date().toLocaleDateString() }}</h2>
      </div>
      <div
        class="description-box white-faded-background"
        v-if="typeof currentWeather.weather !== 'undefined'"
      >
        <div class="description-box-header">
          <img class="icon" :src="weatherIcon" :alt="weatherDescription" />
          <h2>{{ weatherTitle }}</h2>
        </div>
        <div class="description-box-body">
          <h3>{{ weatherDescription }}</h3>
        </div>
      </div>
    </div>
    <Info v-if="currentWeather === null && isLoading === false" />
    <Spinner />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Spinner from './Spinner'
import Error from './Error'
import Info from './Info'

export default {
  name: 'WeatherChecker',
  components: {
    Spinner,
    Error,
    Info,
  },
  mounted() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(response => {
        this.$store.state.currentPosition = response
        this.$store.dispatch('fetchLocalWeather')
      })
    }
  },
  computed: {
    query: {
      get() {
        return this.$store.state.query
      },
      set(value) {
        this.$store.commit('setQuery', value)
      },
    },
    ...mapGetters([
      'isLoading',
      'isLocalWeather',
      'currentWeather',
      'temp',
      'city',
      'country',
      'weatherIcon',
      'weatherTitle',
      'weatherDescription',
    ]),
  },
  methods: {
    ...mapActions(['fetchWeather', 'fetchLocalWeather', 'clearWeather']),
  },
}
</script>
