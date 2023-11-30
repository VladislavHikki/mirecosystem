<template>
  <div class="structure-triad container">
    <h2 class="page-title">Большая игра</h2>
    <div class="structure-triad_card">
      <h2 class="page-subtitle"><nuxt-link to="/the_game/structure">Триада</nuxt-link></h2>
      <div class="last-resource-cards">
        <CardsTriad :info="current_triad" />
      </div>
    </div>
    <div class="structure-triad_card">
      <h2 class="page-subtitle">Дивизионы ({{ current_triad?.subsections?.length }})</h2>
      <div class="last-resource-cards">
        <template v-if="current_triad?.subsections?.length">
          <CardsDivisions v-for="value in current_triad?.subsections" :data="value" />
        </template>
        <h2 v-else class="page-subtitle">Нет дивизионов</h2>
      </div>
    </div>
    <div class="structure-triad_card">
      <div class="teams">
        <div class="teams_form_item">
          <div class="teams_form_item_tabs">
            <h2
              @click="tab_type = null"
              class="page-subtitle teams_form_item_tabs_item"
              :class="tab_type == null ? 'teams_form_item_tabs_item--active' : 'teams_form_item_tabs_item--disabled'"
            >
              Команды ({{ current_triad?.teams?.totalCount }})
            </h2>
            <h2
              @click="tab_type = 0"
              class="page-subtitle teams_form_item_tabs_item"
              :class="tab_type == 0 ? 'teams_form_item_tabs_item--active' : 'teams_form_item_tabs_item--disabled'"
            >
              Не элитные команды ({{ current_triad?.teams?.usualCount }})
            </h2>
            <h2
              @click="tab_type = 1"
              class="page-subtitle teams_form_item_tabs_item"
              :class="tab_type == 1 ? 'teams_form_item_tabs_item--active' : 'teams_form_item_tabs_item--disabled'"
            >
              Элитные команды ({{ current_triad?.teams?.eliteCount }})
            </h2>
          </div>
        </div>
        <div class="last-command-cards" v-if="current_triad?.teams?.rows?.length">
          <CardsTeam v-for="team in current_triad?.teams?.rows" :data="team"></CardsTeam>
        </div>
        <div class="warning" v-else>
          <h2 class="page-subtitle">Команд нет</h2>
        </div>
        <div class="pagination_btns">
          <Paginator
            v-if="current_triad?.page > 1"
            :template="{
              '640px': 'PrevPageLink CurrentPageReport NextPageLink',
              '960px': 'FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink',
              '1300px': 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink',
              default: 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink JumpToPageDropdown JumpToPageInput',
            }"
            v-model:first="page"
            :total-records="current_triad?.page"
            :rows="1"
            currentPageReportTemplate="{last} из {totalRecords}"
          />
        </div>
      </div>
      <!-- <h2 class="page-subtitle">Команды ({{ current_triad?.subsections[0]?.userCount }})</h2>
      <div class="last-resource-cards">
        <template v-if="current_triad?.subsections[0]?.userCount > 0">
          <CardsTeam v-for="value in current_triad?.teams?.rows" :data="value" />
        </template>
        <h2 v-else class="page-subtitle">Нет команд</h2>
      </div> -->
    </div>
  </div>
</template>

<script setup>
import { useTriadsStore } from '~/store/triads';

const triadsStore = useTriadsStore();
const route = useRoute();
const current_triad = ref(await triadsStore.requestOneTriad(route?.params?.id, null));

let page = ref(0);
let tab_type = ref(null);

watch(page, async () => {
  current_triad.value = await triadsStore.requestOneTriad(route?.params?.id, { page: page.value + 1 });
});

watch(tab_type, async () => {
  current_triad.value = await triadsStore.requestOneTriad(route?.params?.id, { type: tab_type.value });
  page.value = 0;
});
</script>

<style lang="scss" scoped>
.teams_form_item_tabs {
  display: flex;
  gap: 12px;
  &_item {
    cursor: pointer;
    &--active {
      color: black;
    }
    &--disabled {
      color: #019ec3;
    }

    &--active,
    &--disabled {
      transition: 0.3s;
    }
  }
}
</style>
