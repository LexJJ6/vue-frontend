import './assets/main.css'
import router from './router';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';

const app = createApp(App);

app.use(router);
app.use(Toast);
app.use(createPinia());

app.mount('#app');
