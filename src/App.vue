<script>
export default {
  name: "App",
};
</script>

<template>
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<style>
/* Глобальные стили (если нужно) */
.app {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f3f4f6; /* Tailwind bg-gray-100 */
}
</style>


