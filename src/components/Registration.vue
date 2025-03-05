<template>
  <div class="flex justify-center items-center min-h-screen w-screen bg-gray-100">
    <form @submit.prevent="handleSubmit" class="bg-white p-6 rounded-lg shadow-md w-96">
      <h2 class="text-2xl font-bold mb-4 text-center">Регистрация</h2>

      <input
          type="text"
          class="border p-2 w-full mb-2 rounded"
          placeholder="Имя пользователя"
          v-model="username"
          required
      />

      <input
          type="password"
          class="border p-2 w-full mb-4 rounded"
          placeholder="Пароль"
          v-model="password"
          required
      />

      <Combobox v-model="selectedRole">
        <div class="relative mb-4">
          <ComboboxButton class="border p-2 w-full rounded flex justify-between items-center">
            {{ selectedRole?.name || "Выберите роль" }}
            <span class="ml-2">▼</span>
          </ComboboxButton>
          <ComboboxOptions class="absolute w-full bg-white border mt-1 rounded shadow">
            <ComboboxOption
                v-for="role in roles"
                :key="role.id"
                :value="role"
                class="p-2 hover:bg-gray-200 cursor-pointer"
            >
              {{ role.name }}
            </ComboboxOption>
          </ComboboxOptions>
        </div>
      </Combobox>

      <!-- Условное отображение дополнительной секции -->
      <div v-if="selectedRole?.id === 'driver'" class="border rounded p-4 mb-4 bg-gray-50">
        <h3 class="text-lg font-semibold mb-2">Дополнительная информация для водителя</h3>

        <div class="mb-2">
          <label for="drivingExperience" class="block mb-1 text-sm font-medium">Опыт вождения (годы)</label>
          <input
              type="number"
              id="drivingExperience"
              class="border p-2 w-full rounded"
              placeholder="Укажите годы опыта"
              v-model.number="driverInfo.experienceYears"
          />
        </div>

        <div class="mb-2">
          <label for="carModel" class="block mb-1 text-sm font-medium">Модель машины</label>
          <input
              type="text"
              id="carModel"
              class="border p-2 w-full rounded"
              placeholder="Пример: Toyota"
              v-model="driverInfo.car.model"
          />
        </div>

        <div class="mb-2">
          <label for="carNumber" class="block mb-1 text-sm font-medium">Номер машины</label>
          <input
              type="text"
              id="carNumber"
              class="border p-2 w-full rounded"
              placeholder="Пример: А123ВГ"
              v-model="driverInfo.car.number"
          />
        </div>

        <div>
          <label for="carColor" class="block mb-1 text-sm font-medium">Цвет машины</label>
          <input
              type="text"
              id="carColor"
              class="border p-2 w-full rounded"
              placeholder="Пример: Красный"
              v-model="driverInfo.car.color"
          />
        </div>
      </div>

      <button
          type="submit"
          class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded w-full transition"
      >
        Зарегистрироваться
      </button>
    </form>
  </div>
</template>

<script>
import {ref} from "vue";
import {useRegistration} from "../composables/useRegistration";
import {Combobox, ComboboxButton, ComboboxOptions, ComboboxOption} from "@headlessui/vue";

export default {
  components: {
    Combobox,
    ComboboxButton,
    ComboboxOptions,
    ComboboxOption,
  },
  setup() {
    const {username, password, selectedRole, driverInfo, handleSubmit} = useRegistration();

    const roles = ref([
      {id: "driver", name: "Водитель"},
      {id: "passenger", name: "Пассажир"},
    ]);

    const submitForm = () => {
      // Подготавливаем данные для отправки
      const data = {
        username: username.value,
        password: password.value,
        role: selectedRole.value.id,
      };

      if (selectedRole.value.id === "driver") {
        console.log("Выбран водитель и его данные:", driverInfo.value)
        data.driverInfo = driverInfo.value;
      }

      handleSubmit(data);
    };

    return {
      username,
      password,
      selectedRole,
      roles,
      driverInfo,
      handleSubmit: submitForm,
    };
  },
};
</script>
