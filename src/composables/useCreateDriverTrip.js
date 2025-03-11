import { reactive } from "vue";
import { getAuthToken } from "../utils/auth";
import {useToast} from "vue-toastification";
import 'vue-toastification/dist/index.css'

export function useCreateDriverTrip() {
    // Создаём реактивный объект с полями
    const tripData = reactive({
        route: "",
        date: "",
        price: "",
        countFreePlaces: "",
    });
    const toast = useToast();

    const handleSubmit = async () => {
        console.log("Начало handleSubmit в useCreateDriverTrip.js");

        // Формируем объект для отправки из tripData
        const body = {
            route: tripData.route,
            date: tripData.date,
            price: tripData.price,
            countFreePlaces: tripData.countFreePlaces,
        };

        console.log("Отправляемые данные:", body);

        try {
            const token = getAuthToken();

            const response = await fetch("http://localhost:8080/trip/create/driver", {
                method: "POST",
                headers: { "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`},
                body: JSON.stringify(body), // Отправляем собранные данные
            });

            if (response.ok) {
                toast.success("Поездка успешно добавлена!", { timeout: 3000 });
                console.log("Успешный запрос, показываем уведомление");
                return true;
            } else {
                toast.error("Ошибка при создании поездки", { timeout: 3000 });
                console.log("Ошибка при создании поездки", err);
                return false;
            }
        } catch (err) {
            toast.error("Ошибка при создании поездки", { timeout: 3000 });
            console.log("Ошибка при создании поездки", err);
            return false;
        }
    };

    return { tripData, handleSubmit };
}