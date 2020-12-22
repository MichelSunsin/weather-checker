<template>
  <div
    class="main-container"
    :class="currentWeather && (temp > 20 ? 'warm' : 'cold')"
  >
    <div style="display:flex;" class="search-box">
      <input
        class="search-input"
        type="text"
        placeholder="Type in a city name"
        v-model="query"
        @keypress.enter="fetchWeather"
      />
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
      <div class="location-box">
        <p>
          {{ city }}
          <span v-if="currentWeather !== null">,</span>
          {{ country }}
        </p>
      </div>
      <div class="weather-box">
        <h1>{{ temp }}ºC</h1>
      </div>
      <div
        class="description-box"
        v-if="typeof currentWeather.weather !== 'undefined'"
      >
        <img class="icon" :src="weatherIcon" :alt="weatherDescription" />
        <h2>{{ weatherTitle }}</h2>
        <p>{{ weatherDescription }}</p>
        <p>{{ new Date().toLocaleDateString() }}</p>
      </div>
    </div>
    <Spinner />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Spinner from './Spinner'
import Error from './Error'

export default {
  name: 'WeatherChecker',
  components: {
    Spinner,
    Error,
  },
  mounted() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(response =>
        this.$store.dispatch('fetchLocalWeather', response)
      )
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
    ...mapActions(['fetchWeather', 'fetchLocalWeather']),
  },
}
</script>

<style scoped>
.main-container {
  color: white;
  margin: auto;
  padding: 1rem;
  max-width: 500px;
  background: linear-gradient(#42b983, #1e6645);
  border-radius: 1rem;
  transition: 0.5s;
}

.warm {
  background: bottom/cover url('../assets/warm-bg.jpg');
  /* background-image: url('../assets/warm-bg.jpg');
  background-position: bottom;
  background-size: cover; */
}

.cold {
  background: bottom/cover url('../assets/cold-bg.png');
  /* background-image: url('../assets/cold-bg.png');
  background-position: bottom;
  background-size: cover; */
}

.search-input {
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  flex: auto;
  border: none;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
}

button {
  display: block;
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  flex: 1;
  border: none;
}

.search-button {
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  background-color: #d7d7d7;
}

.location-box {
  font-weight: bold;
  font-size: 1.5rem;
  text-shadow: 3px 3px rgba(0, 0, 0, 0.5);
}

.weather-box {
  padding: 10px;
  margin: 10px 100px;
  border-radius: 1rem;
  background-color: rgba(255, 255, 255, 0.5);
  box-shadow: 5px 5px rgba(0, 0, 0, 0.5);
}

.description-box {
  color: black;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 5px;
  padding: 0 20px 15px 20px;
  margin: 0 120px;
  box-shadow: 1px 1px rgba(0, 0, 0, 0.5);
}

.description-box h2 {
  color: white;
  text-shadow: 2px 2px rgba(0, 0, 0, 0.75);
  font-style: italic;
}

.icon {
  border-bottom: 1px solid #000;
  margin-bottom: 10px;
}

h1 {
  font-size: 6rem;
  text-shadow: 5px 5px rgba(0, 0, 0, 0.75);
}

p.error {
  color: red;
}

@media (max-width: 500px) {
  .main-container {
    border-radius: 0;
    height: 100%;
  }
  .weather-box {
    margin: 25px auto;
  }

  .description-box {
    margin: 0 50px;
  }

  h1 {
    font-size: 5rem;
  }
}
</style>
