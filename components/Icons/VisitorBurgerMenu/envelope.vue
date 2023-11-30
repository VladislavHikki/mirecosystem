<template>
  <svg width="31" height="24" viewBox="0 0 31 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_143_34)">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M27.4253 2.62126H3.59791L15.2641 13.0855L27.4253 2.62126ZM2.50521 4.32782V20.5053C2.50521 21.0575 2.95293 21.5053 3.50521 21.5053H27.5052C28.0575 21.5053 28.5052 21.0575 28.5052 20.5053V4.33055L15.9027 15.1746L15.2367 15.7476L14.5827 15.161L2.50521 4.32782ZM0.505214 3.62126C0.505214 1.96441 1.84836 0.621262 3.50521 0.621262H27.5052C29.1621 0.621262 30.5052 1.96441 30.5052 3.62126V20.5053C30.5052 22.1621 29.1621 23.5053 27.5052 23.5053H3.50521C1.84836 23.5053 0.505214 22.1621 0.505214 20.5053V3.62126Z"
        :fill="color"
      />
    </g>
    <defs>
      <clipPath id="clip0_143_34">
        <rect width="30" height="22.884" :fill="color" transform="translate(0.505214 0.621262)" />
      </clipPath>
    </defs>
  </svg>
</template>

<script setup>
const props = defineProps({
  color: {
    type: String,
    default: '#000',
  },
});
</script>
