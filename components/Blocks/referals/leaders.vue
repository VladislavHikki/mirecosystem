<template>
  <div class="leaders-referals_container">
    <h1 class="page-title">Лидеры рефералки</h1>
    <div class="cards-container cards-container_column--three">
      <CardsReferal v-for="value in userStore.leaderReferrals.referers" :data="value" />
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '~/store/user';

const userStore = useUserStore();

await userStore.requestLeaderReferrals();
</script>
