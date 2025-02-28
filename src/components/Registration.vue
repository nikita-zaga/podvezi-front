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
    const {username, password, selectedRole, handleSubmit} = useRegistration();

    const roles = ref([
      {id: "driver", name: "Водитель"},
      {id: "passenger", name: "Пассажир"},
    ]);

    return {
      username,
      password,
      handleSubmit: () => handleSubmit(selectedRole.value),
      roles,
      selectedRole,
    };
  },
};
</script>
