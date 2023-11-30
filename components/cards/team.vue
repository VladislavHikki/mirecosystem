<template>
  <BlocksSkeleton v-if="skeleton"></BlocksSkeleton>
  <div class="lastCommand-card" v-else-if="props?.teamImgInProfile" lang="ru">
    <nuxt-link :to="`/teams/${props?.data?.id}`">
      <div v-if="props?.data?.type == 0" class="avatar_container">
        <img loading="lazy" v-if="props?.data?.picture" class="avatar" :src="`${url}/api/public${props?.data?.picture}`" />
        <div v-else class="avatar avatar-img"></div>
      </div>
      <div
        v-else
        class="avatar-elite"
        style="
          width: 112px;
          height: 112px;
          background-image: url(/border.png);
          background-position: center;
          background-size: cover;
          display: flex;
          align-items: center;
          justify-content: center;
        "
      >
        <div class="avatar-elite_container" style="width: 77px; height: 77px; border-radius: 50%; overflow: hidden">
          <img
            v-if="props?.data?.picture"
            style="width: 100%; height: 100%"
            class="avatar"
            :src="`${url}/api/public${props?.data?.picture}`"
            alt=""
          />
          <div v-else class="avatar avatar-img"></div>
        </div>
      </div>
    </nuxt-link>
    <div class="lastCommand-card_info">
      <div class="userName">
        <nuxt-link :to="`/teams/${props?.data?.id}`">{{ props?.data?.label }}</nuxt-link>
      </div>

      <div>владелец:</div>

      <div class="usersLink">
        <nuxt-link :to="`/profile/${props?.data?.user?.id}`">
          {{ trainerName }}
        </nuxt-link>
      </div>
      <div class="usersLink">
        {{ props?.data?.userCount }}
        {{ declOfNum(props?.data?.userCount, ['игрок', 'игрока', 'игроков']) }}
      </div>
      <!-- <div class="usersTxt" :class="{ showAllTxtCard: !props.showAllTxt }">
        <slot>{{ props?.data?.description }}</slot>
      </div> -->
      <div class="tags">{{ props?.data?.subsection?.label }}</div>
      <div class="data">
        {{ props?.data?.createdAt ? new Date(props?.data?.createdAt).toLocaleDateString() : '' }}
      </div>
    </div>
  </div>
  <div class="lastCommand-card" v-else-if="props.data?.coachId" lang="ru">
    <nuxt-link :to="`/teams/${props?.data?.id}`">
      <div v-if="props?.data?.type == 0" class="avatar_container">
        <img loading="lazy" v-if="props?.data?.picture" class="avatar" :src="`${url}/api/public${props?.data?.picture}`" />
        <div v-else class="avatar avatar-img"></div>
      </div>
      <div
        v-else
        class="avatar-elite"
        style="
          width: 112px;
          height: 112px;
          background-image: url(/border.png);
          background-position: center;
          background-size: cover;
          display: flex;
          align-items: center;
          justify-content: center;
        "
      >
        <div class="avatar-elite_container" style="width: 77px; height: 77px; border-radius: 50%; overflow: hidden">
          <img
            v-if="props?.data?.picture"
            style="width: 100%; height: 100%"
            class="avatar"
            :src="`${url}/api/public${props?.data?.picture}`"
            alt=""
          />
          <div v-else class="avatar avatar-img"></div>
        </div>
      </div>
    </nuxt-link>
    <div class="lastCommand-card_info">
      <div class="userName">
        <nuxt-link :to="`/teams/${props?.data?.id}`">{{ props?.data?.label }}</nuxt-link>
      </div>
      <div>Владелец:</div>
      <div class="usersLink">
        <nuxt-link :to="`/profile/${props?.data?.coachId}`">
          {{ props?.data.name }}
        </nuxt-link>
      </div>
      <div class="usersLink">
        {{ props?.data?.userCount }}
        {{ declOfNum(props?.data?.userCount, ['игрок', 'игрока', 'игроков']) }}
      </div>
      <!-- <div class="usersLink">
        {{ props?.data?.resourceCount }}
          {{ declOfNum(props?.data?.resourceCount, ['ресурс', 'ресурса', 'ресурсов']) }}
      </div> -->
      <!-- <div class="usersTxt" :class="{ showAllTxtCard: !props.showAllTxt }">
        <slot>{{ props?.data?.description }}</slot>
      </div> -->
      <div class="tags">{{ props?.data?.subsectionLabel }}</div>
      <div class="data">
        {{ props?.data?.createdAt ? new Date(props?.data?.createdAt).toLocaleDateString() : '' }}
      </div>
    </div>
  </div>
  <div class="lastCommand-card" lang="ru" v-else-if="!props.data?.team && !props?.teamImgInProfile && !props.data?.coachId">
    <nuxt-link :to="`/teams/${props?.data?.id}`">
      <div v-if="props?.data?.type == 0" class="avatar_container">
        <img loading="lazy" v-if="props?.data?.picture" class="avatar" :src="`${url}/api/public${props?.data?.picture}`" />
        <div v-else class="avatar avatar-img"></div>
      </div>
      <div
        v-else
        class="avatar-elite"
        style="
          width: 112px;
          height: 112px;
          background-image: url(/border.png);
          background-position: center;
          background-size: cover;
          display: flex;
          align-items: center;
          justify-content: center;
        "
      >
        <div class="avatar-elite_container" style="width: 77px; height: 77px; border-radius: 50%; overflow: hidden">
          <img
            v-if="props?.data?.picture"
            style="width: 100%; height: 100%"
            class="avatar"
            :src="`${url}/api/public${props?.data?.picture}`"
            alt=""
          />
          <div v-else class="avatar avatar-img"></div>
        </div>
      </div>
    </nuxt-link>
    <div class="lastCommand-card_info">
      <div class="userName">
        <nuxt-link :to="`/teams/${props?.data?.id}`">{{ props?.data?.label }}</nuxt-link>
      </div>
      <div v-if="!props?.isTrainerProfile" style="display: flex; gap: 7px; flex-direction: column">
        <div>Владелец:</div>
        <div class="usersLink">
          <nuxt-link v-if="!props.userIdOne" :to="`/profile/${props?.data?.user?.id}`">
            {{ props?.data?.user?.name ? props?.data?.user?.name : props?.data?.name }}
          </nuxt-link>
          <nuxt-link v-if="props.userIdOne" :to="`/profile/${props?.data?.userId}`">
            {{ props?.data?.user?.name ? props?.data?.user?.name : props?.data?.name }}
          </nuxt-link>
        </div>
      </div>
      <div class="usersLink">
        {{ props?.data?.userCount }}
        {{ declOfNum(props?.data?.userCount, ['игрок', 'игрока', 'игроков']) }}
      </div>
      <!-- <div class="usersLink">
        {{ props?.data?.resourceCount }}
          {{ declOfNum(props?.data?.resourceCount, ['ресурс', 'ресурса', 'ресурсов']) }}
      </div> -->
      <!-- <div class="usersTxt" :class="{ showAllTxtCard: !props.showAllTxt }">
        <slot>{{ props?.data?.description }}</slot>
      </div> -->
      <div class="tags">{{ props?.data?.subsection?.label ?? props?.data?.subsectionLabel }}</div>
      <div class="data">
        {{ props?.data?.createdAt ? new Date(props?.data?.createdAt).toLocaleDateString() : '' }}
      </div>
    </div>
  </div>

  <div class="lastCommand-card" lang="ru" v-else-if="props.data?.team && !props?.teamImgInProfile">
    <nuxt-link :to="`/teams/${props?.data?.team?.id}`">
      <div class="avatar_container">
        <img
          loading="lazy"
          v-if="props?.data?.team?.picture"
          class="avatar"
          :src="`${url}/api/public${props?.data?.team?.picture}`"
        />
        <div v-else class="avatar avatar-img"></div>
      </div>
    </nuxt-link>
    <div class="lastCommand-card_info">
      <div class="userName">
        <nuxt-link :to="`/teams/${props?.data?.team?.id}`">{{ props?.data?.team?.label }}</nuxt-link>
      </div>
      <div>Владелец:</div>
      <div class="usersLink">
        <nuxt-link :to="`/profile/${props?.data?.team?.user?.id}`">
          {{ props?.data?.team?.user?.name }}
        </nuxt-link>
      </div>
      <!-- <div class="usersTxt" :class="{ showAllTxtCard: !props.showAllTxt }">
        <slot>{{ props?.data?.team?.description }}</slot>
      </div> -->
      <div class="tags">{{ props?.data?.subsection?.label }}</div>
      <div class="data">
        {{ props?.data?.team?.createdAt ? new Date(props?.data?.team?.createdAt).toLocaleDateString() : '' }}
      </div>
    </div>
  </div>
</template>

<script setup>
import url from '~/store/config';
import { useUserStore } from '@/store/user.js';
const userStore = useUserStore();
const props = defineProps(['data', 'showAllTxt', 'isTrainerProfile', 'teamImgInProfile', 'userIdOne']);

const skeleton = ref(true);

onMounted(async () => {
  skeleton.value = false;
});
let trainerName = ref(null);
if (props?.isTrainerProfile) {
  trainerName.value = userStore?.getProfile?.user?.name;
} else {
  trainerName.value = props?.data?.user?.name;
}
</script>

<style lang="scss" scoped>
.lastCommand-card {
  &_info {
    .name {
      font-size: 22px;
      word-break: break-all;
    }
    .userName a {
      color: #2c96ea;
    }
    .userLink a {
      font-size: 16px;
    }
  }
}
</style>
