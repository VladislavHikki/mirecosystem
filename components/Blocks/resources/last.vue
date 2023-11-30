<template>
  <div class="last-resources-cards_container">
    <h1 class="page-title">Последние ресурсы</h1>
    <div class="cards-container cards-container_column--three">
      <CardsResource v-for="value in resourceStore.lastResources?.rows" :data="value" />
    </div>
    <div class="cards-container_tools">
      <Button @click="navigateTo('/resources'), $emit('click_to_resources')" label="Все ресурсы" severity="success" class="button-ind" />
      {{ resourceStore.lastResources?.count }}
    </div>
  </div>
</template>

<script setup>
import { useResourceStore } from '@/store/resource';

const resourceStore = useResourceStore();

await resourceStore.requestLastResource();
</script>
