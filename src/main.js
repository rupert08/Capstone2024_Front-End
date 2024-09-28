import { createApp } from 'vue'
import App from './App.vue'
import router from './routes'
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';

const app = createApp(App);

app.config.globalProperties.user = {
  isLoggedIn: false,
  isAdmin: true,
  name: ''
};

app.config.globalProperties.cartTotal = 0;

app.use(router).mount('#app');