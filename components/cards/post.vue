<template>
  <div class="post-card" lang="ru">
    <div class="post-card_container" :style="{ 'max-width': maxWidth + 'px', 'max-height': maxHeight }">
      <NuxtLink class="post-card_container_preview" :to="`/blogs/post/${info.id}`">
        <div class="post-card_container_preview" :style="{ height: imgHeight }">
          <img loading="lazy" width="200" :style="{ height: imgHeight }" :src="`${url}/api/${info.preview}`" alt="" />
        </div>
      </NuxtLink>
      <div class="post-card_container_info">
        <NuxtLink :to="`/blogs/post/${info.id}`">
          <div class="post-card_container_info_title">
            {{ info.title }}
          </div>
        </NuxtLink>
        <div class="post-card_container_info_detail">
          <div class="post-card_container_info_detail_date">
            Опубликовано
            {{
              new Date(info.createdAt).toLocaleString('locale', {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
              })
            }}
            в
            {{
              new Date(info.createdAt).toLocaleString('locale', {
                hour: 'numeric',
                minute: 'numeric',
              })
            }}
          </div>
          <!-- <NuxtLink :to="`/profile/${info.user.id}`">
                <div class="post-card_container_info_detail_user">{{ info.user?.name }}</div>
              </NuxtLink> -->
        </div>
        <div class="post-card_container_info_text" v-if="showText" v-html="getDescription(info.text)"></div>
      </div>
      <div class="post-card_container_info_btn" v-if="showLinkToPost">
        <NuxtLink :to="`/blogs/post/${info.id}`">
          <Button severity="success" rounded icon="pi pi-plus" />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import url from '@/store/config';

const props = defineProps({
  info: {
    type: Object,
  },
  maxWidth: {
    type: Number,
    default: 770,
  },
  maxHeight: {
    type: String,
  },
  showText: {
    type: Boolean,
    default: true,
  },
  showLinkToPost: {
    type: Boolean,
    default: false,
  },
  imgHeight: {
    type: String,
  },
});
</script>

<style lang="scss" scoped>
.post-card {
  hyphens: auto;
  &_container {
    display: flex;
    align-items: flex-start;
    background-color: white;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.25);
    position: relative;
    &_preview > img {
      width: 200px;
      object-fit: contain;
      object-position: left;
    }

    &_info {
      padding: 24px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      // position: relative;

      &_btn {
        position: absolute;
        bottom: -20px;
        right: 20px;
      }

      &_title,
      &_text,
      &_detail_user {
        word-break: break-word;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }

      &_text {
        font-size: 20px;
      }

      &_title {
        -webkit-line-clamp: 1;
        font-size: 24px;
        font-weight: bold;
      }
      &_detail {
        color: #666666;
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        &_user {
          -webkit-line-clamp: 2;
          color: #2c96ea;
        }
        &_date {
          color: var(--date-text);
        }
      }

      &_text {
        -webkit-line-clamp: 4;
      }
    }
  }
}

@media screen and (max-width: $x-large) {
  .post-card {
    &_container {
      flex-direction: column;
      max-width: none !important;
      max-height: none !important;
      &_preview {
        width: 100%;
      }
      &_preview > img {
        width: 100%;
        height: 200px;
        object-position: center;
        object-fit: contain;
      }
    }
  }
}
</style>
