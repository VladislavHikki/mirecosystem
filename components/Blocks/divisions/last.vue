<template>
  <div class="last-divisions_container">
    <h1 class="page-title">Дивизионы</h1>
    <div class="cards-container cards-container_column--three">
      <CardsDivisions v-for="value in getSortWhereLabel(lastSubsection?.subsections)" :data="value" />
    </div>
    <div class="cards-container_tools">
      <Button @click="navigateTo('/division')" label="Все дивизионы" severity="success" class="button-ind"/>
      {{ lastSubsection?.count }}
    </div>
  </div>
</template>

<script setup>
import { useCategoryStore } from '@/store/category';
import { getSortWhereLabel } from '@/store/sort';

const categoryStore = useCategoryStore();

let lastSubsection = await categoryStore.requestLastSubsection();
</script>
