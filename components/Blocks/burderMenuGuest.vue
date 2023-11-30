<template>
  <div
    id="burger_panel_quest"
    class="burger_panel"
    @mouseleave="sidebarStore.close_sidebar('guest')"
    ref="burger_menu"
    :class="{ close_burger_panel: !sidebarStore.visible.guest, active_burger_panel: sidebarStore.visible.guest }"
  >
    <button class="close" @click="sidebarStore.close_sidebar('guest')">
      <div class="close_circle">
        <div class="close_line"></div>
        <div class="close_line"></div>
      </div>
    </button>
    <BlocksQuestBurgerLinks />
  </div>
</template>

<script setup>
import { onClickOutside } from '@vueuse/core';
import { useSidebarStore } from '~/store/sidebar';

const sidebarStore = useSidebarStore();
const burger_menu = ref();

onClickOutside(burger_menu, () => {
  sidebarStore.close_sidebar('guest');
});
</script>

<style lang="scss">
    #burger_panel_quest {
        z-index: 2;
        padding-top: 42px;
    }
</style>
