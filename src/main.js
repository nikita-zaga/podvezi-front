import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import Toast from "vue-toastification";
import "./index.css";

const app = createApp(App);
app.use(router);
app.use(Toast, {
    position: "top-right", // Позиция окна уведомлений
    timeout: 5000,         // Время отображения (в мс)
    closeOnClick: true,    // Закрытие по клику
    pauseOnFocusLoss: true,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 0.6,
    showCloseButtonOnHover: false,
    hideProgressBar: true,
    icon: true,
    rtl: false,
});
app.mount("#app");
