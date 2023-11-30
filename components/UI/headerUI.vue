<template>
  <header>
    <div class="header_item_container">
      <div class="header_item">
        <div
          class="burger_menu"
          @click="sidebarStore.show_sidebar('visitor')"
          @mouseover="sidebarStore.show_sidebar('visitor')"
        >
          <div class="burger_menu_line"></div>
          <div class="burger_menu_line"></div>
          <div class="burger_menu_line"></div>
        </div>
        <!-- <nuxt-link to="/about-project"><IconsInfo class="info" /></nuxt-link> -->
        <Nuxt-link class="header_link" to="/" style="position: relative">
          <div class="header_logo">
            <div class="header_logo_container">
              <IconsLogo class="header_logo_icon" />
              <div class="header_logo_icon_item">Beta</div>
            </div>
            <div style="display: flex; flex-direction: column">
              <h1>
                МИР
                <div
                  class="circle_notification-post"
                  @click="visible_menu_info = !visible_menu_info"
                  @mouseenter="visible_menu_info = !visible_menu_info"
                  v-if="notificationStore?.getPostsNotification"
                >
                  {{ notificationStore?.getPostsNotification}}
                </div>
                <i
                  v-else
                  @click="visible_menu_info = !visible_menu_info"
                  @mouseenter="visible_menu_info = !visible_menu_info"
                  class="pi pi-info-circle"
                ></i>
                <div class="header_item_info-menu info-menu">
                  <Transition name="info-menu_animation">
                    <div ref="menu_info" v-if="visible_menu_info" class="header_item_info-menu_content info-menu">
                      <NuxtLink
                        to="/about-project"
                        class="info-menu_item"
                        @mouseenter="menu_iconInfo = true"
                        @mouseout="menu_iconInfo = false"
                      >
                        <IconsInfo v-if="!menu_iconInfo" :color="'#01C314'" class="info-menu_item_icon" />
                        <IconsInfo v-else :color="'#019EC3'" class="info-menu_item_icon" />
                        О проекте
                      </NuxtLink>
                      <NuxtLink
                        :to="
                          notificationStore.getPostsNotification
                            ? `/blogs/post/${
                                notificationStore.postsNotification[0]?.postId
                              }`
                            : `/blogs`
                        "
                        class="info-menu_item"
                        style="position: relative"
                        @mouseenter="menu_iconNews = true"
                        @mouseout="menu_iconNews = false"
                      >
                        <IconsVisitorBurgerMenuNews v-if="!menu_iconNews" class="info-menu_item_icon" :color="'#01C314'" />
                        <IconsVisitorBurgerMenuNews v-else class="info-menu_item_icon" :color="'#019EC3'" />
                        Новости
                        <div
                          class="circle_notification-post info-menu_item_notification"
                          v-if="notificationStore?.getPostsNotification"
                        >
                          {{ notificationStore?.getPostsNotification }}
                        </div>
                      </NuxtLink>
                      <NuxtLink
                        to="/services"
                        class="info-menu_item"
                        @mouseenter="menu_iconServices = true"
                        @mouseout="menu_iconServices = false"
                      >
                        <IconsVisitorBurgerMenuServices
                          v-if="!menu_iconServices"
                          :color="'#01C314'"
                          class="info-menu_item_icon"
                        />
                        <IconsVisitorBurgerMenuServices v-else class="info-menu_item_icon" :color="'#019EC3'" />
                        Сервисы
                      </NuxtLink>
                      <NuxtLink
                        to="/benefits"
                        class="info-menu_item"
                        @mouseenter="menu_iconBenefits = true"
                        @mouseout="menu_iconBenefits = false"
                      >
                        <IconsVisitorBurgerMenuBenefits
                          v-if="!menu_iconBenefits"
                          :color="'#01C314'"
                          class="info-menu_item_icon"
                        />
                        <IconsVisitorBurgerMenuBenefits v-else :color="'#019EC3'" class="info-menu_item_icon" />
                        Льготы и аккаунты
                      </NuxtLink>
                      <NuxtLink
                        to="/earnmoney"
                        class="info-menu_item"
                        @mouseenter="menu_iconEarnMoney = true"
                        @mouseout="menu_iconEarnMoney = false"
                      >
                        <IconsUserBurgerMenuEarnMoney
                          v-if="!menu_iconEarnMoney"
                          :color="'#01C314'"
                          class="info-menu_item_icon"
                        />
                        <IconsUserBurgerMenuEarnMoney v-else :color="'#019EC3'" class="info-menu_item_icon" />
                        Заработать
                      </NuxtLink>
                    </div>
                  </Transition>
                </div>
              </h1>
              <span style="font-weight: bold; font-size: 12px"> ЭКОСИСТЕМА </span>
            </div>
          </div>
          <div
            class="circle_notification-post"
            @click="visible_menu_info = !visible_menu_info"
            @mouseenter="visible_menu_info = !visible_menu_info"
            v-if="notificationStore?.postsNotification?.length"
          >
            {{ notificationStore?.postsNotification?.length }}
          </div>
        </Nuxt-link>
      </div>
      <UISearch class="header_item searchPK" />
      <div class="header_item">
        <IconsSearchIcon class="searchBtn" @click="toggleSearch" />
        <div v-if="!userStore.isAuthorized" class="forVisitor">
          <NuxtLink class="toSignIn" href="/auth?page=auth"> Войти </NuxtLink>
          <NuxtLink class="toReg" href="/auth?page=reg"> Регистрация </NuxtLink>
        </div>
        <div class="social_media" v-else>
          <div
            v-if="checkRoles(userStore?.user?.roles, 1)"
            @mouseover="sidebarStore.show_sidebar('admin'), sidebarStore.close_sidebar('user')"
            @click="sidebarStore.show_sidebar('admin'), sidebarStore.close_sidebar('user')"
            class="admin_panel_btn"
          >
            A
          </div>

          <div
            style="cursor: pointer"
            class="notification header_logo_modal"
            @click="visible_menu_telegram = !visible_menu_telegram"
            @mouseenter="visible_menu_telegram = !visible_menu_telegram"
          >
            <IconsVisitorBurgerMenuTelegram class="telegramIcon" />
          </div>
          <div ref="menuTelegram" v-if="visible_menu_telegram" class="menu activeTg">
            <nuxt-link v-for="value in links" target="_blank" :to="value?.url">
              {{ value?.label }}
            </nuxt-link>
          </div>
          <BlocksHeaderChat delete_on_mobile />
          <BlocksHeaderNotification delete_on_mobile />
          <BlocksHeaderAvatar :avatar="userStore.user?.avatar" />
        </div>
      </div>
    </div>
    <div class="header_item_search">
      <div class="header_item">
        <IconsLeft @click="toggleSearch" />
      </div>
      <div class="header_item" style="width: 100%; flex: 1 1 auto; display: flex; justify-content: center">
        <UISearch :phone="true" style="width: 100%" />
      </div>
    </div>
  </header>
