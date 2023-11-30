<template>
  <ProgressSpinner class="spinner_progress" v-if="!isLoad" />
  <div v-show="isLoad" class="news" style="height: 100vh">
    <iframe allowfullscreen :on-load="(isLoad = true)" src="https://mirecosystem.ru/earn" width="100%" height="100%"></iframe>
  </div>
  <!-- https://moko.mirecosystem.ru/ -->
</template>

<script setup>
let isLoad = ref(false);
</script>
