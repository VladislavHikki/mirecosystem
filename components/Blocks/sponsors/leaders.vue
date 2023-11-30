<template>
  <div class="leaders-sponsor-cards_container">
    <h1 class="page-title">Лидеры спонсорства</h1>
    <div class="cards-container cards-container_column--three">
      <CardsSponsors  v-for="value in userStore?.leadersSponsors?.sponsors" :data="value" :index="true" />
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '@/store/user.js';

const userStore = useUserStore();

await userStore.getLeadersSponsors();
</script>
