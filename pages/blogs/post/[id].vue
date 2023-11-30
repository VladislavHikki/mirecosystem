<template>
  <div class="container">
    <div class="one_post_container" lang="ru">
      <div class="one-post">
        <h2 class="one-post_title page-title" style="margin-bottom: 0px">{{ postInfo.title }}</h2>
        <div class="one-post_date">
          {{
            new Date(postInfo.createdAt).toLocaleString('locale', {
              year: 'numeric',
              month: 'numeric',
              day: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
            })
          }}
        </div>
        <div class="one-post_preview" style="position: relative">
          <img class="one-post_preview_img" :src="`${url}/api/${postInfo?.preview}`" alt="" />
        </div>
        <div class="one-post_text">
          <div
            ref="post_text"
            v-html="getDecode(postInfo.text)"
          ></div>
        </div>
        <div class="attachments-container">
          <Galleria
            v-model:activeIndex="activeIndex"
            v-model:visible="displayCustom"
            :value="getImages(imageSwipeArr)"
            :responsiveOptions="responsiveOptions"
            :numVisible="7"
            containerStyle="max-width: 850px"
            :circular="true"
            :fullScreen="true"
            :showItemNavigators="true"
            :showThumbnails="false"
            :next-button-props="123"
          >
            <template #item="slotProps">
              <img :src="`${url}/api/${slotProps?.item?.attach}`" alt="" style="object-fit: contain" />
            </template>
            <template #thumbnail="slotProps">
              <img
                :src="`${url}/api/${slotProps?.item?.attach}`"
                alt=""
                style="width: 100%; object-fit: contain; max-height: 400px"
              />
            </template>
          </Galleria>
          <UIGallery :images="getImages(postInfo?.attachments)" @choose="imageClick($event)" />
        </div>
        <div class="attachments-container" v-for="value in postInfo?.attachments?.filter((item) => item?.type == 3)">
          <video style="width: 100%" height="400" controls>
            <source :src="`${url}/api/${value?.attach}`" type="video/mp4" />
          </video>
        </div>
        <div class="attachments-container" v-for="value in postInfo?.attachments?.filter((item) => item?.type == 4)">
          <audio width="100%" controls>
            <source :src="`${url}/api/${value?.attach}`" type="audio/mp3" />
          </audio>
        </div>
        <div
          class="attachments-container"
          v-for="value in postInfo?.attachments?.filter((item) => item?.type == 1 || item?.type == 0)"
        >
          <nuxt-link :to="`${url}/api/${value?.attach}`" download
            ><Button outlined rounded icon="pi pi-download" :label="value?.label"
          /></nuxt-link>
        </div>
        <div class="icons-container">
          <div @click="liked('post', postInfo?.id)" class="icon-container">
            <span v-if="blogStore.liked" class="pi pi-heart-fill icon-container-action"></span>
            <span v-else class="pi pi-heart icon-container-action"></span>
            <h3>{{ blogStore?.likesCount }}</h3>
          </div>
          <div class="icon-container">
            <span class="pi pi-comment icon-container-action"></span>
            <h3>{{ postInfo?.commentsCount }}</h3>
          </div>
        </div>
        <BlocksComments :objectId="route?.params?.id" />
      </div>
      <BlocksPostPopular />
    </div>
  </div>
</template>

<script setup>
import url from '@/store/config';
import { useBlogStore } from '@/store/post';
import { useNotificationStore } from '~/store/notifications';

const notificationStore = useNotificationStore();
const blogStore = useBlogStore();
const route = useRoute();
const getImages = (attachments) => {
  let arr = [];
  if (attachments?.length) {
    attachments.map((item) => {
      if (item?.type == 2) arr.push(item);
    });
  }
  return arr;
};
const postInfo = ref(await blogStore.getPostById(route?.params?.id));
const imageSwipeArr = getImages(postInfo?.value.attachments);
const responsiveOptions = ref([
  {
    breakpoint: '991px',
    numVisible: 4,
  },
  {
    breakpoint: '767px',
    numVisible: 3,
  },
  {
    breakpoint: '575px',
    numVisible: 1,
  },
]);
const activeIndex = ref(0);
const displayCustom = ref(false);
const post_text = ref();
const imageClick = (index) => {
  activeIndex.value = index;
  displayCustom.value = true;
};

const liked = async (type, id) => {
  await blogStore.like(type, id);
  await blogStore.getPostById(route?.params?.id);
};

onMounted(async () => {
  await notificationStore.deletePostsNotification();
});

await blogStore.allBlogsByRubricId(1, null);

const handleKeyPress = (event) => {
  if (event.key === 'ArrowLeft') {
    if (activeIndex.value > 0) {
      activeIndex.value--;
    } else {
      activeIndex.value = imageSwipeArr.length - 1;
    }
  }
  if (event.key === 'ArrowRight') {
    if (activeIndex.value < imageSwipeArr.length - 1) {
      ++activeIndex.value;
    } else {
      activeIndex.value = 0;
    }
  }
};

onMounted(() => {
  window.addEventListener('keydown', handleKeyPress);
  getDescriptionForHtml(post_text.value);
});

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeyPress);
});
</script>

<style lang="scss" scoped>
.one-post {
  max-width: 1000px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 25px;
  hyphens: auto;
  &_text {
    font-size: 20px;
    padding: 20px 0;
    white-space: pre-wrap;
    line-height: 1.2;
    // hyphens: auto;
    // word-break: break-all;
  }
  &_date {
    color: var(--date-text);
  }

  &_preview {
    height: 400px;
    width: 100%;
    position: relative;
    display: flex;
    &_img {
      height: auto;
      width: 100%;
      object-fit: contain;
      object-position: left;
    }
  }
  .avatar_container {
    display: flex;
    align-items: center;
    gap: 30px;
    @media (max-width: $small) {
      flex-direction: column;
      gap: 10px;
    }
  }
  .icon-container,
  .icons-container {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .icons-container {
    gap: 50px;
  }
  .icon-container-action {
    cursor: pointer;
  }
  .attachments-container {
    width: 100%;
    img {
      width: 100%;
    }
  }
}
</style>
