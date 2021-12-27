import { createApp } from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import 'normalize.css';
// import 'element-plus/dist/index.css';
import { globalRegister } from './global';

createApp(App).use(router).use(globalRegister).mount('#app');
