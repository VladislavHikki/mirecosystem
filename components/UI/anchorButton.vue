<template>
  <TransitionGroup name="anchor-button">
    <div v-if="isScrolled" class="anchor-button">
      <Button @click="toTop()" icon="pi pi-arrow-up" />
    </div>
  </TransitionGroup>
</template>

<script setup>
let isScrolled = ref(false);

onMounted(() => {
  if (process.client) {
    window.onscroll = () => {
      if (window.scrollY) isScrolled.value = true;
      else isScrolled.value = false;
    };
  }
});

function toTop() {
  window.scrollTo(0,0);
}
</script>

<style lang="scss" scoped>
.anchor-button {
  position: fixed;
  right: 32px;
  bottom: 32px;
  @media (max-width: $x-small) {
    bottom: 72px;
  }
}

.anchor-button > button {
  border-radius: 50%;
}

.anchor-button-enter-active,
.anchor-button-leave-active {
  transition: opacity 0.5s ease;
}

.anchor-button-enter-from,
.anchor-button-leave-to {
  opacity: 0;
}
</style>
