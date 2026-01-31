import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null,
  }),
  actions:
  {
    async login(email, password)
    {
      // const res = await axios.post('http://localhost:8000/api/login', { email, password });
      await axios.get('http://localhost:8000/sanctum/csrf-cookie'); // para settar a cookie, nao é endpoint api
      // const res = await api.post('/login', { email, password });
      const res = await axios.post('http://localhost:8000/login', { email, password });
      console.log("dados do login", res.data);
    },
    async logout()
    {
      await axios.post('http://localhost:8000/logout');
    },
    getAuthToken()
    {
      const token = localStorage.getItem('token');
      return token;
    }
  },
})