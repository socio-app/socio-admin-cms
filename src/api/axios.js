import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://13.229.72.244:3001/',
})

export default instance
