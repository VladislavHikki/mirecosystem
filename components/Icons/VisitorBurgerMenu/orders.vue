<template>
  <svg width="40px" height="40px" viewBox="0 0 18 20" :fill="props.color">
    <path
      d="M9,0A1.54,1.54,0,0,0,7.5,1.5v.7A6.88,6.88,0,0,0,2,9v4.5L0,15.8V17H18V15.8l-2-2.3V9a6.88,6.88,0,0,0-5.5-6.8V1.5A1.54,1.54,0,0,0,9,0ZM7,18a2,2,0,0,0,4,0Z"
    />
  </svg>
</template>

<script setup>
const props = defineProps(['color']);
</script>
