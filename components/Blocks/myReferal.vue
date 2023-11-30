<template>
  <div>
    <div>
      <Dropdown v-model="formData.level" :options="levels" placeholder="Уровень" option-label="label" option-value="id" />
    </div>
    <div class="referalsCard">
      <div
        v-if="userStore.referrals?.refs.length"
        class="referalsCard_container"
        v-for="(value, index) in userStore.referrals?.refs"
        :key="index"
      >
        <!-- <CardsReferal :data="value" /> -->
        <BlocksProfile :data="value" />
        <!-- <BlocksCounter :data="value" /> -->
      </div>
      <h2 class="page-subtitle" v-else>Нет рефералов</h2>
    </div>
    <div class="pagination_btns">
      <Paginator
        v-if="userStore.referrals?.pages > 1"
        :template="{
          '640px': 'PrevPageLink CurrentPageReport NextPageLink',
          '960px': 'FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink',
          '1300px': ' PrevPageLink PageLinks NextPageLink ',
          default: 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink ',
        }"
        v-model:first="page"
        :total-records="userStore.referrals?.pages"
        :rows="1"
        currentPageReportTemplate="{last} из {totalRecords}"
      />
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '~/store/user';

const userStore = useUserStore();

const levels = [
  { label: 'Все уровни', id: 0 },
  { label: 1, id: 1 },
  { label: 2, id: 2 },
  { label: 3, id: 3 },
  { label: 4, id: 4 },
  { label: 5, id: 5 },
  { label: 6, id: 6 },
  { label: 7, id: 7 },
  { label: 8, id: 8 },
  { label: 9, id: 9 },
  { label: 10, id: 10 },
  { label: 11, id: 11 },
];

const formData = reactive({
  level: '',
});

// await userStore.requestReferrals(userStore.data.id)
await userStore.requestReferrals(userStore.data.id);

let page = ref(0);

watch(page, async () => {
  await userStore.requestReferrals(userStore.data.id, { page: page.value + 1, level: formData.level? formData.level : '' });
});

watch(
  () => formData.level,
  async () => {
    await userStore.requestReferrals(userStore.data.id, { level: formData.level? formData.level : '' });
  }
);
</script>

<style lang="scss" scoped>
.referalsCard {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  flex-wrap: wrap;
  margin-top: 20px;
}
@media (max-width: $x-large) {
  .referalsCard {
    grid-template-columns: repeat(1, 1fr);
    .referalsCard_container {
      width: 100%;
    }
  }
}
</style>
