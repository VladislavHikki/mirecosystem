<template>
  <div class="wrapper">
    <main :class="mainPage">
      <slot></slot>
    </main>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const mainPage = computed(() => {
  const route = useRoute();

  if (route.name === 'auth') {
    return 'auth-center';
  }
});

onMounted(()=>{
  if(process.client && window) {
    window.history.scrollRestoration = "auto";
  }
})
</script>