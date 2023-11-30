<template>
  <div>
    <section v-if="userStore.getProfileResources?.length">
      <div class="last-resource-cards">
        <div
          class="last-resource-card_container"
          v-for="(value, index) in getSortWhereLabel(userStore.getProfileResources)"
          :key="index"
        >
          <CardsResource :data="value" />
        </div>
      </div>
    </section>
    <section v-else>
      <h2 class="page-subtitle">У данного пользователя нет ресурсов</h2>
    </section>
  </div>
</template>
<script setup>
import { useUserStore } from '@/store/user.js';
import { getSortWhereLabel, getSortFranchise, getSortTeamFromProfile } from '@/store/sort';
import { useRoute } from 'vue-router';
const userStore = useUserStore();
const router = useRoute();
await userStore.requestProfile(router.params.id);
</script>
