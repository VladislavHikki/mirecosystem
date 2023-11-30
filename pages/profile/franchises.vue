<template>
  <div class="myFranchises container">
    <h1>Мои франшизы</h1>
    <div class="myFranchises_cards" v-if="getFranchiseWithoutNull(userStore?.getFranchises)?.length">
      <div
        class="myFranchises_card_container"
        v-for="(value, index) in getFranchiseWithoutNull(userStore?.getFranchises)"
        :key="index"
      >
        <nuxt-link :to="`/channels/${value?.franchise?.id}page${1}`">
          <CardsFranchise :data="value?.franchise" />
        </nuxt-link>
      </div>
    </div>
    <div class="message" v-else>
      <h2>У вас нет франшиз</h2>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '~/store/user';

const userStore = useUserStore();
await userStore.requestProfile(userStore.data.id);

function getLink(id) {
  let link = `/resources?page=1&text=&project=&category=&franchise=${id}&country=&region=&city=`;
  return link;
}

function getFranchiseWithoutNull(arr) {
  let sortFranchise = [];
  for (let i = 0; i < arr?.length; ++i) {
    if (arr[i]?.franchise) sortFranchise.push(arr[i]);
  }
  return sortFranchise;
}
</script>

<style lang="scss">
.myFranchises {
  h1 {
    margin-bottom: 41px;
  }
  .myFranchises_cards {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  }
  .myFranchises_card_container {
    width: 498px;
  }
}

@media (max-width: $large) {
  .myFranchises {
    .myFranchises_card_container {
      width: 100%;
    }
  }
}
</style>
