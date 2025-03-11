import { reactive, ref } from 'vue';
import {getAuthToken} from "../utils/auth.js";

export default function useUserOrder() {
    const from = ref(""); // Город отправления
    const to = ref(""); // Город назначения
    const trips = reactive([]); // Список активных поездок
    const loading = ref(false); // Состояние загрузки

    // Функция для поиска поездок
    const searchTrips = async () => {
        loading.value = true;

        try {
            const token = getAuthToken();

            const response = await fetch('http://localhost:8080/trip/trips', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Ошибка: ${response.statusText}`);
            }

            // Получаем данные из ответа
            const data = await response.json();

            // Обновляем список поездок
            trips.length = 0; // Очищаем массив перед обновлением

            data.forEach(trip => {
                trips.push({
                    route: trip.route,
                    startTime: trip.startTime,
                    price: trip.price,
                    countFreePlaces: trip.countFreePlaces,
                    driverExperience: trip.driver.experienceYears,
                    driverTrips: trip.driver.tripCount,
                    carModel: trip.driver.car.model,
                    carNumber: trip.driver.car.number,
                    carColor: trip.driver.car.color,
                });
            });
        } catch (error) {
            console.error("Ошибка при поиске поездок:", error);
        } finally {
            loading.value = false; // Выключаем индикатор загрузки
        }
    };

    return {
        from,
        to,
        trips,
        loading,
        searchTrips,
    };
}