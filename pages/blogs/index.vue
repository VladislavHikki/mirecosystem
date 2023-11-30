<template>
  <div>

    <BlocksMenuBlog />
    <div class="nef">
      <UIMarquee :content="deriveStore?.derives?.currency"/>
      <!-- <marquee>
        <div class="coin">
          <div class="coin_name" v-for="value in deriveStore?.derives">
            <div class="coin_info">
              <img
                style="width: 30px; height: 30px; border-radius: 50%; object-fit: cover"
                :src="`${url}/api/${value?.image}`"
                alt=""
              />
            </div>
            <div class="coin_info">{{ value?.label }} ${{ value?.currentRate }}</div>
            <div class="coin_rates">
              <div class="coin_rates-day" :class="getClassByRate('coin_rates-day', value?.dayRates).class">
                За сутки <span>{{ getClassByRate('derive-card_info_well-day', value?.dayRates).rate }}%</span>
              </div>
              <div class="coin_rates-year" :class="getClassByRate('coin_rates-year', value?.yearRate).class">
                За год <span>{{ getClassByRate('derive-card_info_well-day', value?.yearRate).rate }}%</span>
              </div>
            </div>
          </div>
        </div>
      </marquee> -->
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

const blogStore = useBlogStore();
const deriveStore = useDeriveStore();
const notificationStore = useNotificationStore();
const params = ref({
  rubricId: '',
});
const rubricLabel = ref('Главная');
const route = useRoute();

let page = ref(0);

function getClassByRate(className, rate) {
  switch (true) {
    case rate < 0:
      return { class: className + '-less', rate: rate };
    case rate > 0:
      return { class: className + '-greater', rate: '+' + rate };
    default:
      return { class: className + '-nothing', rate: rate };
  }
}

watch(page, async () => {
  await blogStore.allBlogsByRubricId(page.value + 1, params.value);
});

onMounted(async ()=>{
  await notificationStore.deletePostsNotification();
  await notificationStore.requestPostsNotification();
});

await blogStore.allBlogsByRubricId(1, params.value);
await deriveStore.getAllDerive();
</script>
