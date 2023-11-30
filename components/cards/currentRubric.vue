<template>
  <div class="rubric">
    <p class="rubric_text">
      {{ label }}
    </p>
  </div>
</template>

<script setup>
const { label } = defineProps(['label']);
</script>

<style scoped>
.rubric_text {
  font-size: 28px;
  padding: 20px 0 20px 0;
  text-align: center;
  border-top: thick double gray;
  border-bottom: thick double gray;
}
</style>
