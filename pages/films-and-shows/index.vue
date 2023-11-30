<template>
  <ProgressSpinner class="spinner_progress" v-if="!isLoad" />
  <div v-show="isLoad" class="news" style="height: 100vh">
    <iframe allowfullscreen :on-load="(isLoad = true)" src="https://www.tvigle.ru/" width="100%" height="100%"></iframe>
  </div>
  <!-- https://www.tvigle.ru/ -->
  <!-- https://www.kinoafisha.info/ -->
  <!-- https://wink.ru/movies -->
</template>

<script setup>
let isLoad = ref(false);
</script>
