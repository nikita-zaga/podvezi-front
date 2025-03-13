<template>
  <form @submit.prevent="submitForm">
    <h2 class="text-xl font-semibold mb-4">Добавить поездку</h2>

    <!-- Поле выбора маршрута -->
    <div class="mb-4">
      <label for="route" class="block mb-2 text-sm font-medium">Маршрут</label>
      <select
          v-model="tripData.routeSystemName"
          id="route"
          class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500"
      >
        <option value="" disabled selected>Выберите маршрут</option>
        <option v-for="route in routes" :key="route.systemName" :value="route.systemName">
          {{ route.labelName }}
        </option>
      </select>
    </div>

    <!-- Поле ввода даты и времени -->
    <div class="mb-4">
      <label for="datetime" class="block mb-2 text-sm font-medium">Дата и время</label>
      <input
          v-model="tripData.date"
          type="datetime-local"
          id="datetime"
          class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500"
      />
    </div>

    <div class="mb-4">
      <label for="price" class="block mb-2 text-sm font-medium">Цена</label>
      <input
          v-model="tripData.price"
          type="text"
          id="price"
          class="border border-gray-300 rounded-lg px-3 py-2 w-full"
          placeholder="Введите цену за 1 пассажира"
      />
    </div>

    <div class="mb-4">
      <label for="count-free-places" class="block mb-2 text-sm font-medium">Кол-во свободных мест</label>
      <input
          v-model="tripData.countFreePlaces"
          type="text"
          id="count-free-places"
          class="border border-gray-300 rounded-lg px-3 py-2 w-full"
          placeholder="Введите количество свободных мест"
      />
    </div>

    <div class="flex justify-end">
      <button
          type="button"
          @click="$emit('close')"
          class="px-4 py-2 border border-gray-400 rounded-lg mr-2 hover:bg-gray-100"
      >
        Отмена
      </button>
      <button type="submit" :disabled="loading" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        {{ loading ? "Создание..." : "Создать поездку" }}
      </button>
    </div>
  </form>
</template>

<script>
import {useCreateDriverTrip} from "../composables/useCreateDriverTrip.js";
import {useRoutes} from "../composables/useRoutes.js";
import {onMounted } from "vue";

export default {
  emits: ["close"],
  setup(_, { emit }) {
    const { tripData, handleSubmit } = useCreateDriverTrip();

    const { routes, fetchRoutes, loadingRoutes, error } = useRoutes();

    onMounted(() => {
      fetchRoutes();
    });

    const submitForm = async () => {
      const success = await handleSubmit();
      if (success) {
        emit("close");
      }
    };

    return {
      tripData,
      routes,
      fetchRoutes,
      loadingRoutes,
      error,
      submitForm,
    };
  },
};
</script>

<style scoped>

</style>