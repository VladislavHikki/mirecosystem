<template>
  <div class="services_favorites">
    <h2 class="page-subtitle">Избранные ({{ servicesStore.savesServices?.length }})</h2>
    <div class="services_all_type_content">
      <template v-if="servicesStore.savesServices?.length">
        <CardsService v-for="value in servicesStore.savesServices" :info="value" />
      </template>
      <h2 v-else class="page-subtitle">Нет избранных</h2>
    </div>
  </div>
</template>

<script setup>
import { useServicesStore } from '@/store/services';

const servicesStore = useServicesStore();

await servicesStore.requestSaveServices();
</script>

<style lang="scss" scoped>
.services_favorites {
  &_content {
    padding-top: 20px;
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
  }
}
.services_all {
  &_type_content {
    padding-top: 20px;
    display: grid;
    gap: 20px;
    grid-template-columns: repeat(auto-fill, 200px);
    
  }
}
</style>
