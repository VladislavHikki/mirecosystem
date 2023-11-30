<template>
  <div class="refererCard">
    <div
      v-if="userStore.referees?.referrers?.length > 0"
      class="referalsCard_container"
      v-for="(value, index) in userStore?.referees?.referrers"
      :key="index"
    >
      <BlocksProfile :data="value" />
      <BlocksCounter :data="value" />
    </div>
    <h2 class="page-subtitle" v-else>У Вас нет реферов</h2>
    <div class="pagination_btns">
      <Paginator
        v-if="userStore.referees?.pages > 1"
        :template="{
          '640px': 'PrevPageLink CurrentPageReport NextPageLink',
          '960px': 'FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink',
          '1300px': ' PrevPageLink PageLinks NextPageLink ',
          default: 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink ',
        }"
        v-model:first="page"
        :total-records="userStore.referees?.pages"
        :rows="1"
        currentPageReportTemplate="{last} из {totalRecords}"
      />
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '~/store/user';

const userStore = useUserStore();

// await userStore.requestReferrals(userStore.data.id)
await userStore.requestReferees(userStore.data.referrerId);

let page = ref(0);

watch(page, async () => {
  await userStore.requestReferees(userStore?.data?.referrerId, { page: page.value + 1 });
});
</script>

<style lang="scss" scoped>
.refererCard {
  width: 100%;
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.refererCard {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}

@media (max-width: $x-large) {
  .refererCard {
    flex-direction: column;
    grid-template-columns: repeat(1, 1fr);
    .refererCard_container {
      width: 100%;
    }
  }
}
</style>
