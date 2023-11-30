<template>
  <div class="points">
    <Toast />
    <div class="check">
      <div class="card-info">
        <div class="card-info__wallet_background">
          <div class="card-info__wallet">
            <div class="count-points">
              <IconsLemon style="width: 30px; height: 30px" />
              <span class="points__count">{{ Number(financeStore?.myTransactions?.points[0].lemons).toFixed(2) }}</span>
              <span class="currency currency_indent">lmn</span>
            </div>
            <span class="account-number card-info__number">1 LMN = 1 RUB</span>
          </div>
        </div>
        <button
          style="
            font-size: 16px;
            border: 2px solid black;
            width: 190px;
            font-weight: 700;
            height: fit-content;
            padding: 12px 20px;
            border-radius: 25px;
            background-color: #ffdb00;
          "
        >
          Вывести в деньги
        </button>
      </div>
      <!-- <Dialog v-model:visible="visible" modal :draggable="false" :header="currentAction" :style="{ width: '50vw' }">
        <div class="wrap-modal">
          <div class="modal-window__container">
            <form method="post">
              <div class="form__item">
                <InputText type="text" v-model.trim="idAccount" placeholder="Введите номер счета получателя" />
              </div>
              <div class="form__item">
                <InputText type="text" v-model.trim="pointCount" placeholder="Введите сумму перевода" />
              </div>
            </form>
          </div>
        </div>
        <template #footer>
          <Button label="Перевести" icon="pi pi-check" @click="sendPoints()" />
          <Button label="Отмена" icon="pi pi-times" @click="visible = false" />
        </template>
      </Dialog> -->
    </div>
    <div class="points_search">
      <InputText v-model="search_text" @input="changeNode" placeholder="Поиск" />
    </div>
    <div class="transactions">
      <div class="transactions__container">
        <CascadeSelect
          v-on:change="changeNode"
          v-model="selectedNode"
          panelClass="mymenu"
          optionValue="value"
          :options="nodes"
          optionLabel="label"
          optionGroupLabel="label"
          :optionGroupChildren="['options']"
          style="min-width: 14rem"
        />
        <div class="transactions__block balance">
          <div class="count">
            {{ Number(financeStore?.myTransactions?.points[0].lemons).toFixed(2) }}
          </div>
          <span class="transactions__text">Баланс</span>
        </div>
        <div class="transactions__block profit">
          <div class="count">
            {{ Number(financeStore?.myTransactions?.income).toFixed(2) }}
          </div>
          <span class="transactions__text">Приходы</span>
        </div>
        <div class="transactions__block expenses">
          <div class="count count_danger">0.00</div>
          <span class="transactions__text">Выведено</span>
        </div>
      </div>
    </div>
    <div class="transfer">
      <div v-for="(item, index) in financeStore.myTransactions?.transactions?.rows" :key="index" class="transfer-card">
        <div class="transfer-card__body">
          <div class="transfer-card__icon">
            <IconsLemon style="width: 45px; height: 45px" />
          </div>
          <div class="transfer-card__text">
            <span>
              {{
                new Date(item?.createdAt)?.toLocaleString('locale', {
                  year: 'numeric',
                  month: 'numeric',
                  day: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric',
                })
              }}
            </span>
            <span v-if="item?.type == 1" class="transaction-from">
              {{ `Реферальный бонус${item?.sender?.level ? `, уровень ${item?.sender?.level}` : ''}` }}
            </span>
            <span v-else-if="item?.type == 2" class="transaction-from">
              {{ userStore?.user?.id == item?.senderId ? 'Перевод пользователю' : 'Перевод от пользователя' }}
            </span>
            <span v-else-if="item?.type == 3" class="transaction-from"> Cпонсорство </span>
            <NuxtLink :to="`/profile/${item?.senderId}`">
              <span class="username">{{
                item?.senderId == userStore?.user?.id ? item?.recipient?.name : item?.sender?.name
              }}</span>
            </NuxtLink>
          </div>
          <div class="transfer-card__points">
            <span :class="`point-count point-count${item?.recipientId != userStore?.user?.id ? '_danger' : ''}`">{{
              item?.amount
            }}</span>
            <!-- <span class="point-title">{{ declOfNum(item?.amount, ['Роллар', 'Роллара', 'Ролларов']) }}</span> -->
          </div>
        </div>
      </div>
    </div>
    <div class="pagination_btns">
      <Paginator
        v-if="financeStore.myTransactions?.pages > 1"
        :template="{
          '640px': 'PrevPageLink CurrentPageReport NextPageLink',
          '960px': 'FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink',
          '1300px': 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink',
          default: 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink JumpToPageDropdown JumpToPageInput',
        }"
        v-model:first="page"
        :total-records="financeStore.myTransactions?.pages"
        :rows="1"
        currentPageReportTemplate="{last} из {totalRecords}"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useUserStore } from '~/store/user';
import { useFinanceStore } from '~/store/finance';
import { useToast } from 'primevue/usetoast';

