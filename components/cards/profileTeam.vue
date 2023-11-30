<template>
  <div>
    <section v-if="userTeams">
      <div class="profileTeam_container">
        <div>
          <h2 class="page-subtitle">
            {{ declOfNum(userTeams.length, ['Команда', 'Команды', 'Команды']) }} пользователя ({{ userTeams.length }})
          </h2>
          <div class="trainer">
            <div class="trainer-cards" v-if="userTeams.length">
              <CardsTeam v-for="(value, index) in userTeams" :key="index" :data="value" />
            </div>
            <div v-else>
              <h2 class="page-subtitle" style="padding-top: 20px;">Пользователь не состоит ни в одной команде</h2>
            </div>
          </div>
        </div>
        <div>
          <h2 class="page-subtitle">Сеть команд пользователя ({{ userStore.getProfile.teams.referrals.length }})</h2>
        </div>
        <div class="profileTeam_levels">
          <div class="profileTeam_levels" v-for="(level, index) in levels" :key="index">
            <div>
              <h2 class="page-subtitle">{{ level }} Уровень ({{ getTeamLevel(level).length }})</h2>
              <div class="profileTeam_card">
                <div v-for="cardInfo in getSortWhereLabel(getTeamLevel(level))">
                  <CardsTeam :data="cardInfo" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section v-else>
      <h2 class="page-subtitle">Пользователь не состоит ни в одной команде</h2>
    </section>
  </div>
</template>
<script setup>
import { useUserStore } from '@/store/user.js';
import { getSortWhereLabel, getSortFranchise, getSortTeamFromProfile } from '@/store/sort';
import { useRoute } from 'vue-router';
const userStore = useUserStore();
const router = useRoute();
const countTeams = ref(0);
await userStore.requestProfile(router.params.id);
const userTeams = userStore.getProfile.teams.user.concat(userStore.getProfile.teams.referrers);
const levels = new Set(userStore.getProfile.teams.referrals.map((x) => x.level));
function getTeamLevel(level) {
  return userStore.getProfile.teams.referrals.filter((x) => x.level === level);
}
</script>
