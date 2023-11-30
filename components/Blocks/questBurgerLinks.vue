<template>
  <div class="userBurgerMenu burger_menu">
    <div class="burger_item">
        <nuxt-link @click="$emit('closeMenu')" to="">Страница</nuxt-link>
        <nuxt-link @click="$emit('closeMenu')" to="">Блоги & Ленты</nuxt-link>
        <nuxt-link @click="$emit('closeMenu')" to="">Фото & Видео (0)</nuxt-link>
        <nuxt-link @click="$emit('closeMenu')" to="">Обьявления (0)</nuxt-link>
        <nuxt-link @click="$emit('closeMenu')" to="">Страница</nuxt-link>
        <nuxt-link @click="$emit('closeMenu')" to="">Ресурсы (0)</nuxt-link>
        <nuxt-link @click="$emit('closeMenu')" to="">Команды (0)</nuxt-link>
        <nuxt-link @click="$emit('closeMenu')" to="">Рефералка (0)</nuxt-link>
        <nuxt-link @click="$emit('closeMenu')" to="">Спонсорство (0)</nuxt-link>
        <nuxt-link @click="$emit('closeMenu')" to="">Донаты (0)</nuxt-link>
        <nuxt-link @click="$emit('closeMenu')" to="">Подписчики (0)</nuxt-link>
        <nuxt-link @click="$emit('closeMenu')" to="">Подписки (0)</nuxt-link>
    </div>
  </div>
</template>
