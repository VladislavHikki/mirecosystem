<template>
  <BlocksSkeleton v-if="skeleton"></BlocksSkeleton>
  <div v-else-if="props?.data?.id" class="referalsLeaders-card" lang="ru">
    <nuxt-link :to="`/profile/${props.data.id}`">
      <div class="avatar_container">
        <BorderTrainer class="border-trainer border-trainer_size--default" v-if="data?.roleId == 2" />
        <div
          :class="`user-status_type--${getUserStatus(props?.data?.status)}`"
          v-if="getUserStatus(props?.data?.status)"
          class="user-status user-status_size--default"
        />
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
      <div class="labels">
        {{ props.data?.city?.region?.country?.label }}
      </div>
      <div class="graduatesCount" v-if="props.data?.count && !props.profile">
        {{ props.data?.count + ' ' + declOfNum(props.data?.count, ['подопечный', 'подопечных', 'подопечных']) }}
      </div>
    </div>
  </div>
  <div v-else-if="props?.index" class="referalsLeaders-card" lang="ru">
    <nuxt-link :to="`/profile/${props.data.id}`">
      <div class="avatar_container">
        <img loading="lazy" v-if="props.data?.avatar" class="avatar" :src="`${url}/api/public${props.data?.avatar}`" />
        <BorderTrainer class="border-trainer border-trainer_size--default" v-if="data?.roleId == 2" />
        <div
          :class="`user-status_type--${getUserStatus(props?.data?.status)}`"
          v-if="getUserStatus(props?.data?.status)"
          class="user-status user-status_size--default"
        />
        <div v-else class="avatar avatar-img"></div>
        <div
          :class="`user-status_type--${getUserStatus(props?.data?.status)}`"
          v-if="getUserStatus(props?.data?.status)"
          class="user-status user-status_size--default"
        />
      </div>
    </nuxt-link>
    <div :class="{ border_add: showIndex }" class="referalsLeaders-card_info">
      <div class="usersLink">
        <nuxt-link :to="`/profile/${props?.data?.id}`">
          {{ props.data?.name }}
        </nuxt-link>
      </div>
      <div class="labels">
        {{ props.data.country }}
      </div>
      <div class="graduatesCount" v-if="props.data?.count && !props.profile">
        {{ props.data?.count + ' ' + declOfNum(props.data?.count, ['подопечный', 'подопечных', 'подопечных']) }}
      </div>
    </div>
  </div>
</template>

<script setup>
import url from '~/store/config';

const props = defineProps(['data', 'profile', 'index']);

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
