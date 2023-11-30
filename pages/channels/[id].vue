<template>
  <div class="container">
    <div class="channels">
      <h2 class="page-title">
        Все каналы и чаты франшизы {{ resourceStore?.allChannelsByFranchise?.franchise?.label }}
      </h2>
      <div v-if="resourceStore?.allChannelsByFranchise?.channels?.rows?.length">
        <h2  class="page-subtitle" style="margin-bottom: 20px !important; padding-top: 20px;">Каналы</h2>
        <div class="channels_item">
          <div
            class="channels_container"
            v-for="(value, index) in resourceStore?.allChannelsByFranchise?.channels?.rows"
            :key="index"
          >
            <CardsResource style="margin-bottom: 20px" :data="value" />
          </div>
        </div>
        <div class="pagination" style="display: flex">
          <Paginator
            v-if="resourceStore?.allChannelsByFranchise?.pages > 1"
            :template="{
              '640px': 'PrevPageLink CurrentPageReport NextPageLink',
              '960px': 'FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink',
              '1300px': 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink',
              default: 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink JumpToPageDropdown JumpToPageInput',
            }"
            v-model:first="currentPageChannels"
            :rows="1"
            :total-records="resourceStore?.allChannelsByFranchise?.pages"
            currentPageReportTemplate="{last} из {totalRecords}"
          />
        </div>
      </div>

      <div>
        <div v-if="resourceStore?.allChatsByFranchise?.chats?.rows?.length">
          <h2 class="page-subtitle" style="margin-bottom: 20px; padding-top: 20px;">Чаты</h2>
          <div class="channels_item">
            <div
              class="channels_container"
              v-for="(value, index) in resourceStore?.allChatsByFranchise?.chats?.rows"
              :key="index"
            >
              <CardsResource style="margin-bottom: 20px" :data="value" />
            </div>
          </div>
          <div class="pagination" style="display: flex">
            <Paginator
              v-if="resourceStore?.allChatsByFranchise?.pages > 1"
              :template="{
                '640px': 'PrevPageLink CurrentPageReport NextPageLink',
                '960px': 'FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink',
                '1300px': 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink',
                default: 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink JumpToPageDropdown JumpToPageInput',
              }"
              v-model:first="currentPageChats"
              :rows="1"
              :total-records="resourceStore?.allChatsByFranchise?.pages"
              currentPageReportTemplate="{last} из {totalRecords}"
            />
          </div>
        </div>
      </div>

      <div
        class="warning"
        v-if="
          !resourceStore?.allChatsByFranchise?.chats?.rows?.length &&
          !resourceStore?.allChannelsByFranchise?.channels?.rows?.length
        "
      >
        <h2 class="page-subtitle" style="padding-top: 20px;">Каналов и чатов этой франшизы нет</h2>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useResourceStore } from '@/store/resource';

let currentPageChannels = ref(0);
let currentPageChats = ref(0);
const route = useRoute();
const resourceStore = useResourceStore();

await resourceStore.getChannelsByFranshiseId(route.params.id, 1);
await resourceStore.getChatsByFranshiseId(route.params.id, 1);

async function changePageChannels(newPage) {
  await resourceStore.getChannelsByFranshiseId(route.params.id, newPage);
}

async function changePageChats(newPage) {
  await resourceStore.getChatsByFranshiseId(route.params.id, newPage);
}

watch(currentPageChannels, () => {
  changePageChannels(currentPageChannels.value + 1);
});

watch(currentPageChats, () => {
  changePageChats(currentPageChats.value + 1);
});
</script>

<style lang="scss" scoped>
.p-paginator {
  background: transparent;
}
.channels {
  .p-dropdown {
    margin-bottom: 0 !important;
  }
  .chats,
  .channels_item {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
    font-weight: 400;
  }
  .channels_cards_container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
    font-weight: 400;
  }
}
@media (max-width: $large) {
  .channels {
    .chats,
    .channels_item {
      grid-template-columns: repeat(1, 1fr);
    }
    .channels_cards_container {
      grid-template-columns: repeat(1, 1fr);
    }
  }
}
</style>
