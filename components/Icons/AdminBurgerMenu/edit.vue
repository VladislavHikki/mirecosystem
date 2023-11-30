<template>
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="40" height="40" fill="none" />
    <rect
      x="26.9374"
      y="7.53757"
      width="7.98539"
      height="25.6348"
      transform="rotate(42.0873 26.9374 7.53757)"
      :fill="color"
    />
    <path
      d="M31.4227 2.70971C31.7928 2.29985 32.4252 2.26768 32.835 2.63785L37.0294 6.4261C37.4393 6.79628 37.4715 7.42862 37.1013 7.83849L33.8764 11.4092L28.1977 6.2804L31.4227 2.70971Z"
      :fill="color"
    />
    <path
      d="M7.44723 35.4135C6.6492 35.6703 5.90836 34.8902 6.20605 34.1065L8.48383 28.1101L14.1327 33.262L7.44723 35.4135Z"
      :fill="color"
    />
  </svg>
</template>

<script>
export default {
  props: {
    color: String,
  },
};
</script>
