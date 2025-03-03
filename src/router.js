import { createRouter, createWebHistory } from "vue-router";
import Login from "./components/Login.vue";
import Registration from "./components/Registration.vue";
import Order from "./components/Order.vue";

const routes = [
    { path: "/login", component: Login },
    { path: "/registration", component: Registration },
    { path: "/", redirect: "/login" },
    { path: "/orders", component: Order }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
