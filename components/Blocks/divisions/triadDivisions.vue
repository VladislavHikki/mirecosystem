<template>
  <div class="divisions">
    <pre>
    </pre>
    <h2 :class="class_name_headline">Дивизионы ({{ props.data?.length }})</h2>
    <div class="last-resource-cards">
      <div class="last-resource-card_container" v-for="(value, index) in props.data" :key="index">
        <CardsDivisions :data="value" />
      </div>
    </div>
    <!-- <div class="pagination_btns">
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
    </div> -->
  </div>
</template>

<script setup>
const props = defineProps({
  class_name_headline: {
    type: String,
    default: 'page-title',
  },
  data: {
    type: Object,
  },
});
</script>
