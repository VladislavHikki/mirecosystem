<template>
  <nav class="header_social-media header_down">
    <div class="header_social-media_item">
      <IconsVisitorBurgerMenuHome @click="navigateTo('/')" :color="iconColorHome" class="header_item_down_icon" />
    </div>

    <BlocksHeaderBlog class="header_social-media_item" :color="iconColorBlog" />

    <div class="header_social-media_item">
      <IconsVisitorBurgerMenuServices @click="navigateTo('/services')" :color="iconColorService" />
    </div>

    <template v-if="userStore.isAuthorized">
      <BlocksHeaderNotification class="header_social-media_item" :color="iconColorBell" />

      <BlocksHeaderChat class="header_social-media_item" :color="iconColorEnvelope" />
    </template>
  </nav>
</template>

<script setup>
import { useUserStore } from '@/store/user';
import { useRoute } from 'vue-router';

const route = useRoute();
const nuxtApp = useNuxtApp();
const userStore = useUserStore();

const iconColorBlog = ref(route.path === '/blogs' ? '#019EC3' : '#01C314');
const iconColorHome = ref(route.path === '/' ? '#019EC3' : '#01C314');
const iconColorBell = ref(route.path === '/profile/notification' ? '#019EC3' : '#01C314');
const iconColorEnvelope = ref(route.path === '/profile/chat' ? '#019EC3' : '#01C314');
const iconColorService = ref(route.path === '/services' ? '#019EC3' : '#01C314');

watch(
  () => route.path,
  (newPath, oldPath) => {
    iconColorBlog.value = newPath === '/blogs' ? '#019EC3' : '#01C314';
    iconColorHome.value = newPath === '/' ? '#019EC3' : '#01C314';
    iconColorBell.value = newPath === '/profile/notification' ? '#019EC3' : '#01C314';
    iconColorEnvelope.value = newPath === '/profile/chat' ? '#019EC3' : '#01C314';
    iconColorService.value = newPath === '/services' ? '#019EC3' : '#01C314';
  }
);

nuxtApp.hook('page:finish', () => {
  visible_menu_info.value = false;
  menu_iconInfo.value = false;
  menu_iconNews.value = false;
  menu_iconServices.value = false;
  menu_iconBenefits.value = false;
  menu_iconEarnMoney.value = false;
});

let visible_menu_info = ref(false);

let menu_iconInfo = ref(false);
let menu_iconNews = ref(false);
let menu_iconServices = ref(false);
let menu_iconBenefits = ref(false);
let menu_iconEarnMoney = ref(false);
</script>
