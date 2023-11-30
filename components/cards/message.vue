<template>
  <div ref="card" class="chat-message-content">
    <Skeleton v-if="loading" class="rounded" height="2rem" width="5rem" />
    <template v-else>
      <div class="chat-message shadow rounded" :class="`chat-message_type--${type}`">
        {{ info?.text }}
      </div>
      <div class="chat-message_date" style="color: var(--date-text)">
        {{
          new Date(info?.createdAt).toLocaleString('locale', {
            month: 'numeric',
            year: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
          })
        }}
      </div>
    </template>
  </div>
</template>

<script setup>
// import { useIntersectionObserver } from '@vueuse/core';

const props = defineProps({
  info: {
    type: String,
    default: new String(),
  },
  type: {
    type: String,
    default: 'user',
  },
});
const card = ref();

let loading = ref(true);
// let visible = ref(false);

onMounted(() => {
  loading.value = false;
});

// useIntersectionObserver(card, ([{ isIntersecting }], observerElement) => {
//   if (!visible.value) visible.value = isIntersecting;
// });
</script>
