import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',  // Adicione '/api' aqui
  withCredentials: false,
});

// Adicione um interceptor para logging
api.interceptors.request.use(request => {
  console.log('Starting Request', request)
  return request
})

api.interceptors.response.use(response => {
  console.log('Response:', response)
  return response
}, error => {
  console.log('Response Error:', error)
  return Promise.reject(error)
})

export default api;