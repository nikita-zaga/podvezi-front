import { reactive, ref } from 'vue';

export default function useUserOrder() {
    // Состояния, управляемые логикой
    const from = ref(""); // Город отправления
    const to = ref(""); // Город назначения
    const trips = reactive([]); // Список активных поездок
    const loading = ref(false); // Состояние загрузки

    // Функция для поиска поездок
    const searchTrips = () => {
        loading.value = true;

        // Имитация загрузки и получения данных
        setTimeout(() => {
            // Добавляем тестовые данные поездок, используя введенные направления
            trips.length = 0; // Очищаем массив перед поиском
            trips.push(
                {
                    title: "Поездка в Москву",
                    date: "2024-01-15",
                    direction: `${from.value} → ${to.value}`,
                    price: 1500
                },
                {
                    title: "Поездка в Санкт-Петербург",
                    date: "2024-01-20",
                    direction: `${from.value} → ${to.value}`,
                    price: 2000
                }
            );
            loading.value = false;
        }, 2000);
    };

    return {
        from,
        to,
        trips,
        loading,
        searchTrips,
    };
}