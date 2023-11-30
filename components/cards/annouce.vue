<template>
  <BlocksSkeleton v-if="skeleton"></BlocksSkeleton>
  <div v-else class="lastResource-card" lang="ru">
    <div class="avatar_container">
      <img loading="lazy" v-if="props?.data?.picture" class="avatar" :src="`${url}/api/public${props?.data?.picture}`" />
      <div v-else class="avatar"></div>
    </div>
    <div class="lastResource-card_info">
      <div class="userName">
        {{ props?.data?.label }}
      </div>
      <div class="usersLink">
        <p>
          Автор:

          <nuxt-link :to="`/profile/${props?.data?.user?.id}`">
            {{ props?.data?.user?.name }}
          </nuxt-link>
        </p>
      </div>
      <div class="usersTxt" :class="{ showAllTxtCard: !showAllTxt }">
        <slot>{{ props?.data?.description }}</slot>
      </div>
      <div class="data">
        {{ new Date(props?.data?.createdAt).toLocaleString() ?? '' }}
      </div>
    </div>
  </div>
</template>

<script setup scoped>
import url from '~/store/config.js';

const props = defineProps(['data', 'showAllTxt']);

const skeleton = ref(true);

onMounted(async () => {
  skeleton.value = false;
});
// export default {
//   props: {
//     userName: String,
//     usersLink: String,
//     tags: String,
//     data: String,
//     showAllTxt: Boolean,
//   },
// };
</script>
