<template>
  <div class="container">
    <BlocksSearchResourse />
    <!-- <pre>
      {{ resourceStore?.resources }}
    </pre> -->
    <div class="resources">
      <div class="resource_form_item">
        <h2 class="page-title">{{ resourceStore?.resources?.category?.label }}</h2>
        <!-- <div class="find-input_resource_filter">
          <InputText @input="search" type="text" placeholder="Поиск" />
        </div> -->
      </div>
      <div class="franchisingLeaders-cards" v-if="resourceStore?.resources?.resources?.rows?.length">
        <div
          class="franchisingLeaders-card_container"
          v-for="(value, index) in getSortWhereLabel(resourceStore?.resources?.resources?.rows)"
          :key="index"
        >
          <CardsResource :data="value" :showAllTxt="false" />
        </div>
      </div>
      <div v-else><h2 class="page-subtitle">Ресурсов у этой категории нет</h2></div>
      <div class="pagination_btns">
        <Paginator
          v-if="resourceStore?.resources?.pages > 1"
          :template="{
            '640px': 'PrevPageLink CurrentPageReport NextPageLink',
            '960px': 'FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink',
            '1300px': ' PrevPageLink PageLinks NextPageLink ',
            default: 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink ',
          }"
          v-model:first="currentPage"
          :total-records="resourceStore?.resources?.pages"
          :rows="1"
          currentPageReportTemplate="{last} из {totalRecords}"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useResourceStore } from '@/store/resource';
import { getSortWhereLabel } from '@/store/sort';
const resourceStore = useResourceStore();
let inputText = ref('');
// async function search(event) {
//   inputText.value = event.target.value;
//   await resourceStore.requestResourcesByCategory(route.params.id, 1, inputText.value);
// }

const route = useRoute();
await resourceStore.requestResourcesByCategory(route.params.id, 1, inputText.value);

let currentPage = ref(0);
watch(currentPage, async () => {
  await resourceStore.requestResourcesByCategory(route.params.id, currentPage.value + 1, inputText.value);
});
</script>
