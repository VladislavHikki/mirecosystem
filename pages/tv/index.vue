<template>
  <ProgressSpinner class="spinner_progress" v-if="!isLoad" aria-colcount="1" />
  <div v-show="isLoad" class="news" style="height: 100vh">
    <iframe allowfullscreen :on-load="(isLoad = true)" src="https://smotret.tv/" width="100%" height="100%"></iframe>
  </div>
  <!-- https://smotrim.ru/ -->
  <!-- https://smotret.tv/ -->
  <!-- https://tv2free.ru/tv -->
</template>

<script setup>
let isLoad = ref(false);
</script>
