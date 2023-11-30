<template>
  <BlocksSkeleton v-if="skeleton"></BlocksSkeleton>

  <div v-else-if="props?.profile && !skeleton" class="lastReferal-card">
    <nuxt-link :to="`/profile/${props?.data?.id}`">
      <div class="avatar_container">
        <BorderTrainer class="border-trainer border-trainer_size--default" v-if="data?.roleId == 2" />
        <div
          :class="`user-status_type--${getUserStatus(props?.data?.status)}`"
          v-if="getUserStatus(props?.data?.status)"
          class="user-status user-status_size--default"
        />
        <img loading="lazy" v-if="props?.data?.avatar" class="avatar" :src="`${url}/api/public${props?.data?.avatar}`" />
        <div v-else class="avatar avatar-img"></div>
      </div>
    </nuxt-link>
    <div class="lastReferal-card_info">
      <div class="usersLink">
        <nuxt-link :to="`/profile/${props?.data?.id}`">
          {{ props?.data?.name }}
        </nuxt-link>
      </div>
      <div class="labels" v-if="props?.data?.city">
        <div class="countryAndRegion">
          {{ props?.data?.country ? `${props?.data?.country},` : '' }}
          {{ props?.data?.region }}
        </div>
        <div class="city" v-if="props?.data?.city != props?.data?.region">
          {{ props?.data?.city }}
        </div>
      </div>
      <div class="labels" v-else-if="props?.data?.country">
        <div class="countryAndRegion">
          {{ props?.data?.country + ', ' + props?.data?.region }}
        </div>
        <div class="city" v-if="props?.data?.city != props?.data?.region">
          {{ props?.data?.city }}
        </div>
      </div>
      <div class="data">
        {{ props?.data?.createdAt ? new Date(props?.data?.createdAt).toLocaleDateString() : '' }}
      </div>
    </div>
  </div>
  <div v-else-if="props.index && !skeleton" class="lastReferal-card">
    <nuxt-link :to="`/profile/${props?.data?.id}`">
      
      <div class="avatar_container">
        <BorderTrainer
          class="border-trainer border-trainer_size--default"
          v-if="data?.roles?.filter((x) => x.id == 2).length == 1"
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
      <div class="labels" v-if="props.data?.city?.region">
        <div class="countryAndRegion">
          {{ props.data?.city?.region?.country?.label ? `${props.data?.city?.region?.country?.label},` : '' }}
          {{ props.data?.city?.region?.label }}
        </div>
        <div class="city" v-if="props.data?.city?.label != props.data?.city?.region?.label">
          {{ props.data?.city?.label }}
        </div>
      </div>
      <div class="labels" v-else-if="props.data?.country">
        <div class="countryAndRegion">
          {{ props.data?.country + ', ' + props.data?.region }}
        </div>
        <div class="city" v-if="props.data?.city != props.data?.region">
          {{ props.data?.city }}
        </div>
      </div>
      <div class="data">
        {{ props.data?.createdAt ? new Date(props.data?.createdAt).toLocaleDateString() : '' }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { useIntersectionObserver } from '@vueuse/core';
import url from '~/store/config';

const props = defineProps(['data', 'profile', 'index']);

const skeleton = ref(true);

onMounted(async () => {
  skeleton.value = false;
});

useIntersectionObserver()
</script>

<style lang="scss"></style>