</template>

<script setup>
import { useUserStore } from '@/store/user';
import { useCategoryStore } from '@/store/category';
import { onClickOutside } from '@vueuse/core';
import { useNotificationStore } from '@/store/notifications';
import { useFavicon } from '@vueuse/core';
import { useSidebarStore } from '~/store/sidebar';

const categoryStore = useCategoryStore();
const sidebarStore = useSidebarStore();
const notificationStore = useNotificationStore();
const nuxtApp = useNuxtApp();
const favicon = useFavicon();
const menu_info = ref();

nuxtApp.hook('page:finish', () => {
  visible_menu_info.value = false;
  menu_iconInfo.value = false;
  menu_iconNews.value = false;
  menu_iconServices.value = false;
  menu_iconBenefits.value = false;
  menu_iconEarnMoney.value = false;
});

notificationStore.$subscribe(() => {
  if (notificationStore.getChatNotification || notificationStore.getOtherNotification) favicon.value = '/notification.svg';
  else favicon.value = '/default.svg';
});

let links = ref(null);
let visible_menu_info = ref(false);
let visible_menu_telegram = ref(false);
let menu_iconInfo = ref(false);
let menu_iconNews = ref(false);
let menu_iconServices = ref(false);
let menu_iconBenefits = ref(false);
let menu_iconEarnMoney = ref(false);

