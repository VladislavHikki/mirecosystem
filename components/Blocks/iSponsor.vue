<template>
  <div class="sponsors-cards">
    <div
      v-if="props?.data?.students?.length"
      class="sponsors-cards_container"
      v-for="(value, index) in props?.data?.students"
      :key="index"
    >
      <CardsSponsors :data="value" />
    </div>
    <div v-else>
      <h2 class="page-subtitle">У вас нет подопечных</h2>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({ data: null });
</script>
