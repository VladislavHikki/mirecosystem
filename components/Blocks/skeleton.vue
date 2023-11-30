<template>
  <!-- Skeleton -->
  <div class="lastResource-card">
    <nuxt-link>
      <Skeleton style="border-radius: 50%;" size="100px"></Skeleton>
    </nuxt-link>
    <div class="lastResource-card_info" style="width: 100%">
      <div class="userName">
        <Skeleton width="80%"></Skeleton>
      </div>
      <div class="usersLink">
        <Skeleton width="60%" class="mb-2"></Skeleton>
      </div>
      <div>
        <Skeleton width="55%" class="mb-2"></Skeleton>
      </div>
      <div class="data">
        <Skeleton width="40%" class="mb-2"></Skeleton>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(['store']);
</script>
