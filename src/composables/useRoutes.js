import { ref } from "vue";
import {getAuthToken} from "../utils/auth.js";

export function useRoutes() {
    const routes = ref([]);       // Хранилище маршрутов
    const loadingRoutes = ref(false); // Индикатор загрузки маршрутов
    const error = ref(null);      // Хранилище ошибок

    const fetchRoutes = async () => {
        loadingRoutes.value = true; // Устанавливаем индикатор загрузки
        error.value = null;         // Обнуляем ошибку
        try {
            const token = getAuthToken();

            const response = await fetch('http://localhost:8080/route/routes', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error("Ошибка при загрузке маршрутов");
            }
            const data = await response.json();
            // Преобразование данных в понятный формат
            routes.value = data.map(route => ({
                systemName: route.systemName,
                labelName: route.labelName,
            }));
        } catch (err) {
            console.error("Не удалось загрузить маршруты:", err);
            error.value = err.message; // Сохраняем ошибку
        } finally {
            loadingRoutes.value = false; // Завершаем загрузку
        }
    };

    return {
        routes,
        loadingRoutes,
        error,
        fetchRoutes,
    };
}