<template>
  <div class="referal__search">
    <section>
      <section style="display: flex; gap: 20px">
        <h1 class="referal_h">Рефералка</h1>
        <div class="referal__search-header">
          <div class="find">
            <InputText @input="search" v-model="formData.text" type="text" placeholder="Поиск" />
            <button class="find_btn" type="submit" />
          </div>
        </div>
      </section>
      <div>
        <div class="referal__search-header">
          <div class="referal__search-title">
            <h1 class="card_h">Топ-20 рефереров</h1>
          </div>
          <h2
            @click="changeDate('null')"
            class="page-subtitle teams_form_item_tabs_item"
            :class="dates[0] == null ? 'teams_form_item_tabs_item--active' : 'teams_form_item_tabs_item--disabled'"
          >
            С начала
          </h2>
          <h2
            @click="changeDate('month')"
            class="page-subtitle teams_form_item_tabs_item"
            :class="dates == defDates ? 'teams_form_item_tabs_item--active' : 'teams_form_item_tabs_item--disabled'"
          >
            Этот месяц
          </h2>
          <div>
            <Calendar
              style="border-radius: 10px 0 !important"
              v-model="dates"
              selectionMode="range"
              :manualInput="false"
              icon="pi-calendar"
            />
            <Button class="" icon="pi pi-calendar" />
          </div>
        </div>
        <div class="referals_order">
          <h2
            @click="order = 'ucpd'"
            class="page-subtitle teams_form_item_tabs_item"
            :class="order == 'ucpd' ? 'teams_form_item_tabs_item--active' : 'teams_form_item_tabs_item--disabled'"
          >
            По УКПД
          </h2>
          <h2
            @click="order = 'cpd'"
            class="page-subtitle teams_form_item_tabs_item"
            :class="order == 'cpd' ? 'teams_form_item_tabs_item--active' : 'teams_form_item_tabs_item--disabled'"
          >
            По КПД
          </h2>
          <h2
            @click="order = null"
            class="page-subtitle teams_form_item_tabs_item"
            :class="order == null ? 'teams_form_item_tabs_item--active' : 'teams_form_item_tabs_item--disabled'"
          >
            По рефералам
          </h2>
          <h2
            @click="order = 'levels'"
            class="page-subtitle teams_form_item_tabs_item"
            :class="order == 'levels' ? 'teams_form_item_tabs_item--active' : 'teams_form_item_tabs_item--disabled'"
          >
            По уровням
          </h2>
          <h2
            @click="order = 'forward'"
            class="page-subtitle teams_form_item_tabs_item"
            :class="order == 'forward' ? 'teams_form_item_tabs_item--active' : 'teams_form_item_tabs_item--disabled'"
          >
            По прямым
          </h2>
          <h2
            @click="order = 'indirect'"
            class="page-subtitle teams_form_item_tabs_item"
            :class="order == 'indirect' ? 'teams_form_item_tabs_item--active' : 'teams_form_item_tabs_item--disabled'"
          >
            По косвенным
          </h2>
        </div>
        <div class="leaders-referals-cards">
          <div class="leaders-referals-card_container" v-for="(value, index) in getArr()" :key="index">
            <CardsReferal :data="value"> </CardsReferal>
          </div>
        </div>
        <div class="warning" v-if="formData.text && !userStore?.userList?.users?.rows?.length">
          <h2>Таких полизователей нет</h2>
        </div>
        <div class="pagination_btns">
          <Paginator
            v-if="userStore.userList?.pages > 1"
            :template="{
              '640px': 'PrevPageLink CurrentPageReport NextPageLink',
              '960px': 'FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink',
              '1300px': 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink',
              default: 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink JumpToPageDropdown JumpToPageInput',
            }"
            v-model:first="currentPage"
            :total-records="userStore?.userList?.pages"
            :rows="1"
            currentPageReportTemplate="{last} из {totalRecords}"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useUserStore } from '@/store/user';
import { getSortWhereName } from '@/store/sort';
import { ref } from 'vue';

