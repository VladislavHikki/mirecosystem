<template>
  <div class="cropper_content">
    <div class="cropper_item avatar_container cropper_content_images">
      <template v-if="isAvatar">
        <img class="avatar" :src="current_image_url" alt="" />
        <img class="avatar-profile" width="30" height="30" style="border-radius: 50%" :src="current_image_url" alt="" />
      </template>
      <template v-if="isBg">
        <img width="200" height="200" :src="current_image_url" alt="" />
      </template>
    </div>
    <vue-cropper
      class="cropper_item cropper_box"
      :class="typeBox == 'square' ? 'cropper_box--square' : 'cropper_box--circle'"
      style="max-height: 400px"
      ref="cropper"
      :src="getUrl(current_image_url ?? image)"
      @cropend="crop"
      @ready="setScale"
      @zoom="crop"
      :aspectRatio="1"
    />
    <div class="cropper_item">
      <Button label="Сохранить" @click="$emit('getImage', { file: new_image, url: current_image_url })" />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  image: String | Object | undefined | null,
  visible: Boolean,
  isAvatar: Boolean,
  isBg: Boolean,
  typeBox: {
    type: String,
    default: 'circle',
  },
});

const setScale = ()=> {
  cropper.value.setCropBoxData({height: cropper.value.getImageData()?.height, left: (cropper.value.getContainerData()?.width / 2) - (cropper.value.getCropBoxData()?.width + 80) / 2});
}

const cropper = ref();

let current_image_url = ref();
let new_image = ref(props?.image);

const getUrl = (img) => {
  if (typeof img == 'object') {
    try {
      cropper.value.replace(URL.createObjectURL(img), false);
      current_image_url.value = URL.createObjectURL(img);
      return URL.createObjectURL(img);
    } catch (error) {
      return null;
    }
  }
  current_image_url.value = img;
  return img;
};
const crop = () => {
  cropper.value.getCroppedCanvas().toBlob((blob) => {
    current_image_url.value = URL.createObjectURL(blob);
    new_image.value = new File([blob], 'new_avatar', { type: blob?.type });
  });
};
</script>

<style lang="scss">
.cropper {
  &_content {
    display: flex;
    flex-direction: column;
    gap: 12px;
    &_images {
      display: flex;
      align-items: center;
      gap: 12px;
    }
  }
}
.cropper_box {
  &--circle {
    .cropper-container {
      .cropper-crop-box {
        .cropper-view-box,
        .cropper-face {
          border-radius: 50%;
        }
        .cropper-line {
          display: none;
        }
        .point {
          &-sw,
          &-nw,
          &-sw,
          &-se,
          &-ne {
            display: none;
          }
        }
      }
    }
  }
  &--square {
    .cropper-container {
      .cropper-crop-box {
        .cropper-face,
        .cropper-view-box {
          border-radius: none;
        }
      }
    }
  }
}
</style>
