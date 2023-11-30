<template>
  <BlocksSkeleton v-if="skeleton"></BlocksSkeleton>
  <div v-else class="triad-card">
    <div class="avatar_container">
      <nuxt-link :to="`/the_game/structure/${info?.id}`">
        <img loading="lazy" class="avatar" v-if="info?.picture" :src="`${url}/api/${info?.picture}`" />
        <div v-else class="avatar avatar-img"></div>
      </nuxt-link>
    </div>
    <div class="triad-card_info">
      <div class="triad-card_info_name">
        <nuxt-link :to="`/the_game/structure/${info?.id}`" style="color: #2c96ea">
          {{ info?.label }}
        </nuxt-link>
      </div>
      <div style="color: var(--date-text)">Глава триады:</div>
      <div class="usersLink">
        <nuxt-link :to="`/profile/${info?.user?.id}`">
          {{ info?.user?.name }}
        </nuxt-link>
      </div>
      <div style="color: var(--date-text)">Дивизионы: {{ info?.subsCount }}</div>
      <div style="color: var(--date-text)">Команды: {{ info?.teamsCount }}</div>
      <div style="color: var(--date-text)">Игроки: {{ info?.userCount }}</div>
      <!-- <div class="triad-card_info_description">
        {{ info?.description }}
      </div>
      <div class="triad-card_info_well">
        <span>${{ info?.currentRate }}</span> курс
      </div> -->
    </div>
  </div>
</template>

<script setup>
import url from '~/store/config';

const props = defineProps({
  info: {
    type: Object,
    default: null,
  },
});
const skeleton = ref(true);

onMounted(async () => {
  skeleton.value = false;
});
</script>

<style lang="scss" scoped>
.triad-card {
  &_info {
    &_name,
    &_well > span {
      font-size: 18px;
      font-weight: bold;
    }
    &_well {
      span {
        color: #3b82f6;
      }
      &-day-less > span,
      &-year-less > span {
        color: var(--error-text);
      }
      &-day-greater > span,
      &-year-greater > span {
        color: var(--success-text);
      }

      &-day-nothing > span,
      &-year-nothing > span {
        color: #3b82f6;
      }
    }
  }
}
</style>
