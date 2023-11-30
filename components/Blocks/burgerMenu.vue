<template>
  <div
    class="burger_panel"
    @mouseleave="sidebarStore.close_sidebar('visitor')"
    ref="burger_menu"
    :class="{ close_burger_panel: !sidebarStore.visible.visitor, active_burger_panel: sidebarStore.visible.visitor }"
  >
    <button class="close" @click="sidebarStore.close_sidebar('visitor')">
      <div class="close_circle">
        <div class="close_line"></div>
        <div class="close_line"></div>
      </div>
    </button>
    <BlocksVisitorBurgerLinks />
  </div>
</template>

<script setup>
import { onClickOutside } from '@vueuse/core';
import { useSidebarStore } from '~/store/sidebar';

const sidebarStore = useSidebarStore();
const burger_menu = ref();

onClickOutside(burger_menu, ()=> {
  sidebarStore.close_sidebar('visitor');
});
</script>

<style lang="scss">
.burger_panel {
  width: 0;
  display: flex;
  flex-direction: column;
  position: fixed;
  padding: 0;
  padding-top: 26px;
  padding-bottom: 26px;
  gap: 7px;
  z-index: 97;
  background: var(--background-color);
  height: 100%;
  transition: 0.3s;
  overflow-y: auto;
  .close {
    align-self: flex-end;
    background: transparent;
    box-shadow: none;
    width: auto;
    .close_circle {
      display: none;
      width: 25px;
      height: 25px;
      border: 2px solid black;
      border-radius: 100%;
      position: relative;
      justify-content: center;
      align-items: center;
      .close_line {
        position: absolute;
        height: 2px;
        background: black;
        width: 80%;
      }

      .close_line:nth-child(1) {
        rotate: 45deg;
      }
      .close_line {
        rotate: -45deg;
      }
    }
  }

  .burger_item {
    align-self: flex-start;
    display: flex;
    flex-direction: column;
    gap: 26px;
    a {
      display: flex;
      align-items: center;
      font-size: 20px;
      gap: 17px;
    }
  }
}

.close_burger_panel {
  width: 0;
  padding: 0;
  transition: 0.3s;
  overflow: hidden;
  .close {
    display: none;
  }
  .burger_item {
    display: none;
    a {
      display: none;
      img {
        display: none;
      }
    }
  }
}

.active_burger_panel {
  width: 268px;
  .close {
    display: block;
  }
  .burger_item {
    display: flex;
    padding: 0 26px;
    a {
      display: flex;
      img {
        display: block;
      }
    }
  }
  .close {
    padding: 38px 54px 14px 54px;
  }
}

@media (max-width: $large) {
  .active_burger_panel {
    width: 35%;
  }
  .close_circle {
    display: flex !important;
  }
}

@media (max-width: $large) {
  .active_burger_panel {
    width: 40%;
  }
}

@media (max-width: $small) {
  .active_burger_panel {
    width: 100%;
  }
}
</style>
