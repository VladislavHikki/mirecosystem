<template>
    
    <div class="profileTeam_cont" v-if="sponsors?.data?.students?.length">
      <div v-for="(value, index) in sponsors?.data?.students"
      :key="index">
          <CardsSponsors :profile="true" :data="value" />
      </div>
    </div>
    <div class="iSponsor_nothing" v-else>
      <h2 class="page-subtitle">У данного пользователя нет выпусников</h2>
    </div>
  
  </template>
  <script setup>
  import { useUserStore } from '@/store/user.js';
  import { useRoute } from 'vue-router';
  const userStore = useUserStore();
  const router = useRoute();
  await userStore.requestProfile(router.params.id);
  let sponsors = await userStore.getMySponsors(userStore?.getProfile?.user?.id);
  function CheckOnNull(value) {
    if (!value?.length) {
      return false;
    }
    return true;
  }
  </script>