/* eslint-disable vue/component-definition-name-casing */

// app
import App from './App.vue';
import { createApp } from "vue";
import router from "../router.js";

const app = createApp(App);
app.use(router);

// styles
import './styles.js';

// components
import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/lara-light-purple/theme.css';

app.use(PrimeVue);

// font-awesome
import './fontAwsome.js';
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

app.component('font-awesome-icon', FontAwesomeIcon);

// axios
import VueAxios from "vue-axios";
import axios from "axios";

app.use(VueAxios, axios);

export default app;