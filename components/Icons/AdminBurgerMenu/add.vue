<template>
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="40" height="40" fill="none" />
    <path
      d="M36.8982 20C36.8982 29.2346 29.3447 36.7424 20 36.7424C10.6553 36.7424 3.10182 29.2346 3.10182 20C3.10182 10.7654 10.6553 3.25763 20 3.25763C29.3447 3.25763 36.8982 10.7654 36.8982 20Z"
      :stroke="color"
      stroke-width="3"
    />
    <line x1="19.975" y1="12.0601" x2="19.975" y2="27.9399" :stroke="color" stroke-width="3" stroke-linecap="round" />
    <line x1="12.0601" y1="19.7103" x2="27.9399" y2="19.7103" :stroke="color" stroke-width="3" stroke-linecap="round" />
  </svg>
</template>

<script>
export default {
  props: {
    color: String,
  },
};
</script>
