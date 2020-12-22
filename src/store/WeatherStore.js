import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const url = 'https://api.openweathermap.org/data/2.5/weather'
const appid = 'ee62225bdc4a5cd1d1be4c1409c2ee34'

const store = new Vuex.Store({
  state: {
    currentPosition: null,
    currentWeather: null,
    query: '',
    isLoading: false,
    error: '',
  },
  getters: {
    currentWeather: state => state.currentWeather,
    temp: state => Math.floor(state.currentWeather.main.temp),
    city: state => state.currentWeather.name,
    country: state => state.currentWeather.sys.country,
    weatherIcon: state =>
      `http://openweathermap.org/img/w/${state.currentWeather.weather[0].icon}.png`,
    weatherTitle: state => `${state.currentWeather.weather[0]?.main || ''}`,
    weatherDescription: state =>
      `${state.currentWeather.weather[0]?.description || ''}`,
  },
  mutations: {
    setQuery(state, value) {
      state.query = value
    },
    setWeather(state, weather) {
      state.isLoading = false
      state.currentWeather = weather
      state.currentWeather.name = state.currentWeather.name.trim() || ''
    },
    setError(state, message) {
      state.isLoading = false
      state.currentWeather = null
      state.error = message
      setInterval(() => {
        state.error = ''
      }, 5000)
    },
  },
  actions: {
    async fetchWeather(context) {
      if (this.state.query.length > 0) {
        this.state.isLoading = true
        this.state.error = ''
        this.state.currentWeather = null
        try {
          const response = await fetch(
            `${url}?q=${this.state.query}&units=metric&appid=${appid}`
          )

          const json = await response.json()

          if (response.ok) {
            context.commit('setWeather', json)
          } else {
            throw new Error(`Error ${json.cod} - ${json.message}`)
          }
        } catch (error) {
          error.message && context.commit('setError', error.message)
        }
      }
    },
    async fetchLocalWeather(context, { coords: { latitude, longitude } }) {
      if (latitude && longitude) {
        try {
          const response = await fetch(
            `${url}?lat=${latitude}&lon=${longitude}&units=metric&appid=${appid}`
          )

          const json = await response.json()

          if (response.ok) {
            context.commit('setWeather', json)
          } else {
            throw new Error(`Error ${json.cod} - ${json.message}`)
          }
        } catch (error) {
          error.message && context.commit('setError', error.message)
        }
      }
    },
  },
})

export default store
