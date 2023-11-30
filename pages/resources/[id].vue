<template>
  <div class="card_resource_show oneResourse container">
    <CardsResource changeLink :showAllTxt="true" :data="resourcesValue" />
  </div>
</template>

<script setup>
import { useResourceStore } from '@/store/resource';
import { useUserStore } from '@/store/user';

const route = useRoute();
const idResource = route.params.id;
const userStore = useUserStore();
const resourceStore = useResourceStore();

await resourceStore.requestOneResource(idResource, 1);

let resourcesValue = resourceStore.resources.resource;
await userStore.getUserById(resourcesValue?.userId);
</script>
