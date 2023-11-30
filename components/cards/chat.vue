<template>
  <div ref="card" class="chat-card" :class="selected ? 'chat-card--selected' : 'chat-card--unselected'">
    <template v-if="!visible || loading">
      <div class="chat-card_avatar">
        <Skeleton shape="circle" class="avatar avatar_size--medium" />
      </div>
      <div class="chat-card_info">
        <div class="chat-card_info_name">
          <Skeleton class="rounded" width="10rem" />
        </div>
        <div class="chat-card_info_last-message">
          <Skeleton class="rounded" width="10rem" />
        </div>
      </div>
    </template>
    <template v-if="visible">
      <div class="chat-card_avatar">
        <BlocksUserAvatar
          size="medium"
          :roleId="info?.users?.length ? info?.users[0]?.roleId : info?.roleId"
          :img="info?.users?.length ? info?.users[0]?.avatar : info?.avatar"
          :status="info?.users?.length ? info?.users[0]?.status : info?.status"
        />
      </div>
      <div class="chat-card_info">
        <div class="chat-card_info_name">
          {{ info?.users?.length ? info?.users[0]?.name : info?.name }}
        </div>
        <div class="chat-card_info_last-message">
          {{ info?.lastMessage ?? 'Нет сообщений' }}
        </div>
      </div>
      <div class="chat-card_new-message-circle" v-if="info?.new > 0 && user_store?.user?.id != info?.lastUserId"></div>
    </template>
  </div>
</template>

<script setup>
import { useIntersectionObserver } from '@vueuse/core';
import { useUserStore } from '~/store/user';

const user_store = useUserStore();
const props = defineProps({
  info: {
    default: null,
  },
  selected: {
    type: Boolean,
    default: null,
  },
});
const card = ref();

let loading = ref(true);
let visible = ref(false);

onMounted(() => {
  loading.value = false;
});

useIntersectionObserver(card, ([{ isIntersecting }], observerElement) => {
  if (!visible.value) visible.value = isIntersecting;
});
</script>
