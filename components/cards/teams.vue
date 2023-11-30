<template>
  <BlocksSkeleton v-if="skeleton"></BlocksSkeleton>

  <div v-else class="lastReferal-card" lang="ru">
    <nuxt-link :to="`/profile/${props?.data?.id}`">
      <div class="avatar_container">
        <BorderTrainer
          class="border-trainer border-trainer_size--default"
          v-if="data?.roleId == 2"
        />
        <div
          :class="`user-status_type--${getUserStatus(props?.data?.status)}`"
          v-if="getUserStatus(props?.data?.status)"
          class="user-status user-status_size--default"
        />
        <img loading="lazy" v-if="props.data?.avatar" class="avatar" :src="`${url}/api/public${props?.data?.avatar}`" />
        <div v-else class="avatar avatar-img"></div>
      </div>
    </nuxt-link>
    <div class="lastReferal-card_info">
      <div class="usersLink">
        <nuxt-link :to="`/profile/${props?.data?.id}`">
          {{ props?.data?.name }}
        </nuxt-link>
      </div>
      <div v-if="props.data?.city?.region || props.data?.country">
        <div class="labels" v-if="props.data?.city?.region">
          <div class="countryAndRegion">
            {{ props.data?.city?.region?.country?.label ? `${props.data?.city?.region?.country?.label},` : '' }}
            {{ props.data?.city?.region?.label }}
          </div>
          <div class="city" v-if="props.data?.city?.label != props.data?.city?.region?.label">
            {{ props.data?.city?.label }}
          </div>
          <!-- {{ checkRegion(props.data?.city?.region?.label, props.data?.city?.label) }} -->
        </div>
        <div class="labels" v-else-if="props.data?.country">
          <div class="countryAndRegion">
            {{ props.data?.country + ', ' + props.data?.region }}
          </div>
          <div class="city" v-if="props.data?.region != props.data?.city">
            {{ props.data?.city }}
          </div>
          <!-- {{ props.data?.country + ', ' + checkRegion(props.data?.region, props.data?.city) }} -->
        </div>
      </div>
      <div v-if="props?.data.resourceCount">Ресурсов: {{ props?.data.resourceCount }}</div>
      <div class="data">
        {{ props.data?.createdAt ? new Date(props.data?.createdAt).toLocaleDateString() : '' }}
      </div>
    </div>
  </div>
</template>

<script setup>
import url from '~/store/config';
import { useUserStore } from '~/store/user';

const userStore = useUserStore();
const props = defineProps(['data']);

const skeleton = ref(true);

onMounted(async () => {
  skeleton.value = false;
});
</script>
