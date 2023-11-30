<template>
  <div>
    <section v-if="sponsors?.data?.sponsors?.length">
      <div class="profileTeam_container">
        <div v-for="(value, index) in sponsors?.data?.sponsors" :key="index">
          <CardsSponsors :data="value" />
        </div>
      </div>
    </section>
    <section v-else>
      <h2 class="page-subtitle">У данного пользователя нет спонсоров</h2>
    </section>
  </div>
</template>
<script setup>
import { useUserStore } from '@/store/user.js';
import { getSortWhereName, getSortFranchise, getSortTeamFromProfile } from '@/store/sort';
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
