<template>
  <!-- Счетчик в профиль -->
  <div v-if="props?.data?.user" class="profile_userInfo">
    <div class="referalsCount">
      {{ declOfNum(props.data.total.referrals || 0, ['Реферал: ', 'Реферала: ', 'Рефералов: ']) }}
      {{ props.data.total.referrals || 0 }}
    </div>
    <div class="partnersCount">
      {{ declOfNum(0, ['Партнёр: ', 'Партнёра: ', 'Партнёров: ']) }}
      {{ 0 }}
    </div>
    <div class="resourceCount">
      {{ declOfNum(props.data.total.resources || 0, ['Ресурс: ', 'Ресурса: ', 'Ресурсов: ']) }}
      {{ props.data.total.resources || 0 }}
    </div>
  </div>

  <!-- Счетчик в рефералку -->

  <div v-else class="profile_userInfo">
    <div class="referalsCount">
      {{ declOfNum(props.data.refsCount, ['Реферал: ', 'Реферала: ', 'Рефералов: ']) }}
      {{ props.data.refsCount }}
    </div>
    <div class="partnersCount">
      {{ declOfNum(0, ['Партнёр: ', 'Партнёра: ', 'Партнёров: ']) }}
      {{ 0 }}
    </div>
    <div class="resourceCount">
      {{ declOfNum(props.data.resourcesCount, ['Ресурс: ', 'Ресурса: ', 'Ресурсов: ']) }}
      {{ props.data.resourcesCount }}
    </div>
  </div>
</template>

<script setup>
const props = defineProps(['data']);
</script>

<style lang="scss">
.profile_userInfo {
  display: flex;
  justify-content: space-between;
  margin-top: 5px;
  font-weight: bold;
}
</style>
