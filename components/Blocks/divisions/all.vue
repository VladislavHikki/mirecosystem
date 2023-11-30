<template>
  <div class="divisions">
    <h2 :class="class_name_headline">Дивизионы ({{ categoryStore?.subsections?.subsections?.count }})</h2>
    <div class="last-resource-cards">
      <div
        class="last-resource-card_container"
        v-for="(value, index) in getSortWhereLabel(categoryStore?.subsections?.subsections?.rows)"
        :key="index"
      >
        <CardsDivisions :data="value" />
      </div>
    </div>
    <div class="pagination_btns">
      <Paginator
        v-if="categoryStore?.subsections?.pages > 1"
        :template="{
          '640px': 'PrevPageLink CurrentPageReport NextPageLink',
          '960px': 'FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink',
          '1300px': 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink',
          default: 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink JumpToPageDropdown JumpToPageInput',
        }"
        v-model:first="page"
        :total-records="categoryStore?.subsections?.pages"
        :rows="1"
        currentPageReportTemplate="{last} из {totalRecords}"
      />
    </div>
  </div>
</template>

<script setup>
import { useCategoryStore } from '@/store/category';
import { getSortWhereLabel } from '@/store/sort';

const props = defineProps({
    class_name_headline: {
        type: String,
        default: "page-title"
    }
});
const categoryStore = useCategoryStore();
await categoryStore.requestSubsections(1);

let page = ref(0);
watch(page, async () => {
  await categoryStore.requestSubsections(page.value + 1);
});
</script>
