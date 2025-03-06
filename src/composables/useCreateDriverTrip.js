import { reactive } from "vue";
import { useRouter } from "vue-router";
import { getAuthToken } from "../utils/auth";

export function useCreateDriverTrip() {
    // Создаём реактивный объект с полями
    const tripData = reactive({
        route: "",
        date: "",
        price: "",
        countFreePlaces: "",
    });

    const router = useRouter();

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
                alert("Поездка успешно создана!");
                router.push("/orders"); // Перенаправляем на /orders
            } else {
                const error = await response.json();
                alert(`Ошибка: ${error.message || "Не удалось создать поездку"}`);
            }
        } catch (err) {
            console.log("Ошибка при создании поездки", err);
            alert("Ошибка сервера");
        }
    };

    return { tripData, handleSubmit };
}