<template>
  <div class="wrap-modal">
    <div class="modal-window__content">
      <div class="container">
        <div class="form__item">
          <InputText type="text" placeholder="Выберите страну" />
        </div>
        <div class="form__item">
          <InputText type="text" placeholder="Выберите регион / область" />
        </div>
        <div class="form__item">
          <InputText type="text" placeholder="Выберите город" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

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
