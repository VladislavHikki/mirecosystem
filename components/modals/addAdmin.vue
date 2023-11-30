<template>
  <div class="wrap-modal">
    <div class="modal-window__content">
      <div class="container">
        <form method="post" @change="emit('new-formData', formData)">
          <div class="form__item">
            <InputText v-model.trim="formData.name" type="text" placeholder="Имя" />
          </div>
          <div class="form__item">
            <InputText v-model.trim="formData.login" type="text" placeholder="Имя пользователя" />
          </div>
          <div class="form__item">
            <InputText v-model.trim="formData.email" type="email" placeholder="E-mail" />
          </div>
          <div class="form__item">
            <InputText v-model.trim="formData.password" type="password" placeholder="Новый пароль" />
          </div>
          <div class="form__item">
            <InputText v-model.trim="formData.password2" type="password" placeholder="Повторите пароль" />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits['new-formData'];

const formData = reactive({
  name: null,
  login: null,
  email: null,
  password: null,
  password2: null,
});
</script>

<style lang="scss">
.modal-window__content {
  display: flex;
  flex-direction: column;
  // align-items: center;
}
.container {
  width: 100%;
}
</style>
