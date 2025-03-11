<template>
  <div class="min-h-screen w-screen bg-gray-100 p-4">

    <!-- Иконка выхода -->
    <button @click="logout" class="logout-button" title="Выйти">
      <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
          class="logout-icon"
      >
        <path fill-rule="evenodd" d="M3 3.75a.75.75 0 01.75-.75h12a.75.75 0 010 1.5H3.75v16.5h12a.75.75 0 010 1.5h-12A1.75 1.75 0 012 20.25V3.75z" clip-rule="evenodd" />
        <path fill-rule="evenodd" d="M21.03 11.47a.75.75 0 010 1.06l-4.752 4.752a.75.75 0 01-1.06-1.06l3.22-3.22H9a.75.75 0 010-1.5h9.44l-3.22-3.22a.75.75 0 011.06-1.06l4.75 4.752z" clip-rule="evenodd" />
      </svg>
    </button>

    <!-- Заголовок страницы -->
    <header class="text-center mb-6">
      <h1 class="text-3xl font-bold text-gray-800">Поиск объявлений о поездках</h1>
      <p class="text-gray-600">Выберите направления, чтобы начать поиск.</p>
    </header>

    <!-- Контейнер с формой и кнопкой -->
    <section
        class="flex items-start justify-between bg-white shadow rounded p-6 mb-8 max-w-4xl mx-auto"
    >
      <!-- Форма выбора направлений -->
      <div class="flex-1">
        <h2 class="text-xl font-medium text-gray-700 mb-4">
          Выберите направления
        </h2>
        <form @submit.prevent="searchTrips">
          <div class="flex flex-col space-y-4">
            <div>
              <label
                  for="from"
                  class="block text-gray-600 font-medium mb-1"
              >Откуда</label>
              <input
                  id="from"
                  v-model="from"
                  type="text"
                  placeholder="Введите город отправления"
                  class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>
            <div>
              <label
                  for="to"
                  class="block text-gray-600 font-medium mb-1"
              >Куда</label>
              <input
                  id="to"
                  v-model="to"
                  type="text"
                  placeholder="Введите город назначения"
                  class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>
            <button
                type="submit"
                class="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600 transition w-full"
            >
              Найти поездки
            </button>
          </div>
        </form>
      </div>

      <!-- Кнопка добавить поездку -->
      <button
          @click="openCreateTripForm"
          class="ml-4 flex items-center justify-center w-12 h-12 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition"
          title="Добавить поездку"
      >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
        >
          <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </button>
    </section>

    <!-- Модальное окно -->
    <div
        v-if="isFormVisible"
        class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50"
    >
      <div
          class="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg"
      >
        <button
            @click="closeCreateTripForm"
            class="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          ✖
        </button>
        <CreateDriverTrip @close="handleCloseEvent" />
      </div>
    </div>

    <!-- Список активных объявлений -->
    <section>
      <h2
          class="text-xl font-medium text-gray-700 mb-4 text-center"
      >Активные объявления</h2>
      <div
          v-if="loading"
          class="text-center text-gray-500"
      >Загрузка...</div>
      <div
          v-else-if="trips.length === 0"
          class="text-center text-gray-500"
      >
        Пока нет активных объявлений.
      </div>
      <div
          v-else
          class="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <div
            v-for="(trip, index) in trips"
            :key="index"
            class="bg-white shadow rounded p-4"
        >
          <h3>
            <span
                class="font-semibold text-gray-800"
            >Маршрут:</span> {{ trip.route }}
          </h3>
          <p class="text-gray-600">
            <span
                class="font-semibold text-gray-800"
            >Дата и время:</span> {{ new Date(trip.startTime).toLocaleString() }}
          </p>
          <p class="text-gray-600">
            <span
                class="font-semibold text-gray-800"
            >Цена:</span> {{ trip.price }} ₽
          </p>
          <p class="text-gray-600">
            <span
                class="font-semibold text-gray-800"
            >Свободных мест:</span> {{ trip.countFreePlaces }}
          </p>
          <p class="text-gray-600">
            <span
                class="font-semibold text-gray-800"
            >Водитель:</span> Опыт {{ trip.driverExperience }} лет, {{ trip.driverTrips }} поездок.
          </p>
          <p class="text-gray-600">
            <span
                class="font-semibold text-gray-800"
            >Машина:</span> {{ trip.carModel }} ({{ trip.carNumber }}, {{ trip.carColor }})
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import useUserOrder from '../composables/userOrders';
import { useAuth } from "../composables/useAuth";
import CreateDriverTrip from './CreateDriverTrip.vue';
import { ref, onMounted } from "vue";

export default {
  components: {
    CreateDriverTrip,
  },

  setup() {
    // Импорт логики
    const { from, to, trips, loading, searchTrips } = useUserOrder();
    const { logout } = useAuth();

    // Логика отображения модального окна
    const isFormVisible = ref(false);

    const openCreateTripForm = () => {
      isFormVisible.value = true;
    };

    const closeCreateTripForm = () => {
      isFormVisible.value = false;
    };

    const handleCloseEvent = () => {
      closeCreateTripForm(); // Закрываем модальное окно
      searchTrips(); // Обновляем список поездок
    };

    onMounted(() => {
      searchTrips(); // Загружаем данные при открытии страницы
    });

    // Экспорт данных и методов в шаблон
    return {
      logout,
      from,
      to,
      trips,
      loading,
      searchTrips,
      isFormVisible,
      openCreateTripForm,
      closeCreateTripForm,
      handleCloseEvent
    };
  },
};
</script>

<style scoped>
.logout-button {
  position: fixed;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 1000;
}

.logout-icon {
  width: 32px;
  height: 32px;
  color: #ff4d4f;
  transition: 0.2s ease-in-out;
}

.logout-button:hover .logout-icon {
  transform: scale(1.1);
  color: #ff3333;
}

</style>