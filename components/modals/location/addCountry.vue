<template>
  <div class="wrap-modal">
    <div class="modal-window__content">
      <div class="container">
        <div class="form__item">
          <InputText
            v-model.trim="formData.country"
            @change="emit('sync', { data: formData, component: 'country' })"
            type="text"
            placeholder="Страна"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['sync']);

const formData = reactive({
  country: null,
});
</script>

<style lang="scss">
.modal-window__content {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.container {
  width: 100%;
}
</style>
