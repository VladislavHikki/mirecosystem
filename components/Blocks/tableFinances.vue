<template>
  <div class="transaction">
    <h1 class="page-subtitle">Роллары</h1>
    <div class="transaction_content">
      <DataTable
        table-style="width: 100%"
        v-model:selection="finance"
        :value="getFilter(financeStore?.allTransactions?.transactions?.rows)"
        tableClass="editable-cells-table"
        tableStyle="min-width: 50rem"
        v-model:filters="filters"
      >
        <template #header>
          <div class="flex justify-content-end">
            <span class="p-input-icon-left">
              <i class="pi pi-search" />
              <InputText
                @input="searchTransaction($event.target.value)"
                v-model="filters['global'].value"
                placeholder="Поиск"
              />
            </span>
          </div>
        </template>
        <Column field="sender.account" header="Номер счета отправителя"> </Column>
        <Column field="sender.name" header="Имя отправителя"></Column>
        <Column field="recipient.account" header="Номер счета получателя"></Column>
        <Column field="recipient.name" header="Имя получателя"></Column>
        <Column field="amount" header="Сумма перевода"></Column>
        <Column field="createdAt" header="Дата транзакции">
          <template #body="slotProps">
            {{ new Date(slotProps.data.createdAt).toLocaleString() }}
          </template>
        </Column>
      </DataTable>
      <div class="pagination_btns">
        <Paginator
          v-if="financeStore?.allTransactions?.transactions?.rows?.length"
          :template="{
            '640px': 'PrevPageLink CurrentPageReport NextPageLink',
            '960px': 'FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink',
            '1300px': 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink',
            default: 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink JumpToPageDropdown JumpToPageInput',
          }"
          v-model:first="page"
          :total-records="financeStore?.allTransactions?.pages"
          :rows="1"
          currentPageReportTemplate="{last} из {totalRecords}"
        />
      </div>
      <div class="transaction_content_result">
        {{ declOfNum(financeStore?.allTransactions?.transactions?.count, ['Показан', 'Показано', 'Показано']) }}
        {{ financeStore?.allTransactions?.transactions?.rows.length }}
        {{ declOfNum(financeStore?.allTransactions?.transactions?.count, ['результат', 'результата', 'результатов']) }}
      </div>
      <!-- <div class="transaction_content_info">
                    <div class="transaction_content_h">
                    <input type="checkbox"
                        v-model="mainCheckBoxIsCheck"
                        :checked="mainCheckBoxIsCheck"
                    >
                    <h2>Номер счета отправителя</h2>
                    <h2>Имя отправителя</h2>
                    <h2>Номер счета получателя</h2>
                    <h2>Имя получателя</h2>
                    <h2>Сумма перевода, ₽</h2>
                    <h2>ДЕЙСТВИЯ</h2>
                </div>
                    <div class="transaction_content_info_item"
                        v-for="(value, index) in transactionPeopleCount"
                        :key="index"
                    >
                        <input type="checkbox"
                            :checked="mainCheckBoxIsCheck"
                        >
                        <div class="senderNumber">
                            0123456789
                        </div>
                        <div class="senderName">
                            Дробышева Ирина
                        </div>
                        <div class="recipientNumber">
                            9876543210
                        </div>
                        <div class="recipientName">
                            Оконкин Иван
                        </div>
                        <div class="money">
                            150
                        </div>
                        <div class="transaction_operation">
                            <button class="delete"></button>
                            <button class="dop">***</button>
                        </div>
                    </div>
                </div> -->
    </div>
  </div>
</template>

<script setup>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import InputNumber from 'primevue/inputnumber';
import InputText from 'primevue/inputtext';
import { useFinanceStore } from '~/store/finance';
import { getSortWhereSenderName } from '@/store/sort';
import { FilterMatchMode } from 'primevue/api';

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});
const params = ref({
  strsearch: null,
});

const page = ref(0);
const financeStore = useFinanceStore();

onMounted(async () => {
  await financeStore.requestAllTransactions(1, params.value);
});

const selectPage = async (number) => {
  await financeStore.requestAllTransactions(number, params.value);
};

watch(page, () => {
  selectPage(page.value + 1);
});

async function searchTransaction(event) {
  params.value.strsearch = event;
  await financeStore.requestAllTransactions(page.value + 1, params.value);
}

const finance = ref(null);
const editingRows = ref([]);
const onRowEditSave = (event) => {
  let { newData, index } = event;

  selectedFinance[index] = newData;
};
let mainCheckBoxIsCheck = ref(false);

function getFilter(arr) {
  let filterArr = null;
  if (arr?.length) {
    filterArr = arr;
    for (let i = 0; i < filterArr.length; ++i) {
      if (!filterArr[i].sender) {
        filterArr[i].sender = { name: 'Данные удалены', account: 'Данные удалены' };
      }
      if (!filterArr[i].recipient) {
        filterArr[i].recipient = { name: 'Данные удалены', account: 'Данные удалены' };
      }
    }
    return filterArr;
  }
  return arr;
}
</script>