const userStore = useUserStore();
let userRole = ref(false);

watch(
  () => userStore?.user?.id,
  async () => {
    await getNotification(true);
    userRole.value = checkRoles(userStore?.user?.roles, 1);
  }
);
onMounted(async () => {
  if (userStore?.user?.id) await getNotification(true);
  await categoryStore.getAllLinks({ type: 1 });
  links.value = categoryStore.links.rows;
  userRole.value = checkRoles(userStore?.user?.roles, 1);
});

const emit = defineEmits(['openMenu']);

async function getNotification(isUserLogin = false) {
  await notificationStore.requestPostsNotification();
}

const menuTelegram = ref();

onClickOutside(menuTelegram, (event) => {
  visible_menu_telegram.value = false;
});

onClickOutside(menu_info, (e) => {
  visible_menu_info.value = false;
  menu_iconInfo.value = false;
  menu_iconNews.value = false;
  menu_iconServices.value = false;
  menu_iconBenefits.value = false;
  menu_iconEarnMoney.value = false;
});

function toggleSearch() {
  const mainHeader = document.querySelector('.header_item_container');
  const searchHeader = document.querySelector('.header_item_search');

  const computedStyle = window.getComputedStyle(mainHeader);
  const displayValue = computedStyle.getPropertyValue('display');

  if (displayValue != 'none') {
    mainHeader.style.display = 'none';
    searchHeader.style.display = 'flex';
  } else {
    mainHeader.style.display = 'flex';
    searchHeader.style.display = 'none';
  }
}
</script>

