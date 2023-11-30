<template>
  <div class="player-cards" v-if="teamStore.userTeam.teams.count > 0">
    <div class="player" v-for="(value, index) in teamStore.userTeam.teams.rows" :key="index">
      <CardsTeam :data="value" />
    </div>
  </div>
  <div v-else class="message" style="padding-top: 30px">
    <h2 class="page-subtitle">Вы не являетесь игроком ни в одной команде</h2>
  </div>
  <div class="pagination_btns" v-if="teamStore?.userTeam?.teams?.rows?.length">
    <Paginator
      v-if="teamStore.userTeam.pages > 1"
      :template="{
        '640px': 'PrevPageLink CurrentPageReport NextPageLink',
        '960px': 'FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink',
        '1300px': 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink',
        default: 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink JumpToPageDropdown JumpToPageInput',
      }"
      v-model:first="page"
      :total-records="teamStore.userTeam.pages"
      :rows="1"
      currentPageReportTemplate="{last} из {totalRecords}"
    />
  </div>
</template>

<script setup>
import { useTeamStore } from '~/store/team';

const teamStore = useTeamStore();
const page = ref(0);

await teamStore.requestUsersTeam(1);

watch(page, async () => {
  await teamStore.requestUsersTeam(page.value + 1);
});
</script>
