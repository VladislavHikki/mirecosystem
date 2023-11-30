<template>
  <div class="userBurgerMenu burger_menu">
    <div class="burger_item">
      <nuxt-link @click="$emit('closeMenu')" to="/profile/"> <IconsUserBurgerMenuProfile /> Профиль </nuxt-link>
      <nuxt-link @click="$emit('closeMenu')" to="/profile/blog" v-if="checkRoles(userStore?.user?.roles, 1)">
        <IconsVisitorBurgerMenuBlog :color="'#01C314'" /> Блог
      </nuxt-link>
      <nuxt-link @click="$emit('closeMenu')" to="/profile/finances"> <IconsUserBurgerMenuFinance />Финансы </nuxt-link>
      <nuxt-link @click="$emit('closeMenu')" to="/profile/resources"> <IconsUserBurgerMenuResource />Ресурсы </nuxt-link>
      <!-- <nuxt-link @click="$emit('closeMenu')" to="/announcements/">
            <IconsUserBurgerMenuAdvertising />Объявления
        </nuxt-link> -->
      <nuxt-link @click="$emit('closeMenu')" to="/profile/teams"> <IconsUserBurgerMenuTeam />Команды </nuxt-link>
      <!-- <nuxt-link @click="$emit('closeMenu')" to="/profile/franchises">
            <IconsUserBurgerMenuFranchises />Франшизы
        </nuxt-link> -->
      <nuxt-link @click="$emit('closeMenu')" to="/profile/referals">
        <IconsUserBurgerMenuReferalka class="burgerMenu_icon" />Рефералка
      </nuxt-link>
      <!-- <nuxt-link to="/dev">
            <IconsUserBurgerMenuSettings :color="'#9B19B9B'" class="burgerMenu_icon" />Настройки
        </nuxt-link> -->
      <!-- <nuxt-link @click="$emit('closeMenu')" to="/dev">
      <IconsUserBurgerMenuParther :color="'#9B9B9B'" class="burgerMenu_icon" />Партнерка
    </nuxt-link> -->

      <!-- <nuxt-link to="/dev">
            <IconsUserBurgerMenuTheBest :color="'#9B9B9B'" class="burgerMenu_icon" />Лучший!
        </nuxt-link> -->
      <!-- <nuxt-link to="/dev"> <IconsUserBurgerMenuClients :color="'#9B9B9B'" class="burgerMenu_icon" />Клиенты </nuxt-link>
    <nuxt-link to="/dev"> <IconsUserBurgerMenuShop :color="'#9B9B9B'" class="burgerMenu_icon" />Магазин </nuxt-link>
    <nuxt-link to="/dev"> <IconsUserBurgerMenuPost :color="'#9B9B9B'" class="burgerMenu_icon" />Постинг </nuxt-link> -->
      <!-- <nuxt-link to="/dev">
            <IconsInvestment color="#9B9B9B" class="burgerMenu_icon" />Инвестиции
        </nuxt-link> -->

      <nuxt-link @click="$emit('closeMenu')" to="/profile/settings">
        <IconsUserBurgerMenuSettings :color="'#01C314'" class="burgerMenu_icon" />Настройки
      </nuxt-link>

      <div class="menu__link" @click="logout">
        <IconsAdminBurgerMenuLeave :color="'#01C314'" class="burgerMenu_icon" />Выход
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '@/store/user';

const userStore = useUserStore();

</script>

<style lang="scss">
.burger_item {
  width: 100%;
  a,
  .menu__link {
    font-size: 20px;
    display: flex;
    gap: 17px;
    justify-content: flex-start;
    align-items: center;
    cursor: pointer;
    .burgerMenu_icon {
      min-width: 40px;
      min-height: 40px;
    }
  }
}
</style>
<script setup lang="ts"></script>
