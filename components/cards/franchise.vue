<template>
  <BlocksSkeleton v-if="skeleton"></BlocksSkeleton>

  <div class="lastFranchise-card" v-else-if="props?.data?.user">
    <nuxt-link :to="`/profile/${props?.data?.user?.id}`">
      <div class="avatar_container">
        <img loading="lazy"  v-if="props.data?.user?.avatar" class="avatar" :src="`${url}/api/public${props?.data?.user?.avatar}`" />
        <div v-else class="avatar avatar-img"></div>
      </div>
    </nuxt-link>
    <div class="lastFranchise-card_info">
      <nuxt-link :to="`/profile/${props?.data?.user?.id}`">
        <div class="userName">{{ props?.data?.resource?.franchise?.label }}</div>
      </nuxt-link>
      <div class="tags">{{ props?.data?.category?.label }} - {{ props?.data?.country?.label }}</div>
      <div class="usersLink">
        <!-- <a href="">
                    {{ props?.data?.user?.name }}
                </a> -->
        <nuxt-link :to="`/profile/${props?.data?.user?.id}`" @click="scrollIntoView()">{{
          props?.data?.user?.name
        }}</nuxt-link>
      </div>
      <div class="labels">
        {{ props?.data?.user?.city?.region?.country?.label ? `${props?.data?.user?.city?.region?.country?.label},` : '' }}
        {{ checkRegion(props?.data?.user?.city?.region?.label, props?.data?.user?.city?.label) }}
      </div>
      <div class="data">
        {{ props?.data?.createdAt ? new Date(props?.data?.createdAt).toLocaleDateString() : '' }}
      </div>
    </div>
  </div>
  <div class="lastFranchise-card" v-else-if="props?.data?.franchise?.id">
    <!-- <nuxt-link :to="`/franchises/${props?.data?.franchise?.id}`">
            <div class="avatar_container">
                <img loading="lazy"  v-if="props.data?.user?.avatar" class="avatar" :src="`${url}/api/public${props?.data?.user?.avatar}`" />
                <div v-else class="avatar avatar-img"></div>
            </div>
        </nuxt-link> -->
    <div class="avatar_container">
      <img loading="lazy"  v-if="props.data?.user?.avatar" class="avatar" :src="`${url}/api/public${props?.data?.user?.avatar}`" />
      <div v-else class="avatar avatar-img"></div>
    </div>
    <div class="lastFranchise-card_info">
      <!-- <nuxt-link :to="`/franchises/${props?.data?.franchise?.id}`">
                <div class="userName">{{ props?.data?.franchise?.label }}</div>
            </nuxt-link> -->
      <div class="userName">{{ props?.data?.franchise?.label }}</div>
      <div
        class="usersTxt"
        style="word-break: break-all"
        :class="{ showAllTxtCard: !props?.showAllTxt, allTxt: props?.showAllTxt }"
      >
        <slot>{{ props?.data?.franchise?.description }}</slot>
      </div>
      <div class="data">
        {{ props?.data?.createdAt ? new Date(props?.data?.createdAt).toLocaleDateString() : '' }}
      </div>
    </div>
  </div>
  <div class="lastFranchise-card" v-else>
    <!-- <nuxt-link :to="`/franchises/${props?.data?.id}`">
            <div class="avatar_container">
                <img loading="lazy"  v-if="props.data?.user?.avatar" class="avatar" :src="`${url}/api/public${props?.data?.user?.avatar}`" />
                <div v-else class="avatar avatar-img"></div>
            </div>
        </nuxt-link> -->
    <div class="avatar_container">
      <img loading="lazy"  v-if="props?.data?.picture" class="avatar" :src="`${url}/api/public${props?.data?.picture}`" />
      <div v-else class="avatar avatar-img"></div>
    </div>
    <div class="lastFranchise-card_info">
      <!-- <nuxt-link :to="`/franchises/${props?.data?.id}`">
                <div class="userName">{{ props?.data?.label }}</div>
            </nuxt-link> -->
      <div class="userName">{{ props?.data?.label }}</div>
      <div
        class="usersTxt"
        style="word-break: break-all"
        :class="{ showAllTxtCard: !props?.showAllTxt, allTxt: props?.showAllTxt }"
      >
        <slot>{{ props?.data?.description }}</slot>
      </div>
      <div class="data">
        {{ props?.data?.createdAt ? new Date(props?.data?.createdAt).toLocaleDateString() : '' }}
      </div>
    </div>
  </div>
</template>

<script setup>
import url from '~/store/config';
const props = defineProps(['data', 'showAllTxt']);

const skeleton = ref(true);

onMounted(async () => {
  skeleton.value = false;
});
</script>

<style lang="scss" scoped>
.lastFranchise-card {
  &_info {
    .labels {
      word-break: break-all;
      color: #6c6c6c;
      font-size: 15px;
    }
  }
}
</style>
