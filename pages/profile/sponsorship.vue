<template>
  <div class="container">
    <div class="sponsorship_profile">
    <h2 class="page-title" style="padding-bottom: 30px;">Спонсорство</h2>

    <div class="profile_sponsorship_tab_btns">
      <Button class="sponsorship_btn" @click="tab = 1" :class="{ sponsorship_btn_active: tab === 1 }">Мой Спонсор</Button>
      <Button class="sponsorship_btn" @click="tab = 2" :class="{ sponsorship_btn_active: tab === 2 }">Я Спонсор</Button>
    </div>

    <component style="margin-top: 60px" :data="sponsors?.data" :is="tab == 1 ? mySponsor : tab == 2 ? iSponsor : null" />
  </div>
  </div>
</template>

<script setup>
import mySponsor from '~/components/Blocks/mySponsor.vue';
import iSponsor from '~/components/Blocks/iSponsor.vue';
import { useUserStore } from '~/store/user';

const userStore = useUserStore();

let sponsors = await userStore.getMySponsors(userStore?.data?.id);

let tab = ref(1);
</script>
