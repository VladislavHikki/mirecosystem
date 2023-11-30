<template>
  <div class="sponsorship">
    <h1 :class="class_name_headline">Спонсоры</h1>
    <div class="cards-container cards-container_column--three">
      <CardsSponsors v-for="value in sponsors?.data?.sponsors" :data="value" />
    </div>
    <div class="pagination" style="display: flex">
      <Paginator
        v-if="sponsors?.data?.pages > 1"
        :template="{
          '640px': 'PrevPageLink CurrentPageReport NextPageLink',
          '960px': 'FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink',
          '1300px': ' PrevPageLink PageLinks NextPageLink ',
          default: 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink ',
        }"
        v-model:first="currentPage"
        :total-records="sponsors?.data?.pages"
        :rows="1"
        currentPageReportTemplate="{last} из {totalRecords}"
      />
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '@/store/user.js';

const userStore = useUserStore();
const props = defineProps({
    class_name_headline: {
        type: String,
        default: "page-title",
    }
})

let currentPage = ref(0);
let sponsors = ref(await userStore.getAllSponsors(currentPage.value + 1));

watch(currentPage, () => {
  changePage();
});

async function changePage() {
  sponsors.value = await userStore.getAllSponsors(currentPage.value + 1);
}
</script>
