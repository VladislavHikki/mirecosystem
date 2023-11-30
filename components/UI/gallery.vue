<template>
  <div class="gallery" v-if="images?.length">
    <div class="gallery_content">
      <div class="gallery_content_img" @click="$emit('choose', 0)">
        <img :src="`${url}/api/${images[0]?.attach}`" alt="" />
      </div>
      <div class="gallery_content_panel-img" v-if="images?.length > 1">
        <div
          class="gallery_content_panel-img_item"
          v-for="(value, index) in getFilterArr(images)"
          :key="index"
          @click="$emit('choose', index + 1)"
        >
          <img :src="`${url}/api/${value?.attach}`" width="100" height="100" alt="" />
        </div>
        <div class="gallery_content_panel-img_item" @click="$emit('choose', 0)" v-if="otherImg">
          <div
            class="gallery_content_other-img"
            :style="{ 'background-image': `url(${url}/api/${images[0]?.attach})` }"
          ></div>
          <i class="pi pi-images">
            <span style="font-size: 16px">+{{ otherImg }}</span></i
          >
        </div>
      </div>
    </div>
    <!-- <pre>
            {{ images }}
        </pre> -->
  </div>
</template>

<script setup>
import url from '~/store/config';

const props = defineProps({
  images: {
    type: Array,
    default: [],
  },
  numVisible: {
    type: Number,
    default: 2,
  },
});

let otherImg = ref(false);

const getFilterArr = (arr) => {
  let imagesArr = [];
  for (let value in arr) {
    if (value == 0) continue;
    else if (value == props?.numVisible + 1) {
      otherImg.value = arr?.length - (props?.numVisible + 1);
      break;
    } else imagesArr.push(arr[value]);
  }
  return imagesArr;
};
</script>

<style scoped lang="scss">
.gallery {
  &_content {
    display: flex;
    gap: 12px;
    &_img > img {
      height: 400px;
      width: 100%;
      object-fit: contain;
      object-position: left;
      cursor: pointer;
    }
    &_panel-img {
      display: flex;
      flex-direction: column;
      gap: 8px;
      &_item {
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        width: 100px;
        height: 100px;
        // background-color: #ececec;
        border-radius: 8px;
        & > i {
          font-size: 32px;
          position: absolute;
          z-index: 2;
          color: #f6f6f6;
          mix-blend-mode: overlay;
          display: flex;
          align-items: center;
          gap: 4px;
        }
        & > img {
          width: 100px;
          height: 100px;
          object-fit: contain;
          object-position: center;
        }
      }
    }
    @media screen and (max-width: $x-small) {
        flex-direction: column;
        &_panel-img {
            flex-direction: row;
        }
    }
  }

  .gallery_content_other-img {
    background-position: center;
    background-size: cover;
    position: absolute;
    filter: blur(6px);
    width: 100%;
    height: 100%;
    z-index: 1;
  }
}
</style>
