<template>
  <div class="triads">
    <h2 :class="class_name_headline">Триады ({{ triadsStore?.triads?.triads?.length }})</h2>
    <div class="last-resource-cards">
      <CardsTriad v-for="value in triadsStore?.triads?.triads" :info="value" />
    </div>
    <BlocksDivisionsTriadDivisions class_name_headline="page-subtitle" :data="triadsStore?.triads?.subsections" />
    <BlocksTeamsTriadTeams
      v-model="teamType"
      @page="page = $event"
      class_name_headline="page-subtitle"
      :data="triadsStore?.triads?.teams"
    />
    <!-- <div class="pagination_btns">
      <Paginator
        v-if="triadsStore.triads?.pages > 1"
        :template="{
          '640px': 'PrevPageLink CurrentPageReport NextPageLink',
          '960px': 'FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink',
          '1300px': 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink',
          default: 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink JumpToPageDropdown JumpToPageInput',
        }"
        v-model:first="page"
        :total-records="triadsStore.triads?.pages"
        :rows="1"
        currentPageReportTemplate="{last} из {totalRecords}"
      />
    </div> -->
  </div>
</template>

<script setup>
import { useTriadsStore } from '~/store/triads';

let page = ref(0);
const triadsStore = useTriadsStore();
const teamType = ref('all');
const props = defineProps({
  class_name_headline: {
    type: String,
    default: 'page-title',
  },
  data: {
    type: Object,
  },
});

await triadsStore.requestTriads(1, { list: false, type: teamType.value });

watch(page, async () => {
  await triadsStore.requestTriads(page.value + 1, { list: false, type: teamType.value });
});

watch(teamType, async () => {
  await triadsStore.requestTriads(1, { list: false, type: teamType.value });
});
</script>
