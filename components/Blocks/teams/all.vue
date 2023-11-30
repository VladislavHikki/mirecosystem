<template>
  <div class="teams">
    <div class="teams_form_item">
      <h2 :class="class_name_headline">Команды ({{ teamStore?.teams?.teams?.count }})</h2>
      <InputText v-model.trim="text" @input="search" class="teams_form_item_find_input" placeholder="Поиск" />
      <div class="teams_form_item_tabs">
        <h2
          @click="tab_type = null"
          class="page-subtitle teams_form_item_tabs_item"
          :class="!tab_type ? 'teams_form_item_tabs_item--active' : 'teams_form_item_tabs_item--disabled'"
        >
          Все команды 
        </h2>
        <h2
          @click="tab_type = 1"
          class="page-subtitle teams_form_item_tabs_item"
          :class="tab_type == 1 ? 'teams_form_item_tabs_item--active' : 'teams_form_item_tabs_item--disabled'"
        >
          Элитные команды
        </h2>
      </div>
    </div>

    <div class="last-command-cards" v-if="teamStore?.teams?.teams?.rows?.length">
      <CardsTeam v-for="team in getSortWhereLabel(teamStore?.teams.teams?.rows)" :data="team"></CardsTeam>
    </div>
    <div class="warning" v-else>
      <h2 class="page-subtitle">Команд нет</h2>
    </div>
    <div class="pagination_btns">
      <Paginator
        v-if="teamStore?.teams?.pages > 1"
        :template="{
          '640px': 'PrevPageLink CurrentPageReport NextPageLink',
          '960px': 'FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink',
          '1300px': 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink',
          default: 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink JumpToPageDropdown JumpToPageInput',
        }"
        v-model:first="page"
        :total-records="teamStore?.teams?.pages"
        :rows="1"
        currentPageReportTemplate="{last} из {totalRecords}"
      />
    </div>
  </div>
</template>

<script setup>
import { useTeamStore } from '@/store/team';
import { getSortWhereLabel } from '~/store/sort';

const props = defineProps({
    class_name_headline: {
        type: String,
        default: "page-title"
    }
});

let page = ref(0);
let text = ref('');
let tab_type = ref(null);
const teamStore = useTeamStore();

await teamStore.searchTeam({ text: text.value, amount: 25 }, 1);

const selectPage = async (number) => {
  await teamStore.searchTeam({ text: text.value, amount: 25, type: tab_type.value }, number);
};

async function search() {
  await teamStore.searchTeam({ text: text.value, amount: 25, type: tab_type.value }, 1);
  page.value = 0;
}

watch(tab_type, async ()=>{
  page.value = 0;
  await teamStore.searchTeam({ text: text.value, amount: 25, type: tab_type.value }, 1);
});
watch(page, async () => {
  await selectPage(page.value + 1);
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
      color: #019EC3;
    }

    &--active, &--disabled {
      transition: .3s;
    }
  }
}
</style>

