<template>
  <div class="container">
    <div class="curating">
      <h2 class="page-title" style="padding-bottom: 30px;">Кураторство</h2>
      <div class="curating_tab_btns">
        <Button class="curating_btn" @click="tab = 1" :class="{ team_btn_active: tab === 1 }">Я КУРАТОР</Button>
        <Button class="curating_btn" @click="tab = 2" :class="{ team_btn_active: tab === 2 }">МОИ КУРАТОРЫ</Button>
      </div>
    </div>
    <component style="margin-top: 60px" :data="userStore.profile" :is="tab == 1 ? iCurator : tab == 2 ? myCurators : null" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import myCurators from '~/components/Blocks/myCurators.vue';
import iCurator from '~/components/Blocks/iCurator.vue';
import { useUserStore } from '~/store/user';

const userStore = useUserStore();

await userStore.requestProfile(userStore?.data?.id);

let tab = ref(1);
</script>

<style lang="scss" scoped>
.curating {
  .curating_tab_btns {
    display: flex;
    gap: 56px;
    .curating_btn {
      background: linear-gradient(90.25deg, #2c96ea 9.03%, #00d1ff 98.03%);
      //box-shadow: none;
      transition: 0.3s;
      color: white;
      //border:none;
      width: 191px;
      border-radius: 23.5px;
      display: flex;
      justify-content: center;
    }
    .team_btn_active {
      border: 1px solid #2a9aec;
      background: transparent;
      filter: drop-shadow(0px 4px 4px rgba(0, 142, 255, 0.1));
      color: #2a9aec;
      transition: 0.3s;
    }
  }
}
@media (max-width: $x-small) {
  .team_tab_btns {
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px !important;
  }
}
</style>