<style lang="scss">
header {
  position: sticky;
  top: 0;
  z-index: 99;
  background: var(--background-color);
}
.admin_panel_btn {
  width: 32px;
  height: 32px;
  align-items: center;
  justify-content: center;
  display: flex;
  background-color: black;
  color: white;
  border-radius: 50%;
  font-weight: bold;
}
.personal-Area_icon {
  width: 32px;
  height: 32px;
  border-radius: 50%;
}
.header_item_container,
.header_item_search {
  width: 100%;
  height: 45px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  padding: 5px 121px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 99;
  // background: white;
  gap: 32px;
  .header_item {
    display: flex;
    align-items: center;
    height: 100%;
    gap: 10px;
    .info-menu {
      &_animation {
        &-enter-active,
        &-leave-active {
          transition: opacity 0.2s ease;
        }
        &-enter-from,
        &-leave-to {
          opacity: 0;
        }
      }
    }
    &_info-menu {
      cursor: pointer;
      position: relative;
      & > i {
        font-size: 20px;
      }
      .info-menu {
        background-color: #fff;
        border-radius: 8px;
        position: absolute;
        width: max-content;
        transition: 0.3s;
        overflow: hidden;
        &_item {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 8px;
          &_notification {
            position: absolute;
            right: 32%;
            top: 7px;
            border-radius: 50%;
            padding: 4px 9px 4px 8px;
            background: rgba($color: #a22121, $alpha: 1);
            display: flex;
            justify-content: center;
            align-items: center;
            color: white;
          }
          &_icon {
            width: 20px;
            height: 20px;
            & > path {
              fill: '#01C314' !important;
            }
            &:hover > path {
              fill: '#019EC3' !important;
            }
          }
          &:hover {
            background-color: #ebebeb;
            transition: 0.3s;
          }
        }
      }
    }
    .searchBtn {
      display: none;
      @media (max-width: $medium) {
        display: block;
      }
    }
    .header_link {
      text-decoration: none;
      .circle_notification-post {
        position: absolute;
        z-index: 2;
        right: 0px;
        top: 5px;
        height: 20px;
        aspect-ratio: 1;
        border-radius: 50%;
        // padding: 4px 9px 4px 8px;
        background: rgba($color: #a22121, $alpha: 1);
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        font-size: 14px;
      }
      @media (max-width: $x-small) {
        .circle_notification-post {
          position: absolute;
          right: 25px;
          top: -2px;
        }
      }
      .header_logo {
        display: flex;
        align-items: center;
        gap: 6px;
        &_container {
          position: relative;
          overflow: hidden;
          border-radius: 50%;
        }
        &_icon {
          height: 33px;
          width: 33px;
          &_item {
            position: absolute;
            height: 50%;
            width: 100%;
            bottom: 0;
            background: rgb(169, 54, 44);
            color: white;
            font-size: 10px;
            text-align: center;
          }
        }
        h1 {
          color: black;
          font-size: 24px;
          font-weight: bold;
          i {
            font-size: 20px;
          }
          .header_item_info-menu {
            font-weight: normal;
            font-size: 16px;
            .circle_notification-post {
              position: absolute;
              z-index: 2;
              right: 40px;
              top: 7px;
              border-radius: 50%;
              padding: 4px 9px 4px 8px;
              background: rgba($color: #a22121, $alpha: 1);
              display: flex;
              justify-content: center;
              align-items: center;
              color: white;
            }
          }
        }
      }
    }

    a {
      text-decoration: none;
    }

    .notification {
      position: relative;
      .telegramIcon {
        @media (max-width: $x-small) {
          width: 20px;
          height: 20px;
        }
      }
      .circle_notification {
        position: absolute;
        border-radius: 50%;
        top: 0;
        height: 20px;
        right: -8px;
        padding: 0 5px 1px 5px;
        background: rgba($color: #a22121, $alpha: 1);
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
      }
    }

    .social_media {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      gap: 30px;
      a {
        cursor: pointer;
      }
      .menu {
        word-break: break-all;
        position: absolute;
        width: fit-content;
        padding: 10px;
        background-color: #fff;
        box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
        border-radius: 10px;
        top: 45px;
        display: none;
        flex-direction: column;
        gap: 15px;
        @media (max-width: $x-small) {
          left: 0;
        }
      }
      .activeTg {
        display: flex;
      }
    }
    .burger_menu {
      cursor: pointer;
      display: flex;
      flex-direction: column;
      height: 21px;
      width: 29px;
      justify-content: space-between;
      .burger_menu_line {
        width: 100%;
        height: 1px;
        background-color: black;
      }
    }
    .forVisitor {
      display: flex;
      gap: 29px;
      align-items: center;
      .toReg {
        background: #18af10;
        box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.25);
        border-radius: 7px;
        color: white;
        padding: 7px 28px;
      }
    }
  }
  .searchPK {
    @media (max-width: $medium) {
      display: none !important;
    }
  }
}
.header_item_search {
  display: none;
}

@media (max-width: $small) {
  .header_item_container,
  .header_item_search {
    padding-left: 20px;
    padding-right: 20px;
    .social_media {
      gap: 15px !important;
    }
  }
}
@media (max-width: $x-small) {
  .mobailDel {
    display: none;
  }
  .social_media {
    align-items: center;
    img,
    .admin_panel_btn {
      width: 20px;
      height: 20px;
      font-size: 14px;
    }
    .circle_notification {
      width: 15px !important;
      height: 15px !important;
      font-size: 12px;
    }
  }
  .header_item_container,
  .header_item_search {
    align-items: center;
    gap: 0px 10px;
    .header_item {
      align-items: center;
      h1 {
        font-size: 16px !important;
        i {
          font-size: 14px !important;
        }
      }
      .burger_menu {
        width: 20px;
        height: 20px;
      }
      .header_logo {
        align-items: center;
        &_icon {
          width: 27px !important;
          height: 27px !important;
        }
      }
      .info {
        width: 20px;
        height: 20px;
      }
      .forVisitor {
        font-size: 13px;
        display: flex;
        gap: 10px;
        align-items: center;
        .toReg {
          padding: 6px 9px;
        }
      }
    }
  }
}
</style>
