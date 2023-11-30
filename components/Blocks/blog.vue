<template>
    <div class="game_links">
        <nuxt-link @click="$emit('closeMenu')" to="/blogs"> 
            Главная 
        </nuxt-link>
        <div v-for="value in categoryStore?.rubrics?.rubrics">
            <nuxt-link @click="$emit('closeMenu')" :to="`/blogs/${value?.id}`">
                {{ value.label }}
            </nuxt-link>
            <!-- <nuxt-link @click="$emit('closeMenu')" to="/#">
                Республика
            </nuxt-link>
            <nuxt-link @click="$emit('closeMenu')" to="/#"> 
                Льготы 
            </nuxt-link>
            <nuxt-link @click="$emit('closeMenu')" to="/#"> 
                Вместе! 
            </nuxt-link>
            <nuxt-link @click="$emit('closeMenu')" to="/#">
                МОКО
            </nuxt-link>
            <nuxt-link @click="$emit('closeMenu')" to="/#"> 
                Франшизы 
            </nuxt-link>
            <nuxt-link @click="$emit('closeMenu')" to="/#"> 
                Приватизация 
            </nuxt-link>
            <nuxt-link @click="$emit('closeMenu')" to="/#">
                Персоналии
            </nuxt-link>
            <nuxt-link @click="$emit('closeMenu')" to="/#"> 
                Бизнес 
            </nuxt-link>
            <nuxt-link @click="$emit('closeMenu')" to="/#"> 
                Прочее 
            </nuxt-link> -->
            <!-- <nuxt-link to="/dev">
                <IconsVisitorBurgerMenuParther class="burger_menu_icon burger_menu_icon_disabled" /> Партнерка
            </nuxt-link> -->
        </div>
    </div>
</template>
<script setup>
import { useCategoryStore } from '@/store/category';

const categoryStore = useCategoryStore();

await categoryStore.getAllRubrics(1);
</script>
<style scss>
    .game_links{
        display:grid;
        gap:17px;
    }
</style>