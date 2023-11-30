/* eslint-disable vue/component-definition-name-casing */

// app
import App from './App.vue';
import {createApp} from "vue";
import router from "../router.js";

const app = createApp(App);
app.use(router);

// styles
import './styles.js';

// components
import VueSimpleContextMenu from 'vue-simple-context-menu';
import 'vue-simple-context-menu/dist/vue-simple-context-menu.css';

app.component('vue-simple-context-menu', VueSimpleContextMenu);

// font-awesome
import './fontAwsome.js';
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

app.component('font-awesome-icon', FontAwesomeIcon);

// axios
import VueAxios from "vue-axios";
import axios from "axios";

app.use(VueAxios, axios);

export default app;