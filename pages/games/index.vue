<template>
  <ProgressSpinner class="spinner_progress" v-if="!isLoad" aria-colcount="1" />
  <div v-show="isLoad" class="university" style="height: 100vh">
    <iframe
      allowfullscreen
      :on-load="(isLoad = true)"
      src="https://mmonlinegame.ru/2/index.php?do=cat&category=strategii&utm_source=drct&utm_campaign=ru-675546&source=none&position=other_4&keyword=—autotargeting&subtop=20231014120802x53276&yclid=11728546215480524799"
      width="100%"
      height="100%"
    ></iframe>
  </div>
  <!-- https://smotrim.ru/ -->
  <!-- https://smotret.tv/ -->
  <!-- https://tv2free.ru/tv -->
</template>

<script setup>
let isLoad = ref(false);
</script>