const userStore = useUserStore();
const router = useRouter();
const route = useRoute();
let page = ref(route.query.page || 1);
const currentPage = ref(0);
const dates = ref([]);
const defDates = ref(1);
const order = ref('ucpd');

const changeDate = (type) => {
  if (type === 'null') {
    dates.value = [];
  } else if (type === 'month') {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const formattedMonth = month < 10 ? `0${month}` : month;
    dates.value = `${year}-${formattedMonth}-01`;
    return (defDates.value = dates.value);
  }
};

const change = (type) => {
  order.value = type;
};

watch(currentPage, () => {
  selectPage(currentPage.value + 1);
});

const formData = reactive({
  text: route?.query?.text || null,
  role: route?.query?.role || null,
});

if (!formData?.text) {
  await userStore.requestLeaderReferrals({ amount: 20 });
} else {
  await userStore.searchUsers(page.value, formData);
}

watch(order, async () => {
  await userStore.requestLeaderReferrals({ amount: 20, order: order.value });
});

watch(dates, async () => {
  let formattedDates;
  let startedAt;
  let finishedAt;
  if (Array.isArray(dates.value)) {
    formattedDates = dates.value.map((dateString) => {
      if (dateString == null) return;
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      let formattedMonth = month < 10 ? `0${month}` : month;

      return `${year}-${formattedMonth}-01`;
    });
    startedAt = formattedDates[0];
    finishedAt = formattedDates[1];
  } else {
    startedAt = dates.value;
  }
  await userStore.requestLeaderReferrals({
    amount: 20,
    order: order.value,
    startedAt,
    finishedAt,
  });
});

const selectPage = async (number) => {
  router.push(
    `${route.path}?page=${number}${formData?.text ? `&text=${formData?.text}` : ''}${
      formData?.role ? `&role=${formData?.role}` : ''
    }`
  );
  if (!formData?.text) {
    await userStore.requestLeaderReferrals({ amount: 20 });
    currentPage.value = 0;
  } else {
    await userStore.searchUsers(number, formData);
  }
};

function getArr() {
  if (formData.text) return userStore.userList?.users?.rows;
  else return userStore?.leaderReferrals?.referers;
}

const search = async () => {
  router.push(`${route.path}?page=1&text=${formData?.text || ''}${formData?.role ? `&role=${formData?.role}` : ''}`);
  if (!formData?.text) {
    await userStore.requestLeaderReferrals({ amount: 20 });
    currentPage.value = 0;
  } else {
    await userStore.searchUsers(1, formData);
    currentPage.value = 0;
  }
};
</script>

<style lang="scss" scoped>
.referals_order {
  display: flex;
  gap: 20px;
}

.referal__search {
  @media screen and (max-width: $x-small) {
    width: 100%;
  }
  h1 {
    font-size: 32px;
  }
  .p-paginator {
    background: transparent;
  }
  &-header {
    align-items: center;
    display: flex;
    gap: 20px;
    margin-bottom: 20px !important;
    @media screen and (max-width: $x-small) {
      flex-direction: column;
    }
    &-title {
      display: flex;
      align-items: center;
      gap: 0px 30px;
      @media screen and (max-width: $x-small) {
        flex-direction: column;
        align-items: flex-start;
        gap: 0px;
      }
    }
    .find {
      display: flex;
      justify-content: center;
      input {
        max-width: 311px;
        width: 100%;
        padding-left: 15px;
        height: 43px;
        background: #ffffff;
        border-radius: 14px 0 0 14px;
        box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.25);
        @media screen and (max-width: $x-small) {
          max-width: 100%;
        }
      }
      .find_btn {
        margin: 0 !important;
        padding: 0;
        background: #2c96ea;
        background-image: url(~/assets/images/find.png);
        background-size: 20px 20px;
        background-position: center center;
        background-repeat: no-repeat;
        width: 55px;
        height: 43px;
        border-radius: 0px 14px 14px 0px;
        box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.25);
      }
      @media screen and (max-width: $x-small) {
        margin-left: 0px;
      }
    }
  }
}

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
