<template>
  <div
    @mouseleave="
      sidebarStore.close_sidebar('admin'), sidebarStore.close_sidebar('user')
    "
    class="burger_panel right"
    ref="burger_menu"
    :class="{
      close_burger_panel: !(sidebarStore.visible.user || sidebarStore.visible.admin),
      active_burger_panel: sidebarStore.visible.user || sidebarStore.visible.admin,
    }"
  >
    <button
      class="close"
      @click="sidebarStore.close_sidebar('admin'), sidebarStore.close_sidebar('user')"
    >
      <div class="close_circle">
        <div class="close_line"></div>
        <div class="close_line"></div>
      </div>
    </button>
    <component :is="sidebarStore.visible.user ? userBurgerMenu : sidebarStore.visible.admin ? adminBurgerMenu : null" />
  </div>
</template>

<script setup>
import userBurgerMenu from '~/components/Blocks/userBurgerLinks.vue';
import adminBurgerMenu from '~/components/Blocks/adminBurgerMenu.vue';
import { useSidebarStore } from '~/store/sidebar';
import { useUserStore } from '@/store/user';
import { onClickOutside } from '@vueuse/core';

const userStore = useUserStore();
const sidebarStore = useSidebarStore();
const props = defineProps(['close', 'currentRole']);
const burger_menu = ref();
onClickOutside(burger_menu, () => {
  sidebarStore.close_sidebar('admin');
  sidebarStore.close_sidebar('user');
});
</script>

<style lang="scss">
.burger_panel {
  &.right {
    right: 0;
  }
  .close {
    align-self: flex-end;
    background: transparent;
    box-shadow: none;
    width: auto;
  }
}
</style>
