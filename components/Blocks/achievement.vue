<template>
  <div class="myAchievements_item">
    <span>{{ props.label }}</span>
    <Chip style="font-weight: bold;" :label="props.data || 0" />
  </div>
</template>

<script setup>
import Chip from 'primevue/chip';

const props = defineProps(['label', 'data']);
</script>

<style lang="scss">
.myAchievements_item {
  display: flex;
  gap: 8px;
  align-items: center;
}
</style>
