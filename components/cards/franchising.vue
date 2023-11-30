<template>
  <BlocksSkeleton v-if="skeleton"></BlocksSkeleton>

  <div v-else class="franchisingLeaders-card">
    <nuxt-link :to="`/profile/${props.data?.id}`">
      <div class="avatar_container">
        <img loading="lazy"  v-if="props?.data?.avatar" class="avatar" :src="`${url}/api/public${props?.data?.avatar}`" />
        <div v-else class="avatar avatar-img"></div>
      </div>
    </nuxt-link>
    <div class="franchisingLeaders-card_info">
      <div class="usersLink">
        <nuxt-link :to="`/profile/${props.data.id}`">
          {{ props.data.name }}
        </nuxt-link>
      </div>
      <div class="franchiseCount">
        <p>
          {{ props.data.francount }}
          {{ declOfNum(props.data.francount, ['франшиза', 'франшизы', 'франшиз']) }}
        </p>
      </div>
    </div>
    <div v-if="showIndex" class="index_card">
      <div class="index_card_num">
        <slot></slot>
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
