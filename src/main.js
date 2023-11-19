import App from './App.vue'
import router from "./router.js";
import axios from 'axios'
import VueAxios from 'vue-axios'
import { createApp } from 'vue'

import './assets/css/app.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faGear, faUser, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

library.add(faGear, faUser, faMagnifyingGlass);

const app = createApp(App);

app.component('font-awesome-icon', FontAwesomeIcon);

app.use(router);
app.use(VueAxios, axios);

app.mount('#app');
