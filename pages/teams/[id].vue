<template>
  <div class="container">
    <div class="teams_resource_container">
    <h2 class="page-title">Состав команды  {{  userStore?.team?.team?.label}}</h2>
    <div class="teams_count" style="display: flex; flex-wrap: wrap; gap: 20px; padding-top: 20px;">
      <h2 class="page-subtitle">
        {{userStore.team.team.userCount}}
        {{ declOfNum(userStore.team.team.userCount, ['игрок', 'игрока', 'игроков']) }}
      </h2>
      <h2 class="page-subtitle">
        {{userStore.team.team.resourceCount}}
        {{ declOfNum(userStore.team.team.resourceCount, ['ресурс', 'ресурса', 'ресурсов']) }}
      </h2>
    </div>
    
    <!-- <div class="last-command-cards">
      <CardsTeam :data="userStore.team.team"/>
    </div> -->
    
    <div class="teams_card">
          <div
            class="leaders-referals-card_container"
            v-if=" userStore?.team?.users?.length"
            v-for="(value, index) in userStore?.team?.users"
            :key="index"
          >
            <CardsTeams :data="value"/>
          </div>
           <div class="warning" v-else>
            <h2 class="page-subtitle">Игроков нет</h2>
          </div>
    </div>

    <!-- <div class="teams_resource">
      <div
        class="teams_resource_container"
        v-for="(value, index) in resourceStore?.allResourcesByTeam?.resources?.rows"
        :key="index"
        v-if="resourceStore?.allResourcesByTeam?.resources?.rows?.length"
      >
        <CardsResource style="margin-bottom: 0px" :data="value" />
      </div>
    </div> -->
    <div class="pagination_btns">
      <Paginator
        v-if="resourceStore?.allResourcesByTeam?.pages > 1"
        :template="{
          '640px': 'PrevPageLink CurrentPageReport NextPageLink',
          '960px': 'FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink',
          '1300px': 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink',
          default: 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink JumpToPageDropdown JumpToPageInput',
        }"
        v-model:first="page"
        :total-records="resourceStore?.allResourcesByTeam?.pages"
        :rows="1"
        currentPageReportTemplate="{last} из {totalRecords}"
      />
    </div>
  </div>
  </div>

</template>

<script setup>
import { useUserStore } from '@/store/user';
import { useResourceStore } from '~/store/resource';
import { useRoute } from 'vue-router';

const userStore = useUserStore();
const route = useRoute();
const resourceStore = useResourceStore();
const page = ref(0);

await userStore.requestOneTeam( route.params.id );

await resourceStore.requestTeamResources(route.params.id, 1);

async function selectPage(newPage) {
  await resourceStore.requestTeamResources(route.params.id, newPage);
}

watch(page, () => {
  selectPage(page.value + 1);
});
</script>
