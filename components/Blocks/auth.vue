<template>
  <div class="wrap-auth">
    <form method="post" @submit.prevent="submit">
      <div class="form-input">
        <label for="email">Email</label>
        <InputText
          name="email"
          @change="v$['email'].$touch"
          v-model.trim="formData['email']"
          :class="{ 'p-invalid': v$['email'].$error }"
          type="email"
          id="email"
        />
        <span class="error" v-if="v$['email'].$error">
          {{ v$['email'].$errors[0].$message }}
        </span>
      </div>
      <div class="form-input">
        <label for="password">Пароль</label>
        <Password
          name="password"
          @change="v$['password'].$touch"
          v-model.trim="formData['password']"
          :class="{ 'p-invalid': v$['password'].$error }"
          id="password"
          type="password"
          :feedback="false"
          toggleMask
        />
        <span class="error" v-if="v$['password'].$error">
          {{ v$['password'].$errors[0].$message }}
        </span>
      </div>
      <span class="error" v-if="formData['error'] && !v$['email'].$errors[0] && !v$['password'].$errors[0]">
        Неправильный логин или пароль
      </span>
      <div class="form-input form-checkbox">
        <InputSwitch v-model="formData['rememberMe']" :binary="true" id="remember-me" />
        <label for="remember-me">Запомнить меня</label>
      </div>

      <div class="form-input">
        <Button type="submit" class="form-button" label="Войти" />
      </div>
    </form>
    <div class="line"></div>
    <div class="text">
      <nuxt-link to="/forgot-password"> Забыли пароль? </nuxt-link>
    </div>
  </div>
</template>

<script setup>
import { useVuelidate } from '@vuelidate/core';
import { required, helpers, email } from '@vuelidate/validators';

import { useUserStore } from '@/store/user';

const userStore = useUserStore();

const emit = defineEmits(['user']);

const formData = reactive({
  email: null,
  password: null,
  rememberMe: false,
  error: false,
});

watch(
  () => formData.email,
  () => {
    formData.error = null;
  }
);

watch(
  () => formData.password,
  () => {
    formData.error = null;
  }
);

const rules = computed(() => {
  return {
    email: {
      required: helpers.withMessage('Обязательно', required),
      email: helpers.withMessage('Некорректная почта', email),
    },
    password: {
      required: helpers.withMessage('Обязательно', required),
    },
  };
});

const v$ = useVuelidate(rules, formData);

const submit = async () => {
  v$.value.$validate();
  if (!v$.value.$error) {
    let data = new FormData();

    data.append('email', formData['email']);
    data.append('password', formData['password']);
    data.append('rememberCheck', formData['rememberMe']);

    const auth = await userStore.login(data);
    if (auth != 403) {
      formData['error'] = false;
      emit('user', true);
      await navigateTo({ path: '/profile/' });
    } else formData['error'] = true;
  }
};
</script>
