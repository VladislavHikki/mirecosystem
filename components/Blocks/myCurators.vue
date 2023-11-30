<template>
    <div class="sponsors-cards">
      <div
        v-if="props?.data?.myCurators.length"
        class="sponsors-cards_container"
        v-for="(value, index) in props?.data?.myCurators"
        :key="index"
      >
        <CardsSponsors :data="value.curator" />
      </div>
      <div v-else>
        <h2 class="page-subtitle">У вас нет кураторов</h2>
      </div>
    </div>
  </template>
  
  <script setup>
  const props = defineProps({ data: null });
  </script>