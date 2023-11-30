<template>
    <div class="sponsors-cards">
      <div
        v-if="props?.data?.curators?.length"
        class="sponsors-cards_container"
        v-for="(value, index) in props?.data?.curators"
        :key="index"
      >
        <CardsSponsors :data="value.user" />
      </div>
      <div v-else>
        <h2 class="page-subtitle">Вы не являетесь куратором</h2>
      </div>
    </div>
  </template>
  
  <script setup>
  const props = defineProps({ data: null });
  </script>
  