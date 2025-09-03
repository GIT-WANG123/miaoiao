import axios from 'axios'

const api = axios.create({
  baseURL: 'http://39.97.33.178/api',
  timeout: 10000,
})

export const movieApi = {
  getNowPlaying: (cityId = 10) => api.get('/movieOnInfoList', { params: { cityId } }),
  getComingSoon: (cityId = 10) => api.get('/movieComingList', { params: { cityId } }),
  getCities: () => api.get('/cityList')
}