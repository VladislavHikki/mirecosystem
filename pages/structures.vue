<template>
  <div class="container">
    <h2 class="page-title">Структуры</h2>
    <h2 class="page-subtitle">Дивизионы ({{ categoryStore.subsections.subsections.count }})</h2>
    <div class="last-resource-cards" style="padding-top: 0">
      <div
        class="last-resource-card_container"
        v-for="(value, index) in categoryStore.subsections.subsections.rows"
        :key="index"
      >
        <CardsDivisions :data="value" />
      </div>
    </div>
    <BlocksTeamsLast :data="{ limit: 12, class: 'page-subtitle' }" />
  </div>
</template>

<script setup>
import { useCategoryStore } from '@/store/category';

const categoryStore = useCategoryStore();
const page = 1;
await categoryStore.requestSubsections(page);
</script>

