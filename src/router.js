import {createRouter, createWebHistory} from "vue-router";
import MainMap from "./components/MainMap.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            component: MainMap
        }
    ]
    
});

export default router