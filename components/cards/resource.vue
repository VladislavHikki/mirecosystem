<template>
  <!-- Skeleton -->
  <BlocksSkeleton v-if="skeleton"></BlocksSkeleton>
  <div
    class="lastResource-card"
    lang="ru"
    :class="{ 'lastResource-card_by_resource_id': route.path == `/resources/${route.params.id}` }"
    v-else-if="props?.data?.resource"
  >
    <nuxt-link :to="`/resources/${props?.data?.resource?.id}`">
      <div class="avatar_container">
        <img
          loading="lazy"
          v-if="props?.data?.resource?.picture"
          class="avatar"
          :src="`${url}/api/public${props?.data?.resource?.picture}`"
        />
        <div v-else class="avatar avatar-img"></div>
      </div>
    </nuxt-link>
    <div class="lastResource-card_info">
      <div
        class="userName"
        style="word-break: break-all"
        :class="{ showAllTxtCard: !props?.showAllTxt, allTxt: props?.showAllTxt }"
      >
        <nuxt-link :to="`/resources/${props?.data?.resource?.id}`">{{ props?.data?.resource?.label }}</nuxt-link>
      </div>
      <div class="usersLink">
        <slot name="usersLink" :class="{ showAllTxtCard: !props?.showAllTxt }">
          <a
            v-if="props?.data?.resource?.url?.startsWith('https://') || props?.data?.resource?.url?.startsWith('http://')"
            :href="`${props?.data?.resource?.url}`"
            target="_blank"
          >
            {{ props?.data?.resource?.url }}
          </a>
          <p v-else :style="{ color: '#000000' }">
            {{ props?.data?.resource?.url }}
          </p>
        </slot>
      </div>
      <div class="usersTxt" :class="{ showAllTxtCard: !props?.showAllTxt, allTxt: props?.showAllTxt }">
        <slot>{{ getDescription(props?.data?.resource?.description) }}</slot>
      </div>
      <nuxt-link :to="`/resources/?page=1&category=${props?.data?.categoryId}`">
        <div class="tags">{{ props?.data?.resource?.category?.label }}</div>
      </nuxt-link>
      <div class="data">
        {{ props?.data?.resource?.createdAt ? new Date(props?.data?.resource?.createdAt).toLocaleDateString() : '' }}
      </div>
    </div>
  </div>
  <div
    lang="ru"
    class="lastResource-card"
    :class="{ 'lastResource-card_by_resource_id': route.path == `/resources/${route.params.id}` }"
    v-else
  >
    <!-- <nuxt-link :to="`/resources/${props?.data?.id}`">
            <div class="avatar_container">
                <img loading="lazy"  v-if="props?.data?.picture" class="avatar" :src="`${url}/api/public${props?.data?.picture}`" />
                <div v-else class="avatar avatar-img"></div>
            </div>
        </nuxt-link> -->
    <NuxtLink :target="changeLink ? '_blank' : null" :to="changeLink ? data?.url : `/resources/${props?.data?.id}`">
      <div class="avatar_container">
        <img loading="lazy" v-if="props?.data?.picture" class="avatar" :src="`${url}/api/public${props?.data?.picture}`" />
        <div v-else class="avatar avatar-img"></div>
      </div>
    </NuxtLink>
    <div
      class="lastResource-card_info"
      style="hyphens: auto"
      :class="{ 'lastResource-card_info_by_resource_id': route.path == `/resources/${route.params.id}` }"
    >
      <div class="userName" v-if="props?.data?.categoryLabel != 'Новости региона' && props?.data?.categoryLabel != 'Новости города'">
        {{ data?.city?.label }}
      </div>
      <NuxtLink :to="`/resources/${props?.data?.id}`">
        <div
          class="userName"
          :style="{ display: route.path == `/resources/${route.params.id}` ? 'inline' : '-webkit-box' }"
          :class="{ showAllTxtCard: !props?.showAllTxt }"
        >
          <!-- <nuxt-link :to="`/resources/${props?.data?.id}`">{{ props?.data?.label }}</nuxt-link> -->
          {{ props?.data?.label }}
        </div>
      </NuxtLink>
      <div
        class="usersLink"
        :style="{ display: route.path == `/resources/${route.params.id}` ? 'inline' : '-webkit-box' }"
        :class="{ showAllTxtCard: !props?.showAllTxt }"
      >
        <slot name="usersLink">
          <a
            v-if="props?.data?.url?.startsWith('https://') || props?.data?.url?.startsWith('http://')"
            :href="`${props?.data?.url}`"
            target="_blank"
          >
            {{ props?.data?.url }}
          </a>
          <p v-else :style="{ color: '#000000' }">
            {{ props?.data?.url }}
          </p>
        </slot>
      </div>
      <!-- <pre>{{ data?.description }}</pre> -->
      <div
        class="usersTxt"
        :class="{ showAllTxtCard: !props?.showAllTxt, allTxt: props?.showAllTxt }"
        lang="ru"
        style="hyphens: auto"
      >
        <div style="white-space: pre-wrap" v-html="getDescription(props?.data?.description)"></div>
      </div>
      <nuxt-link :to="`/resources/?page=1&category=${props?.data?.categoryId}`">
        <div class="tags">{{ props?.data?.category?.label }}</div>
      </nuxt-link>

      <div class="data">
        {{ props?.data?.createdAt ? new Date(props?.data?.createdAt).toLocaleDateString() : '' }}
      </div>
    </div>
    <!-- Аватар владельца ресурса, появляется на собственной странице ресурса -->
    <div class="resource_card_user_avatar" :title="props?.data?.user?.name">
      <NuxtLink v-if="route.path == `/resources/${route.params.id}`" :to="`/profile/${props?.data?.userId}`">
        <div class="avatar_container resource_user_img">
          <img
            loading="lazy"
            v-if="props?.data?.user?.avatar"
            class="avatar"
            :src="`${url}/api/public${props?.data?.user?.avatar}`"
          />
          <div v-else class="avatar avatar-img"></div>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import url from '~/store/config';

const route = useRoute();
const props = defineProps({
  data: {
    default: [],
  },
  showAllTxt: {
    type: Boolean,
    default: false,
  },
  changeLink: {
    type: Boolean,
    default: false,
  },
});
const skeleton = ref(true);

onMounted(async () => {
  skeleton.value = false;
});

const emit = defineEmits(['openModalWithAllText']);
</script>

<style lang="scss" scoped>
.lastResource-card {
  &_info {
    .allTxt {
      display: inline !important;
    }
  }
}
.avatar-img {
  background-image: url(~/assets/images/avatar.png);
}
.tags {
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  overflow: hidden;
}
</style>
