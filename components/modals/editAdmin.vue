<template>
  <div class="wrap-modal">
    <div class="modal-window__content">
      <div class="container">
        <div class="form__item">
          <InputText type="text" placeholder="Имя" />
        </div>
        <div class="form__item">
          <InputText type="text" placeholder="Имя пользователя" />
        </div>
        <div class="form__item">
          <InputText type="email" placeholder="E-mail" />
        </div>
        <div class="form__item">
          <InputText type="password" placeholder="Новый пароль" />
        </div>
        <div class="form__item">
          <InputText type="password" placeholder="Повторите пароль" />
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
