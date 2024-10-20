import { createApp } from 'vue'
import App from './App.vue'
import router from './routes'
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';
import { registerLicense } from '@syncfusion/ej2-base';
// import 'ant-design-vue/dist/antd.css';

const app = createApp(App);

registerLicense('Ngo9BigBOggjHTQxAR8/V1NDaF5cWGFCf1FpRmJGdld5fUVHYVZUTXxaS00DNHVRdkdnWH9fcnRSQmJcUkJ0Vks=');


app.config.globalProperties.user = {
  isLoggedIn: false,
  isAdmin: true,
  name: ''
};

app.config.globalProperties.cartTotal = 0;

app.use(router).mount('#app');