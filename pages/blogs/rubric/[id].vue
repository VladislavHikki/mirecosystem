<template>
  <div>
    <BlocksMenuBlog />
    <div class="nef" style="background: black">
      <UIMarquee :content="deriveStore?.derives?.currency" />
    </div>
    <div class="posts container">
      <div class="posts_container">
        <div class="posts_container_cards">
          <CardsCurrentRubric :label="rubricLabel" />
          <template v-if="blogStore?.blogs.posts.rows.length">
            <BlocksBannerSchema style="overflow: clip; max-width: 770px;" />
            <CardsPost
              v-for="value in blogStore?.blogs?.posts?.rows"
              :max-width="770"
              :show-link-to-post="true"
              :max-height="'400px'"
              :img-height="'200px'"
              :key="value.id"
              :info="value"
            />
          </template>
          <h1 v-else class="page-title">Таких постов нет</h1>
        </div>
        <BlocksPostPopular />
      </div>
      <div class="pagination_btns">
        <Paginator
          v-if="blogStore?.blogs?.pages > 1"
          :template="{
            '640px': 'PrevPageLink CurrentPageReport NextPageLink',
            '960px': 'FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink',
            '1300px': 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink',
            default: 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink JumpToPageDropdown JumpToPageInput',
          }"
          v-model:first="page"
          :total-records="blogStore?.blogs?.pages"
          :rows="1"
          currentPageReportTemplate="{last} из {totalRecords}"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import url from '@/store/config';
import { useBlogStore } from '@/store/post';
import { useDeriveStore } from '@/store/derive';
import { useNotificationStore } from '~/store/notifications';

const notificationStore = useNotificationStore();
const blogStore = useBlogStore();
const deriveStore = useDeriveStore();
const route = useRoute();

let page = ref(0);

await deriveStore.getAllDerive();
await blogStore.allBlogsByRubricId(1, { rubricId: route?.params?.id });

watch(page, async () => {
  await blogStore.allBlogsByRubricId(page.value + 1, { rubricId: route?.params?.id });
});

onMounted(async ()=>{
  await notificationStore.requestPostsNotification();
});

let rubricLabel = ref(blogStore?.rubric?.label ? blogStore?.rubric?.label : 'Главная');
</script>
