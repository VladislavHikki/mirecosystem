<template>
  <div class="modal-window__body">
    <div class="modal-window__content">
      <div class="container">
        <div class="form__item">
          <InputText type="text" placeholder="Введите название" />
        </div>
        <div class="form__item">
          <InputText type="text" placeholder="Владелец" />
        </div>
        <div class="form__item">
          <Dropdown placeholder="Админ" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const visible = ref(false);
</script>

<script></script>

<style lang="scss"></style>
