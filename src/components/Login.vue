<template>
  <div class="flex justify-center items-center min-h-screen w-screen bg-gray-100">
    <form @submit.prevent="handleSubmit" class="bg-white p-6 rounded-lg shadow-md w-96">
      <h2 class="text-2xl font-bold mb-4">Вход</h2>
      <input
          type="text"
          class="border p-2 w-full mb-2"
          placeholder="Имя пользователя"
          v-model="username"
          required
      />
      <input
          type="password"
          class="border p-2 w-full mb-4"
          placeholder="Пароль"
          v-model="password"
          required
      />
      <button type="submit" class="bg-green-500 text-white py-2 px-4 rounded w-full">
        Войти
      </button>
    </form>
  </div>
</template>

<script>
import { useLogin } from "../composables/useLogin";

export default {
  setup() {
    return useLogin(); // Подключаем логику
  },
};
</script>
