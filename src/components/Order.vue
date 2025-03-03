<template>
  <div class="min-h-screen w-screen bg-gray-100 p-4">
    <!-- Заголовок страницы -->
    <header class="text-center mb-6">
      <h1 class="text-3xl font-bold text-gray-800">Поиск объявлений о поездках</h1>
      <p class="text-gray-600">Выберите направления, чтобы начать поиск.</p>
    </header>

    <!-- Форма выбора направлений -->
    <section class="bg-white shadow rounded p-6 mb-8 max-w-2xl mx-auto">
      <h2 class="text-xl font-medium text-gray-700 mb-4">Выберите направления</h2>
      <form @submit.prevent="searchTrips">
        <div class="flex flex-col space-y-4">
          <div>
            <label for="from" class="block text-gray-600 font-medium mb-1">Откуда</label>
            <input
                id="from"
                v-model="from"
                type="text"
                placeholder="Введите город отправления"
                class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
          <div>
            <label for="to" class="block text-gray-600 font-medium mb-1">Куда</label>
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
    </section>

    <!-- Список активных объявлений -->
    <section>
      <h2 class="text-xl font-medium text-gray-700 mb-4 text-center">Активные объявления</h2>
      <div v-if="loading" class="text-center text-gray-500">Загрузка...</div>
      <div v-else-if="trips.length === 0" class="text-center text-gray-500">
        Пока нет активных объявлений.
      </div>
      <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
            v-for="(trip, index) in trips"
            :key="index"
            class="bg-white shadow rounded p-4"
        >
          <h3 class="text-lg font-semibold text-gray-800">{{ trip.title }}</h3>
          <p class="text-gray-600">Дата: {{ trip.date }}</p>
          <p class="text-gray-600">Направление: {{ trip.direction }}</p>
          <p class="text-sm text-gray-500">Цена: {{ trip.price }} ₽</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import useUserOrder from '../composables/userOrders';

export default {
  setup() {
    // Импорт логики
    const {from, to, trips, loading, searchTrips} = useUserOrder();

    // Экспорт данных и методов в шаблон
    return {
      from,
      to,
      trips,
      loading,
      searchTrips
    };
  },
};
</script>

<style scoped>
/* Добавлено минимальное оформление */
</style>