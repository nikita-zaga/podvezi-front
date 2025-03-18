import { reactive, ref } from 'vue';
import {getAuthToken} from "../utils/auth.js";

export default function useUserTrip() {
    const trips = reactive([]); // Список активных поездок
    const loading = ref(false);
    const routeSystemName = ref("");

    // Функция для поиска поездок
    const searchTrips = async () => {
        loading.value = true;

        try {
            const token = getAuthToken();

            let url = new URL('http://localhost:8080/trip/trips');

            console.log("Данные от маршрута routeSystemName:", routeSystemName);
            if (routeSystemName.value) {
                url.searchParams.append("routeSystemName", routeSystemName.value);
            }

            const response = await fetch(url.toString(), {
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
        routeSystemName,
        trips,
        loading,
        searchTrips,
    };
}