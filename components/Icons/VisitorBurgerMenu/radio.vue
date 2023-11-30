<template>
  <svg width="225" height="225" viewBox="0 0 225 225" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="151.489" cy="132.144" r="39.0413" :stroke="color" stroke-width="14.8791" />
    <path d="M32.957 106.035L85.862 106.035" :stroke="color" stroke-width="14.8791" stroke-linecap="round" />
    <path d="M32.957 132.144L85.862 132.144" :stroke="color" stroke-width="14.8791" stroke-linecap="round" />
    <path d="M32.957 158.092L85.862 158.092" :stroke="color" stroke-width="14.8791" stroke-linecap="round" />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M74.0599 53.0307H182.488C205.448 53.0307 224.062 71.644 224.062 94.6046V169.683C224.062 192.643 205.448 211.257 182.488 211.257H41.574C18.6133 211.257 0 192.643 0 169.683V94.6046C0 71.644 18.6133 53.0307 41.5739 53.0307H45.474C45.6335 52.9154 45.7989 52.8056 45.97 52.7015L108.165 14.8701C111.675 12.7348 116.252 13.8496 118.387 17.3599C120.522 20.8702 119.407 25.4469 115.897 27.5822L74.0599 53.0307ZM41.5739 67.9098H182.488C197.231 67.9098 209.183 79.8615 209.183 94.6046V169.683C209.183 184.426 197.231 196.378 182.488 196.378H41.574C26.8308 196.378 14.8791 184.426 14.8791 169.683V94.6046C14.8791 79.8615 26.8308 67.9098 41.5739 67.9098Z"
      :fill="color"
    />
  </svg>
</template>

<script setup>
const props = defineProps(['color']);
const color = props.color ?? '#9B9B9B';
</script>
