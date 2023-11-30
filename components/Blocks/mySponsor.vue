<template>
  <div class="sponsors-cards">
    <div
      v-if="props?.data?.sponsors?.length"
      class="sponsors-cards_container"
      v-for="(value, index) in props?.data?.sponsors"
      :key="index"
    >
      <CardsSponsors :data="value" />
    </div>
    <div v-else>
      <h2 class="page-subtitle">У вас нет спонсоров</h2>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({ data: null });
</script>
