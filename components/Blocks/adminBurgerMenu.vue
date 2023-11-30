<template>
  <div class="burger_item">
    <!-- <nuxt-link @click="$emit('closeMenu')" to="/profile/">
      <IconsUserBurgerMenuProfile class="burger_menu_icon" /> Профиль
    </nuxt-link> -->
    <nuxt-link @click="$emit('closeMenu')" to="/admin/derive">
      <IconsCourse class="burger_menu_icon" :color="'#01C314'" /> Курсы
    </nuxt-link>
    <nuxt-link @click="$emit('closeMenu')" to="/admin/">
      <IconsAdminBurgerMenuAnalytics class="burger_menu_icon" />Статистика
    </nuxt-link>
    <nuxt-link @click="$emit('closeMenu')" to="/admin/control">
      <IconsAdminBurgerMenuControl class="burger_menu_icon" />Управление
    </nuxt-link>
    <nuxt-link @click="$emit('closeMenu')" to="/admin/installs">
      <IconsAdminBurgerMenuDownload :color="'#01C314'" class="burger_menu_icon" />Установки
    </nuxt-link>
    <nuxt-link @click="$emit('closeMenu')" to="/admin/location">
      <IconsAdminBurgerMenuLocation class="burger_menu_icon" />Местоположения
    </nuxt-link>
    <nuxt-link @click="$emit('closeMenu')" to="/admin/user-list">
      <IconsAdminBurgerMenuUsers class="burger_menu_icon" />Пользователи
    </nuxt-link>
    <nuxt-link @click="$emit('closeMenu')" to="/admin/admin-list">
      <IconsAdminBurgerMenuAdmins class="burger_menu_icon" />Админы
    </nuxt-link>
    <nuxt-link class="menu__link" @click="$emit('closeMenu')" to="/admin/finance">
      <IconsAdminBurgerMenuFinance class="burger_menu_icon" />Финансы
    </nuxt-link>
    <nuxt-link class="menu__link" to="/dev">
      <IconsAdminBurgerMenuAdd :color="'#9B9B9B'" class="burger_menu_icon" />Добавить
    </nuxt-link>
    <nuxt-link class="menu__link" to="/dev">
      <IconsAdminBurgerMenuEdit :color="'#9B9B9B'" class="burger_menu_icon" />Редактировать
    </nuxt-link>
    <!-- <nuxt-link class="menu__link" to="/profile/settings">
      <IconsAdminBurgerMenuSettings :color="'#01C314'" class="burger_menu_icon" />Настройки
    </nuxt-link> -->
    <!-- <div class="menu__link" @click="logout">
      <IconsAdminBurgerMenuLeave :color="'#01C314'" class="burger_menu_icon" />Выход
    </div> -->
  </div>
</template>

<style lang="scss">
.burger_item {
  width: 100%;
  a,
  .menu__link {
    display: flex;
    justify-content: flex-start;
    .burger_menu_icon {
      min-width: 40px;
      min-height: 40px;
    }
  }
}
</style>
