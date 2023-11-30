<template>
  <div>
    <section v-if="userStore.getProfile.referrals">
      <div class="profileTeam_container">
        <div class="profileTeam_levels">
          <div class="profileTeam_levels" v-for="(value, index) in levels" :key="index">
            <div>
              <h2 class="page-subtitle">{{ value }} Уровень ({{ getReferralsLevel(value, true) }})</h2>
              <div class="profileTeam_card">
                <div v-for="(info, index) in getSortWhereName(getReferralsLevel(value))" :key="index">
                  <CardsReferalka :data="info" :profile="true" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section v-else>
      <h2 class="page-subtitle">У данного пользователя нет рефералов</h2>
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
const levels = new Set(userStore.getProfile.referrals?.map((item) => item.level));

function getReferralsLevel(level, count = false) {
  if (count) {
    return userStore.getProfile.referrals.filter((item) => item.level === level).length;
  } else return userStore.getProfile.referrals.filter((item) => item.level === level);
}
</script>
