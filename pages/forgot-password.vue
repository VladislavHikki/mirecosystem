<template>
  <div class="wrap-auth-reg container">
    <div class="auth">
      <div class="tab-buttons">
        <Button :class="{ active: isActivePass }" @click="setCurrentTab('forgotPassword')">Восстановление пароля</Button>
      </div>
      <div class="container">
        <keep-alive>
          <component :is="currentTab"></component>
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<script>
import forgotPassword from '~/components/Blocks/forgotPassword.vue';
import reg from '~/components/Blocks/reg.vue';
import regNotInvite from '~/components/Blocks/registerNotInvite.vue';

export default {
  components: {
    reg,
    regNotInvite,
    forgotPassword,
  },
  data() {
    return {
      currentTab: 'forgotPassword',
      isActiveReg: false,
      isActivePass: true,
    };
  },
  methods: {
    setCurrentTab(val) {
      this.currentTab = val;
      if (this.currentTab === 'forgotPassword') {
        this.isActivePass = true;
        this.isActiveReg = false;
      } else {
        this.isActivePass = false;
        this.isActiveReg = true;
      }
    },
  },
};
</script>
