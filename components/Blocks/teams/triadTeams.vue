<template>
  <div class="teams">
    <div class="teams_form_item">
      <div class="teams_form_item_tabs">
        <h2
          @click="tab_type = null"
          class="page-subtitle teams_form_item_tabs_item"
          :class="tab_type == null ? 'teams_form_item_tabs_item--active' : 'teams_form_item_tabs_item--disabled'"
        >
          Команды ({{ props?.data?.totalCount }})
        </h2>
        <h2
          @click="tab_type = 0"
          class="page-subtitle teams_form_item_tabs_item"
          :class="tab_type == 0 ? 'teams_form_item_tabs_item--active' : 'teams_form_item_tabs_item--disabled'"
        >
          Не элитные ({{ props?.data?.usualCount }})
        </h2>
        <h2
          @click="tab_type = 1"
          class="page-subtitle teams_form_item_tabs_item"
          :class="tab_type == 1 ? 'teams_form_item_tabs_item--active' : 'teams_form_item_tabs_item--disabled'"
        >
          Элитные ({{ props?.data?.eliteCount }})
        </h2>
      </div>
    </div>
    <div class="last-command-cards" v-if="props?.data?.rows">
      <CardsTeam v-for="team in props?.data?.rows" :data="team"></CardsTeam>
    </div>
    <div class="warning" v-else>
      <h2 class="page-subtitle">Команд нет</h2>
    </div>
    <div class="pagination_btns">
      <Paginator
        v-if="props?.data?.pages > 1"
        :template="{
          '640px': 'PrevPageLink CurrentPageReport NextPageLink',
          '960px': 'FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink',
          '1300px': 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink',
          default: 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink JumpToPageDropdown JumpToPageInput',
        }"
        v-model:first="page"
        :total-records="props?.data?.pages"
        :rows="1"
        currentPageReportTemplate="{last} из {totalRecords}"
      />
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['update:modelValue', 'page']);

const props = defineProps({
  class_name_headline: {
    type: String,
    default: 'page-title',
  },
  data: {
    type: Object,
  },
});

let page = ref(0);
let text = ref('');
let tab_type = ref(null);

watch(tab_type, () => {
  page.value = 0;
  emit('update:modelValue', tab_type.value);
});

watch(page, () => {
  emit('page', page.value);
});

//   await teamStore.searchTeam({ text: text.value, amount: 25 }, 1);

//   const selectPage = async (number) => {
//     await teamStore.searchTeam({ text: text.value, amount: 25, type: tab_type.value }, number);
//   };

//   async function search() {
//     await teamStore.searchTeam({ text: text.value, amount: 25, type: tab_type.value }, 1);
//     page.value = 0;
//   }

//   watch(tab_type, async ()=>{
//     page.value = 0;
//     await teamStore.searchTeam({ text: text.value, amount: 25, type: tab_type.value }, 1);
//   });
//   watch(page, async () => {
//     await selectPage(page.value + 1);
//   });
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
