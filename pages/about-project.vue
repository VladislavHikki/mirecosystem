<template>
  <ProgressSpinner class="spinner_progress" v-if="!isLoad" />
  <div v-show="isLoad" class="news" style="height: 100vh">
    <iframe
      allowfullscreen
      :on-load="(isLoad = true)"
      src="https://applovers.ru/MIR_about"
      height="100%"
      width="100%"
    ></iframe>
  </div>
</template>

<script setup>
let isLoad = ref(false);
</script>
