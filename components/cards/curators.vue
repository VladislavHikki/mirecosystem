<template>
    <BlocksSkeleton v-if="skeleton"></BlocksSkeleton>
    <div v-else-if="props?.data?.id" class="referalsLeaders-card" lang="ru">
      <nuxt-link :to="`/profile/${props.data.id}`">
        <div class="avatar_container">
          <img loading="lazy" v-if="props.data?.avatar" class="avatar" :src="`${url}/api/public${props.data?.avatar}`" />
          <div v-else class="avatar avatar-img"></div>
        </div>
      </nuxt-link>
      <div :class="{ border_add: showIndex }" class="referalsLeaders-card_info">
        <div class="usersLink">
          <nuxt-link :to="`/profile/${props?.data?.id}`">
            {{ props.data?.name }}
          </nuxt-link>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import url from '~/store/config';
  
  const props = defineProps(['data']);
  
  const skeleton = ref(true);
  
  onMounted(async () => {
    skeleton.value = false;
  });
  </script>
  
  <style lang="scss" scoped>
  .graduatesCount {
    color: #6c6c6c;
    font-size: 15px;
  }
  </style>  