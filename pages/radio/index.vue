<template>
  <ProgressSpinner class="spinner_progress" v-if="!isLoad" />
  <div v-show="isLoad" class="news" style="height: 100vh">
    <iframe allowfullscreen :on-load="(isLoad = true)" src="https://online-red.com/radio/" width="100%" height="100%"></iframe>
  </div>
  <!-- https://radiopotok.online/ -->
  <!-- https://tv2free.ru/radio -->
  <!-- https://online-red.com/radio/ -->
</template>

<script setup>
let isLoad = ref(false);
</script>
