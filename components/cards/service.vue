<template>
  <div class="service-card">
    <NuxtLink :to="info?.active? info.url : `/uc`" class="service-card_picture">
      <img width="80" height="80" :src="`${url}/api/${info?.picture}`" alt="" />
    </NuxtLink>
    <div class="service-card_content">
      <div class="service-card_content_label">
        {{ info?.label }}
      </div>
      <div class="service-card_content_like" @click="save(info?.id)">
        <i v-if="!info?.saved" class="pi pi-heart"></i>
        <i v-else class="pi pi-heart-fill" style="color: red;"></i>
      </div>
    </div>
  </div>
</template>

<script setup>
import url from '~/store/config';
import { useServicesStore } from '~/store/services';

const servicesStore = useServicesStore();
const props = defineProps({
  info: {
    type: Object,
    default: null,
  },
});

const save = async (id) => {
    let form = new FormData();
    form.append("serviceId", id);
    const result = await servicesStore.saveService(form);
}
</script>

<style lang="scss" scoped>
.service-card {
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
  &_picture > img {
    object-fit: contain;
  }

  &_content {
    display: flex;
    gap: 12px;
    &_like {
        cursor: pointer;
    }
  }
}
</style>
