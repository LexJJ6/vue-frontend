import { defineStore } from 'pinia'
import axios from 'axios'

// a utilizar localstorage de momento

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null,
  }),
  actions:
  {
    async login(email, password)
    {
      const res = await axios.post('http://localhost:8000/api/login', { email, password });
      console.log("dados do login", res.data);
      this.token = res.data.token;
      this.user = res.data.user;

      localStorage.setItem('token', this.token);

      // configura header para futuras requests
      // axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
    },
    async logout()
    {
      await axios.post('http://localhost:8000/api/logout', null, {
        headers: { Authorization: `Bearer ${this.token}` }
      });
      this.token = null;
      this.user = null;
      // delete axios.defaults.headers.common['Authorization']

      localStorage.removeItem('token');
    },
    getAuthToken()
    {
      // return this.token;
      const token = localStorage.getItem('token');
      return token;
    }
  },
})