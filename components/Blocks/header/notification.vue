<template>
  <nuxt-link :class="delete_on_mobile? 'mobailDel' : null" class="notification" to="/profile/notification">
    <div class="header_logo_modal">
      <IconsVisitorBurgerMenuBell :color="color" />
    </div>
    <div class="notification_circle" v-if="notification_store.getOtherNotification">
      {{ notification_store.getOtherNotification }}
    </div>
  </nuxt-link>
</template>

<script setup>
import { useNotificationStore } from '@/store/notifications.js';

const notification_store = useNotificationStore();
const props = defineProps({
    color: {
        type: String,
        default: "black",
    },
    delete_on_mobile: {
        type: Boolean,
        default: false,
    }
});

await notification_store.requestOtherNotification();
</script>
