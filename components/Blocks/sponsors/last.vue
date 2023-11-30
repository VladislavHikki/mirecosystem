<template>
  <div class="last-sponsors-cards_container">
    <h1 class="page-title">Последние спонсоры</h1>
    <div class="cards-container cards-container_column--three">
      <CardsSponsors v-for="value in lastSponsors?.data?.sponsors" :data="value" />
    </div>
    <div class="cards-container_tools">
      <Button @click="navigateTo('/sponsorship')" label="Смотреть спонсорство" severity="success" class="button-ind" />
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '@/store/user.js';

const userStore = useUserStore();

let lastSponsors = await userStore.getLastSponsors();
</script>
