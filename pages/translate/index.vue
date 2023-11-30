<template>
  <ProgressSpinner class="spinner_progress" v-if="!isLoad" />
  <div v-show="isLoad" class="news" style="height: 100vh">
    <iframe
      allowfullscreen
      :on-load="(isLoad = true)"
      src="https://www.reverso.net/%D0%BF%D0%B5%D1%80%D0%B5%D0%B2%D0%BE%D0%B4-%D1%82%D0%B5%D0%BA%D1%81%D1%82%D0%B0"
      width="100%"
      height="100%"
    ></iframe>
  </div>
  <!-- https://lenta.ru/ -->
  <!-- https://www.rbc.ru/ -->
</template>

<script setup>
let isLoad = ref(false);
</script>
