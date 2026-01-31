import axios from "axios";

const web = axios.create({
  withCredentials: true,
  withXSRFToken: true,
  baseURL: 'http://localhost:8000/'
});

const api = axios.create({
  withCredentials: true,
  withXSRFToken: true,
  baseURL: 'http://localhost:8000/api/'
});

export {
  web,
  api,
};