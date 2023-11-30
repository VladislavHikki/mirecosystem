<template>
  <div class="menuBlogUI">
    <div class="header_menu">
      <NuxtLink to="/blogs">
        <div class="rubric_container_item">Главная</div>
      </NuxtLink>
      <div class="rubric_container" v-for="value in categoryStore?.rubrics?.rubrics">
        <NuxtLink :to="`/blogs/rubric/${value?.id}`">
          <div class="rubric_container_item">
            {{ value?.label }}
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCategoryStore } from '@/store/category';

const categoryStore = useCategoryStore();
const emit = defineEmits(['chooseRubric']);

await categoryStore.getAllRubrics(1);
</script>

<style lang="scss">
.menuBlogUI {
  width: 100%;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  padding: 5px 121px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  // position: sticky;
  top: 0;
  z-index: 96;
  background: white;
  height: 50px;
  @media screen and (max-width: $small) {
    padding: 5px 20px;
  }
  .header_menu {
    display: flex;
    overflow-x: auto;
    height: 100%;
    gap: 10px;
    overscroll-behavior-x: none;
    justify-content: space-between;
    align-items: center;
    overflow-y: hidden;
    width: 100%;
    overflow-x: auto;
    white-space: nowrap;
    .header_menu_item {
      display: flex;
      gap: 10px;
      &_icon {
        height: 33px;
        width: 33px;
      }
      a {
        color: black;
        // font-weight: bold;
      }
    }
  }
  // @media (max-width: $medium) {
  //     display: none;
  // }
}

.rubric_container_item {
  cursor: pointer;
}
</style>
