<template>
  <div class="posts_container_popular">
    <h2 class="page-subtitle" style="color: #9e9e9e; padding-bottom: 24px">Популярные</h2>
    <div class="posts_container_popular_cards">
      <BlocksBannerMir style="overflow: clip; max-width: 500px" />
      <CardsPost
        :max-width="500"
        :max-height="'120px'"
        :img-height="'120px'"
        :show-text="false"
        v-for="value in blogStore?.popularPosts"
        :info="value"
      />
    </div>
  </div>
</template>

<script setup>
import { useBlogStore } from '@/store/post';

const blogStore = useBlogStore();

await blogStore.getPopularPosts();
</script>

<style lang="scss" scoped>
.posts_container_popular_cards {
  display: flex;
  flex-direction: column;
  gap: 32px;
}
@media screen and (max-width: $x-large) {
  .posts_container_popular {
    flex: 1 1 auto;
  }
}
</style>
