<template>
  <div class="last-post_cards_container">
    <h1 class="page-title">Последние записи</h1>
    <div class="cards-container cards-container_column--two">
      <CardsPost
        v-for="value in blogStore.blogs?.posts?.rows"
        :max-width="1000"
        :max-height="'400px'"
        :img-height="'200px'"
        :info="value"
      />
    </div>
    <div class="cards-container_tools">
      <Button @click="navigateTo('/blogs')" severity="success" class="button-ind" label="Смотреть блог" />
      {{ blogStore?.blogs?.posts?.count }}
    </div>
  </div>
</template>

<script setup>
import { useBlogStore } from '@/store/post.js';

const blogStore = useBlogStore();

await blogStore.allBlogsByRubricId(1, { limit: 4 });
</script>
