<template>
  <BlocksSkeleton v-if="skeleton"></BlocksSkeleton>
 
  <div v-else-if="props?.data?.id" class="referalsLeaders-card">
    <nuxt-link :to="`/division/${props.data?.id}`">
      <div class="avatar_container">
        <img loading="lazy"  v-if="props.data?.picture" class="avatar" :src="`${url}/api/public${props.data?.picture}`" />
        <div v-else class="avatar avatar-img"></div>
      </div>
    </nuxt-link>
    <div :class="{ border_add: showIndex }" class="referalsLeaders-card_info">
      <div class="usersLink userName">
        <nuxt-link :to="`/division/${props.data?.id}`">
          {{ props.data?.label }}
          <!-- {{ usersLink }} -->
        </nuxt-link>
      </div>
      <p>Глава дивизиона:</p>
      <div class="usersLink">
        <nuxt-link :to="`/profile/${props?.data?.user?.id}`" v-if="!props.one">
          {{ props.data?.user?.name }}
        </nuxt-link>
        <nuxt-link :to="`/profile/${props?.data?.user?.id}`" v-if="props.one">
          {{ props.data?.user?.name }}
        </nuxt-link>
      </div>
      <nuxt-link class="usersLink" v-if="!props.one">{{
        props?.data?.teamCount + ' ' + declOfNum(props?.data?.teamCount, ['команда', 'команды', 'команд'])
      }}</nuxt-link>
      <nuxt-link class="usersLink" v-if="props.one">{{
        props.data?.teamsCount + ' ' + declOfNum(props.data?.teamsCount, ['команда', 'команды', 'команд'])
      }}</nuxt-link>
      <nuxt-link class="usersLink" v-if="!props.one"
        >{{
          props.data?.userCount + ' ' + declOfNum(props.data?.userCount, ['игрок', 'игрока', 'игроков'])
        }}
      </nuxt-link>
      <nuxt-link class="usersLink" v-if="props.one"
        >{{
          props.data?.userCount + ' ' + declOfNum(props.data?.userId, ['игрок', 'игрока', 'игроков'])
        }}
      </nuxt-link>
    </div>
  </div>
</template>

<script setup>
import url from '~/store/config';

const props = defineProps(['data', 'one']);

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
