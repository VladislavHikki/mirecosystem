<template>
  <div class="container">
    <BlocksSearchResourse />
    <div class="resources">
      <div class="resource_form_item">
        <h2>{{ resourceStore?.resources?.city?.label }}</h2>
        <!-- <div class="find-input_resource_filter">
          <InputText @input="search" type="text" placeholder="Поиск" />
        </div> -->
      </div>
      <div class="franchisingLeaders-cards" v-if="resourceStore?.resources?.resources?.rows?.length > 0">
        <div
          class="franchisingLeaders-card_container"
          v-for="(value, index) in getSortWhereLabel(resourceStore?.resources?.resources?.rows)"
          :key="index"
        >
          <CardsResource :data="value" :showAllTxt="false" />
        </div>
      </div>
      <div v-else><h2>По этому местоположению нет ресурсов</h2></div>
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
const route = useRoute();
await resourceStore.getResourceByCityId('city', route.params?.id, 1, "");

// async function search(event) {
//   await resourceStore.getResourceByCityId('city', route.params?.id, 1, event.target.value);
// }

let currentPage = ref(0);
watch(currentPage, async () => {
  await resourceStore.searchResources(currentPage.value + 1, formData);
});
</script>
