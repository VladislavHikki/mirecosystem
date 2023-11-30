<template>
  <div class="wrap-auth">
    <div class="success_send" v-if="successSend">Письмо со ссылкой на страницу для смены пароля отправлена на ваш email</div>
    <form method="POST" @submit.prevent="submit">
      <div class="form-input">
        <label for="email">Email</label>
        <span style="margin-bottom: 14px" class="error" v-if="emailError"> Обязательное поле </span>
        <InputText v-model.trim="formData['email']" type="email" name="email" id="email" />
      </div>
      <div class="form-input">
        <Button type="submit" class="form-button" label="Получить новый пароль" />
      </div>
      <div class="line"></div>
      <div class="text">
        <nuxt-link to="/auth?page=auth"> Назад </nuxt-link>
      </div>
    </form>
  </div>
</template>

<script setup>
import { useVuelidate } from '@vuelidate/core';
import { required, email, helpers } from '@vuelidate/validators';
import { changePassword } from '~/store/changePassword';

const rules = computed(() => {
  return {
    email: {
      required: helpers.withMessage('Обязательно', required),
      email: helpers.withMessage('Некорректная почта', email),
    },
  };
});

const formData = reactive({
  email: '',
});

const v$ = useVuelidate(rules, formData);

const sendLetter = changePassword();
let data = new FormData();
let emailError = ref(false);
let successSend = ref(false);
const submit = async () => {
  if (formData['email']) {
    successSend.value = true;
    emailError.value = false;
    data.append('email', formData['email']);
    const result = await sendLetter.sendLinkForChangePassword(data);
  } else {
    successSend.value = false;
    emailError.value = true;
  }
};
</script>

<style lang="scss">
.success_send {
  background: #18af10;
  border-radius: 10px;
  color: white;
  width: 100%;
  padding: 15px 0;
  text-align: center;
}
</style>
