<template>
  <div class="derive-card">
    <div class="avatar_container">
      <img loading="lazy" class="avatar" v-if="data?.image" :src="`${url}/api/${data?.image}`" />
      <div v-else class="avatar avatar-img"></div>
    </div>
    <div class="derive-card_info">
      <div class="derive-card_info_name">
        {{ data?.label }}
      </div>
      <div class="derive-card_info_description">
        {{ data?.description }}
      </div>
      <div class="derive-card_info_well">
        <span>${{ data?.currentRate }}</span> курс
      </div>
      <div class="derive-card_info_well-day" :class="getClassByRate('derive-card_info_well-day', data?.dayRates).class">
        <span> {{ getClassByRate('derive-card_info_well-day', data?.dayRates).rate }}% </span> за сутки
      </div>
      <div class="derive-card_info_well-year" :class="getClassByRate('derive-card_info_well-year', data?.yearRate).class">
        <span>{{ getClassByRate('derive-card_info_well-day', data?.yearRate).rate }}%</span> за год
      </div>
    </div>
  </div>
</template>

<script setup>
import url from '@/store/config';

const props = defineProps(['data']);

function getClassByRate(className, rate) {
  switch (true) {
    case rate < 0:
      return { class: className + '-less', rate: rate };
    case rate > 0:
      return { class: className + '-greater', rate: '+'+rate };
    default:
      return { class: className + '-nothing', rate: rate };
  }
}
</script>

<style lang="scss" scoped>
.derive-card {
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
