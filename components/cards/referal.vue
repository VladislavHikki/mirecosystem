<template>
  <BlocksSkeleton v-if="skeleton"></BlocksSkeleton>
  <div class="referalsLeaders-card" v-else-if="props?.data?.users">
    <nuxt-link :to="`/profile/${props.data.id}`">
      <div class="avatar_container">
        <BorderTrainer class="border-trainer border-trainer_size--default" v-if="data?.roleId == 2" />
        <div
          :class="`user-status_type--${getUserStatus(props?.data?.status)}`"
          v-if="getUserStatus(props?.data?.status)"
          class="user-status user-status_size--default"
        />
        <img loading="lazy" v-if="props.data?.avatar" class="avatar" :src="`${url}/api/public${props.data.avatar}`" />
        <div v-else class="avatar avatar-img"></div>
      </div>
    </nuxt-link>
    <div :class="{ border_add: showIndex }" class="referalsLeaders-card_info">
      <div class="usersLink">
        <nuxt-link :to="route.fullPath == '/' ? 'profile/' + props.data.id : props.data.id">
          {{ props.data.name }}
        </nuxt-link>
      </div>
    </div>
  </div>
  <div v-else class="referalsLeaders-card">
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
          <!-- {{ usersLink }} -->
        </nuxt-link>
      </div>
      <div class="referalsLeaders-stats">
        <div class="stats">
          <div class="labels">
            {{ props.data?.label }}
          </div>
          <div class="referalsCount" v-if="props.data?.total >= 0">
            {{ props.data?.total + ' ' + declOfNum(props.data?.total, ['реферал', 'реферала', 'рефералов']) }}
          </div>
          <div class="levelsCount" v-if="props.data?.levels >= 0">
            {{ props.data?.levels + ' ' + declOfNum(props.data?.levels, ['уровень', 'уровня', 'уровней']) }}
          </div>
          <div class="referalsCount" v-if="props?.data?.forwardCount >= 0">
            {{ props.data?.forwardCount + ' ' + declOfNum(props.data?.forwardCount, ['прямой', 'прямых', 'прямых']) }}
          </div>
          <div class="referalsCount" v-if="props?.data?.indirectCount >= 0">
            {{
              props.data?.indirectCount +
              ' ' +
              declOfNum(props.data?.indirectCount, ['косвенный ', 'косвенных', 'косвенных'])
            }}
          </div>
        </div>
        <div class="cpds">
          <div class="cpd">
            <span class="text_ucpd">{{ props?.data?.ucpd }}%</span>
            <img height="30" src="../../assets/images/ucpd.png" />
          </div>
          <div class="cpd">
            <span class="text_cpd">{{ props?.data?.cpd }}%</span>
            <img height="30" src="../../assets/images/cpd.png" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { declOfNum } from '~/composables/translate';
import url from '~/store/config';

const route = useRoute();

const props = defineProps(['data']);

const skeleton = ref(true);

onMounted(async () => {
  skeleton.value = false;
});
</script>

<style lang="scss" scoped>
.referalsLeaders-card {
  &_info {
    .referalsCount,
    .levelsCount {
      color: #6c6c6c;
      font-size: 15px;
    }
  }
}
</style>
