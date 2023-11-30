<template>
  <div>
    <UIUserHeader class="header_user_quest" v-if="userStore.user?.id != null && userStore.user?.id != route.params.id" />
  </div>
</template>

<script setup>
import { useUserStore } from '~/store/user';
const userStore = useUserStore();
const route = useRoute();
</script>

<style lang="scss">
    .header_user_quest {
        z-index: 90;
    }
</style>