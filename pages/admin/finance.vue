<template>
  <div class="adminFinance container">
    <div class="adminControl_btns">
      <Dialog v-model:visible="addLemon" :draggable="false" modal header="Выпустить лимоны">
            <ModalsAddLemon />
      </Dialog>
      <Dialog v-model:visible="addFinacist" :draggable="false" modal header="Добавить финансиста">
            <ModalsAddFinancist />
      </Dialog>
      <div class="adminControl_btns_item">
        <Button @click="current_file = 'tableFinances'" label="Роллары" />
        <Button @click="current_file = 'tableLemons'" label="Лимоны" />
        <Button @click="current_file = 'tableFinance'" label="Финансисты" />
      </div>
      <div class="adminControl_btns_items">
        <Button severity="success" @click="(addFinacist = true)" label="Добавить финансиста" />
        <Button severity="success" @click="(addLemon = true) " label="Выпустить Лимоны" />
      </div>
    </div>
    <KeepAlive>
      <current_tab />
    </KeepAlive>
  </div>
</template>

<script setup>

import loading from '~/components/UI/loading.vue';
import url from '~~/store/config';

let addFinacist = ref(false);

let addLemon = ref(false);

const props = defineProps(['data']);
const current_file = ref('tableFinances');

const current_tab = computed({
  get() {
    return current_file.value
      ? defineAsyncComponent({
          loader: () => import(`../../components/Blocks/${current_file.value}.vue`),
          loadingComponent: loading,
        })
      : null;
  },
});
</script>

<style lang="scss">
.adminFinance {
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 100%;
  .adminControl_btns {
    display: flex;
    width: 100%;
    justify-content: space-between;
    .adminControl_btns_item:nth-child(1) {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
    }
    .adminControl_btns_items:nth-child(2) {
      display: flex;
      align-items: center;
      gap: 12px;
      
      .find_btn {
        background: #2ca8ff;
        box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.25);
        border-radius: 7px;
        background-image: url(~/assets/images/find.png);
        background-repeat: no-repeat;
        background-position: left 10px center;
        padding-left: 40px;
        padding-right: 14px;
        width: 150px;
        align-self: flex-end;
      }
    }
  }
  .transaction {
    h1 {
      margin-bottom: 20px;
    }
    width: 100%;
    background: #ffffff;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.25);
    border-radius: 7px;
    padding: 23px 48px;
    .transaction_content {
      width: 100%;
      .transaction_content_h {
        min-width: 940px;
        padding-left: 28px;
        width: 100%;
        display: flex;
        align-items: center;
        font-size: 15px;
        justify-content: space-between;
        padding-bottom: 20px;
        h2 {
          font-size: 15px;
          width: 14.2%;
          margin: 0;
        }
        color: #bbbbbb;
        input {
          width: 26px;
          height: 26px;
        }
      }
      .transaction_content_info {
        width: 100%;
        overflow-x: auto;
        .transaction_content_info_item {
          min-width: 940px;
          display: flex;
          padding: 20px 0;
          padding-left: 28px;
          border-bottom: 1px solid #d9d9d9;
          border-top: 1px solid #d9d9d9;
          width: 100%;
          justify-content: space-between;
          align-items: center;
          font-size: 15px;
          color: #989898;
          background-color: #f6f6f6;
          .senderNumber {
            color: #2ca8ff;
            width: 14.2%;
          }
          .recipientNumber {
            width: 14.2%;
          }
          .senderName {
            width: 14.2%;
          }
          .recipientName {
            width: 14.2%;
          }
          .money {
            width: 14.2%;
          }
          input {
            width: 26px;
            height: 26px;
          }
          .transaction_operation {
            display: flex;
            gap: 11px;
            width: 14.2%;
          }
        }
        .transaction_content_info_item:nth-child(2n) {
          background-color: white;
          border: none;
        }
      }
      .transaction_content_result {
        margin-top: 26px;
        font-size: 15px;
        color: #bbbbbb;
      }
    }
  }
}
</style>
