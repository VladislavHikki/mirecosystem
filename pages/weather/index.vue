<template>
  <ProgressSpinner class="spinner_progress" v-if="!isLoad" />
  <div v-show="isLoad" class="news" style="height: 100vh">
    <iframe allowfullscreen :on-load="(isLoad = true)" src="https://www.gismeteo.ru/" width="100%" height="100%"></iframe>
  </div>
  <!-- https://www.gismeteo.ru/ -->
  <!-- https://world-weather.ru/ -->
  <!-- https://rusmeteo.net/ -->
</template>

<script setup>
let isLoad = ref(false);
</script>
