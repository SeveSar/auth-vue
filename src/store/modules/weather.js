import axios from 'axios'
function serializeWeather (data) {
  return data.reduce((acc, item) => {
    if (item.dt_txt.split(' ')[1] === '12:00:00') {
      const dataObject = {
        date: serializeDate(item.dt_txt.split(' ')[0]),
        temp: String(item.main.temp).slice(0, 2),
        weather: item.weather[0].description,
        icon: `http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`
      }
      acc.push(dataObject)
    }
    return acc
  }, [])
}
function serializeDate (dateString) {
  const localDate = new Date(dateString).toLocaleDateString()
  return localDate.slice(0, 5)
}
const weatherStore = {
  state: {
    weather: null
  },
  getters: {
    weather: state => state.weather
  },
  mutations: {
    setDataWeather (state, payload) {
      state.weather = payload
    },
    clearWeather (state, payload) {
      state.weather = payload
    }
  },
  actions: {
    async fetchWeatherDays ({ commit, dispatch }, city) {
      try {
        const res = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=214bc67a16590ebddfe12876a3769d38`
        )
        const serializeData = serializeWeather(res.data.list)
        commit('setDataWeather', { city: res.data.city.name, data: serializeData })
        dispatch('clearNotice', { root: true })
      } catch (err) {
        dispatch('setAlert', { type: 'error', msg: 'Type correct city please' })
      }
    },
    clearWeather ({ commit }) {
      commit('clearWeather', null)
    }
  }
}
export default weatherStore
