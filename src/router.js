import { createRouter, createWebHistory } from "vue-router";
import Login from "./components/Login.vue";
import Registration from "./components/Registration.vue";
import Trip from "./components/Trip.vue";

const routes = [
    { path: "/login", component: Login },
    { path: "/registration", component: Registration },
    { path: "/", redirect: "/login" },
    { path: "/trips", component: Trip }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
