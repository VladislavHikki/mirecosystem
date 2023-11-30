<template>
  <div class="last-referals-cards_container">
    <h1 class="page-title">Последние рефералы</h1>
    <div class="cards-container cards-container_column--three">
      <CardsReferalka v-for="value in userStore.lastReferrals" :data="value" :index="true" />
    </div>
    <div class="cards-container_tools">
      <Button @click="navigateTo('/referals')" label="Смотреть рефералку" severity="success" class="button-ind"/>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '@/store/user.js';

const userStore = useUserStore();

await userStore.requestLastReferrals();
</script>
