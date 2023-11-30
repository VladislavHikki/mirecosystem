<template>
  <div class="avatar_container">
    <!-- <div class="border-trainer" :class="`border-trainer_size--${size}`" v-if="roleId == 2" /> -->
    <BorderTrainer :class="`border-trainer border-trainer_size--${size}`" v-if="roleId == 2" />
    <div
      :class="
        `user-status_type--${getUserStatus(status)}`,
        roleId == 2 ? `user-status_size--${size}` : `user-status_size--${size}-without-border`
      "
      v-if="getUserStatus(status)"
      class="user-status"
    />
    <img
      loading="lazy"
      v-if="img"
      :class="`avatar avatar_size--${size}`"
      :src="`${url}/api/public${img}`"
    />
    <div v-else :class="`avatar avatar_size--${size} avatar-img`"></div>
  </div>
</template>

<script setup>
import url from '~/store/config';
const props = defineProps({
    img: {
        type: String,
        default: new String,
    },
    size: {
        type: String,
        default: "default",
    },
    roleId: {
        type: Number,
        default: 0,
    },
    status: {
        type: Number,
        default: 0,
    }
})
</script>
