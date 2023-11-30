<template>
  <div class="last-teams">
    <h1 :class="data?.class ? data.class : 'page-title'">Последние Команды</h1>
    <div class="last-command-cards">
      <CardsTeam v-for="value in userStore.lastTeams" :data="value" />
    </div>
    <div class="cards-container_tools">
      <Button @click="navigateTo('/teams')" label="Все команды" severity="success" class="button-ind"/>
      {{ teamStore?.teams?.teams?.count }}
    </div>
  </div>
</template>

<script setup>
import { useTeamStore } from '@/store/team';
import { useUserStore } from '@/store/user.js';

const props     = defineProps(['data']);
const limit     = props.data?.limit || 6;
const teamStore = useTeamStore();
const userStore = useUserStore();

await teamStore.requestTeams();
await userStore.requestLastTeams(limit);
</script>
