<template>
  <div class="last-derives_container">
    <h1 class="page-title">Курсы</h1>
    <div class="cards-container cards-container_column--three">
      <CardsDerive v-for="value in deriveStore.derives?.currency" :data="value" />
    </div>
    <div class="cards-container_tools">
      <Button @click="navigateTo('/derive')" label="Все курсы" severity="success" class="button-ind"/>
      {{ deriveStore.derives?.countCyr }}
    </div>
  </div>
</template>

<script setup>
import { useDeriveStore } from '@/store/derive';

const deriveStore = useDeriveStore();

await deriveStore.getAllDerive(6, true, 'main');
</script>
