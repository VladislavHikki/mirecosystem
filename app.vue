<template>
  <NuxtLoadingIndicator :height="4" />
  <NuxtLayout>
    <UIHeaderUI @openBurgerMenuRole="OpenMenuRole($event)" :isUser="isSigIn" />
    <BlocksBurgerMenu />
    <BlocksBurgerMenuRole />
    <BlocksBurderMenuGuest />
    <div class="wrapper">
      <NuxtPage
        @sendMessage="sendMessage($event)"
        @changeRole="sendToSocket($event)"
        @deleteNotification="++id"
        @admin="EditAdminHeader()"
        @user="EditUserHeader()"
        @toAnchorLink="toAnchorLink($event)"
        @createPost="createPost"
      />
      <UIAnchorButton />
    </div>

    <UIFooterUI />
    <UIHeaderDownUI />
  </NuxtLayout>
</template>
<script setup>
import { useUserStore } from '@/store/user';
import url from './store/config';
import { useSidebarStore } from './store/sidebar';
import { useSocketStore } from './store/socket';

const nuxtApp = useNuxtApp();
const userStore = useUserStore();
const body = ref(null);
const sidebarStore = useSidebarStore();
const socketStore = useSocketStore();

let isAnchorLink = ref(false);
let AnchorElementName = ref('');

onMounted(async () => {
  if (process.client) {
    body.value = document.querySelector('body');
    if(userStore.user?.id) {
      socketStore.connect(userStore?.data?.id);
      const bgs = await userStore.getSettings();
      setBackground(url, bgs);
    }
  }
});

nuxtApp.hook('page:finish', () => {
  if (body.value?.scrollTop) body.value.scrollTop = 0;
  sidebarStore.close_all_sidebar();
  if (isAnchorLink.value) {
    let anchorElement = document.getElementById(AnchorElementName.value);
    if (anchorElement) {
      body.value.scrollTop = anchorElement.getBoundingClientRect().y;
      isAnchorLink.value = null;
      AnchorElementName.value = null;
    }
  }
});

if (useCookie('l').value) {
  await userStore.check(useCookie('l').value);
}

const openMenuRole = ref(false);
const openUserMenu = ref(false);
const isSigIn = ref(false);
const editBurgerMenu = ref(null);

const OpenMenuRole = (event) => {
  if (event?.role) openUserMenu.value = 3;
  else openUserMenu.value = null;
  openMenuRole.value = true;
};

const EditAdminHeader = () => {
  isSigIn.value = true;
  if (userStore?.user?.role?.id == 2) {
    editBurgerMenu.value = 'userBurgerMenu';
  } else {
    editBurgerMenu.value = 'adminBurgerMenu';
  }
};
const EditUserHeader = () => {
  isSigIn.value = true;
  editBurgerMenu.value = 'userBurgerMenu';
};

function toAnchorLink(name) {
  isAnchorLink.value = true;
  AnchorElementName.value = name;
}

//_____WebSockets_____\\
watch(
  () => userStore.user.id,
  async () => {
    if (userStore.user.id) {
      socketStore.connect(userStore?.data?.id);
      const bgs = await userStore.getSettings();
      setBackground(url, bgs);
    }
  }
);
</script>

<style lang="scss" scoped>
.modal-window__content {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .container {
    display: flex;
    max-width: 370px;
    width: 100%;
    padding: 0;
    flex-direction: column;
    align-items: flex-start;
  }
}

.form-input {
  display: flex;
  gap: 10px;
  flex-direction: column;
  input,
  .p-dropdown {
    width: 100%;
    border-radius: 200px;
    background-color: #f6f6f6;
  }
  .form-button,
  .form-button:hover {
    margin: 20px 0;
    color: #fff;
    height: 47px;
    border: none !important;
    background: linear-gradient(90.25deg, #2c96ea 9.03%, #00d1ff 98.03%) !important;
    border-radius: 200px !important;
    text-transform: uppercase !important;
    font-size: 20px !important;
    line-height: 26px !important;
    letter-spacing: 0.05em !important;
  }
  .p-button-label {
    font-weight: 400;
  }
  .out-choose-image {
    background-color: #e2e2e2;
    width: 100px;
    height: 100px;
    border-radius: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 100%;
      height: 100%;
      border-radius: 100px;
      border: 1px solid #000;
    }
  }
  .p-checkbox-icon {
    display: none;
  }
}

.form-checkbox {
  flex-direction: row;
  align-items: center;
  label {
    margin: 0 0 0 10px;
  }
  .p-checkbox-icon {
    background-color: #000;
  }
}

.p-paginator {
  background: none;
}
</style>
