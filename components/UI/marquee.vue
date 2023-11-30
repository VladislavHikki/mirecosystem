<template>
  <div class="marquee">
    <div class="marquee_item" v-for="value in content">
      <div class="marquee_item" v-for="value in content">
        <div class="marquee_item_info">
          <img
            style="width: 30px; height: 30px; border-radius: 50%; object-fit: cover"
            :src="`${url}/api/${value?.image}`"
            alt=""
          />
        </div>
        <div class="marquee_item_info">
          <div class="marquee_item_info_label">
            {{ value?.label }}
          </div>
          <div class="marquee_item_info_current-rate">${{ value?.currentRate }}</div>
        </div>
        <div class="marquee_item_rates">
          <div class="marquee_item_rates-day" :class="getClassByRate('marquee_item_rates-day', value?.dayRates).class">
            За сутки <span>{{ getClassByRate('marquee_item_rates_well-day', value?.dayRates).rate }}%</span>
          </div>
          <div class="marquee_item_rates-year" :class="getClassByRate('marquee_item_rates-year', value?.yearRate).class">
            За год <span>{{ getClassByRate('marquee_item_rates_well-day', value?.yearRate).rate }}%</span>
          </div>
        </div>
      </div>
    </div>
    <div class="marquee_item" v-for="value in content">
      <div class="marquee_item" v-for="value in content">
        <div class="marquee_item_info">
          <img
            style="width: 30px; height: 30px; border-radius: 50%; object-fit: cover"
            :src="`${url}/api/${value?.image}`"
            alt=""
          />
        </div>
        <div class="marquee_item_info">
          <div class="marquee_item_info_label">
            {{ value?.label }}
          </div>
          <div class="marquee_item_info_current-rate">${{ value?.currentRate }}</div>
        </div>
        <div class="marquee_item_rates">
          <div class="marquee_item_rates-day" :class="getClassByRate('marquee_item_rates-day', value?.dayRates).class">
            За сутки <span>{{ getClassByRate('marquee_item_rates_well-day', value?.dayRates).rate }}%</span>
          </div>
          <div class="marquee_item_rates-year" :class="getClassByRate('marquee_item_rates-year', value?.yearRate).class">
            За год <span>{{ getClassByRate('marquee_item_rates_well-day', value?.yearRate).rate }}%</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import url from '~/store/config';

const props = defineProps({
  content: {
    default: [],
  },
});

function getClassByRate(className, rate) {
  switch (true) {
    case rate < 0:
      return { class: className + '-less', rate: rate };
    case rate > 0:
      return { class: className + '-greater', rate: '+' + rate };
    default:
      return { class: className + '-nothing', rate: rate };
  }
}
</script>

<style scoped lang="scss">
.marquee {
  width: 100%;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 32px;
  animation: scroll 40s linear infinite;
  white-space: nowrap;
  &_item {
    color: white;
    transition: all 0.1s ease-in-out;
    display: flex;
    flex-direction: row;
    gap: 20px;

    &_info {
      color: rgb(78, 249, 192);
      font-size: 24px;
      display: flex;
      align-items: center;
      gap: 12px;
    }
    &_rates {
      color: white;
      display: flex;
      gap: 20px;
      &-day,
      &-year {
        display: flex;
        gap: 10px;
        align-items: center;
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
        color: #a351eb;
      }
    }
  }
}

@keyframes scroll {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-290%);
  }
}
</style>
