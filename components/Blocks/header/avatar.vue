<template>
  <nuxt-link
    to="/profile/"
    @click="sidebar_store.show_sidebar('user'), sidebar_store.close_sidebar('admin')"
    @mouseover="sidebar_store.show_sidebar('user'), sidebar_store.close_sidebar('admin')"
  >
    <img v-if="!avatar" loading="lazy" src="~/assets/images/personalArea.png" class="personal-Area_icon" />
    <img v-else loading="lazy" :src="`${url}/api/public/${avatar}`" class="personal-Area_icon" alt="" />
  </nuxt-link>
</template>

<script setup>
import {useSidebarStore} from "@/store/sidebar";
import url from '@/store/config';

const sidebar_store = useSidebarStore();

const props = defineProps({
    avatar: {
        type: String,
        default: new String,
    }
})
</script>