const page = ref(0);
const userStore = useUserStore();
const financeStore = useFinanceStore();
const entityId = 2;
const selectedNode = ref({ type: 0, role: 'all' });
const nodes = ref([
  {
    label: 'Все доходы',
    options: [
      { label: 'Реферальные', value: { type: 1, role: 'recipient' } },
      { label: 'Спонсорские', value: { type: 3, role: 'recipient' } },
    ],
  },
  {
    label: 'Все транзакции',
    value: { type: 0, role: 'all' },
    // options: [{olabel: 'Все транзакции', value: '0'}]
  },
]);

await financeStore.requestTransactions(page.value + 1, selectedNode.value.type, selectedNode.value.role, entityId);

let search_text = ref('');

const selectPage = async (number) => {
  await financeStore.requestTransactions(
    number,
    selectedNode.value.type,
    selectedNode.value.role,
    entityId,
    search_text.value?.length >= 3 ? search_text.value : null
  );
};

watch(page, () => {
  selectPage(page.value + 1);
});

async function changeNode() {
  page.value = 0;
  await financeStore.requestTransactions(
    page.value + 1,
    selectedNode.value.type,
    selectedNode.value.role,
    entityId,
    search_text.value?.length >= 3 ? search_text.value : null
  );
}
</script>

<style lang="scss" scoped>
.mymenu {
  .p-cascadeselect-item-active > .p-cascadeselect-sublist {
    @media (max-width: $small) {
      top: 102%;
      left: 0%;
    }
  }
}
</style>

<style lang="scss" scoped>
.transactions__container {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  max-width: 700px;
  width: 100%;
  @media (max-width: $small) {
    flex-direction: column;
    gap: 30px;
  }
}
.card-info__wallet_background {
  border: 4px solid black;
  border-radius: 15px;
}
.card-info__wallet {
  // width: 170px;
  padding: 20px;
  border-radius: 10px;
  border: 4px solid #ffdb00;
  background-color: #fff;
}
.card-info {
  display: flex;
  align-items: center;
  margin-top: 50px;
  gap: 80px;
  @media (max-width: $small) {
    flex-direction: column;
    gap: 30px;
  }
}

.count-points {
  display: flex;
  align-items: center;
}
.points__count {
  margin: 0 5px 0 10px;
  font-size: 32px;
  line-height: 39px;
}
.currency {
  font-size: 16px;
  line-height: 19px;
  color: #18af10;
  text-transform: uppercase;
}
.currency_indent {
  margin-top: 10px;
}
.account-number {
  font-size: 12px;
  line-height: 16px;
  color: #666666;
}
.copy-numbers {
  font-size: 14px;
  line-height: 18px;
  color: #666666;
  cursor: pointer;
}
.card-info__number {
  margin-top: 10px;
}
.card-info__numbers {
  display: flex;
  flex-direction: column;
  span {
    margin: 5px 0;
  }
}
.account-number_black-color {
  font-size: 18px;
  line-height: 24px;
  color: #000000;
}
.transfer-points {
  font-size: 13px;
  line-height: 17px;
  letter-spacing: 0.05em;
  color: #ffffff;
  padding: 13px 11px;
  text-transform: none;
  background: #18af10;
  margin-top: 34px;
  border-radius: 10px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.25);
}

.points_search {
  padding-top: 30px;
}

.transactions {
  margin-top: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.count {
  display: inline-block;
  padding: 12px 28px;
  border: 1px solid #2c96ea;
  border-radius: 12px;
  font-size: 20px;
  line-height: 24px;
  color: #18af10;
}
.count_danger {
  color: #f23737;
}
.transactions__block {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.transactions__text {
  font-size: 16px;
  line-height: 21px;
  letter-spacing: 0.05em;
  color: rgba(0, 0, 0, 0.6);
}
.transactions__container .p-treeselect {
  height: 53px;
  display: flex;
  align-items: center;
}

// Карточки переводов

.transfer {
  margin-top: 30px;
}
.transfer-card__body {
  padding: 10px 0;
  max-width: 700px;
  display: flex;
  align-items: center;
  background-color: #f6f6f6;
  border-top: 1px solid #d9d9d9;
  border-bottom: 1px solid #d9d9d9;
  // justify-content: center;
}
.transfer-card__body_transfer {
  background-color: #ffffff;
}
.transfer-card__text {
  display: flex;
  flex-direction: column;
  margin-left: 25px;
  width: 50%;
  gap: 4px;
}
.transfer-card__icon {
  margin-left: 20px;
}
.username {
  font-size: 15px;
  line-height: 26px;
  color: #2c96ea;
}
.transaction-from {
  font-size: 20px;
  line-height: 17px;
  color: #6c6c6c;
}
.point-count {
  font-size: 32px;
  line-height: 42px;
  color: #01c314;
}
.point-count_danger {
  color: #f23838 !important;
}
.point-title {
  font-size: 13px;
  line-height: 17px;
  color: #6c6c6c;
  margin-left: 5px;
}
</style>
