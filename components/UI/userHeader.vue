<template>
  <header class="header">
    <div class="header_item_user header_item_container">
      <div class="header_item">
        <i class="pi pi-arrow-left" style="font-size: 1.7rem"></i>
        <div class="burger_menu" @click="sidebarStore.show_sidebar('guest')" @mouseover="sidebarStore.show_sidebar('guest')">
          <div class="burger_menu_line"></div>
          <div class="burger_menu_line"></div>
          <div class="burger_menu_line"></div>
        </div>
        <NuxtLink class="header_user_label">
          <img
            loading="lazy"
            :src="`${url}/api/public/${userStore.profile.user?.avatar}`"
            class="personal-Area_icon header_user_image"
            alt=""
          />
          <h2>{{ userStore.profile?.user.name }}</h2>
        </NuxtLink>
        <i class="pi pi-arrow-right" style="font-size: 1.7rem"></i>
      </div>
      <div class="header_item">
        <div class="header_donbtn">
          <img src="../../assets/images/Донаты.png" alt="" />
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { useUserStore } from '@/store/user.js';
import { useRoute } from 'vue-router';
import url from '@/store/config';
import { useSidebarStore } from '~/store/sidebar';

const sidebarStore = useSidebarStore();
const router = useRoute();
const userStore = useUserStore();

await userStore.requestProfile(router.params.id);
</script>

<style lang="scss">
.header {
  z-index: 0;
  &_item_user {
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
    padding: 5px 121px 5px 84px;
    @media (max-width: $small) {
        padding-left: 20px;
        padding-right: 20px;
    }
  }
  &_user_label {
    display: flex;
    gap: 10px;
    align-items: center;
  }
  &_donbtn {
    height: 32px;
    width: 32px;
    @media (max-width: $x-small) {
        width: 20px;
        height: 20px;
    }
    img {
        width: 100%;
    }
  }
  &_user_image {
    @media (max-width: $x-small) {
        width: 20px;
        height: 20px;
    }
  }
}
</style>
