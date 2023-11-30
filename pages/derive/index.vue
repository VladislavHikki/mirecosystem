<template>
  <div class="derive container">
    <div class="derive-cards">
      <h1 class="page-title">Курсы</h1>
      <div class="derive-cards_container">
        <CardsDerive v-for="value in getSortWhereLabel(deriveStore.derives?.currency)" :data="value"  />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useDeriveStore } from "@/store/derive";
import {getSortWhereLabel} from '@/store/sort';

const deriveStore = useDeriveStore();

await deriveStore.getAllDerive();

</script>

<style lang="scss">
.derive {
  &_container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
  }
}
</style>
