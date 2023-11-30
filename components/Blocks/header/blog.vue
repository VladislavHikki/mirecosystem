<template>
  <div
    @click="
      navigateTo(
        notification_store.getPostsNotification
          ? `/blogs/post/${notification_store.postsNotification[0]?.postId}`
          : '/blogs'
      )
    "
    class="social-media_item"
  >
    <IconsVisitorBurgerMenuBlog :color="color" />
    <div class="notification_circle" v-if="notification_store.getPostsNotification">
      {{ notification_store.getPostsNotification }}
    </div>
  </div>
</template>

<script setup>
import { useNotificationStore } from '~/store/notifications';

const notification_store = useNotificationStore();
const props = defineProps({
  color: {
    type: String,
    default: 'black',
  },
});
</script>
