<template>
  <div class="wrap-auth">
    <form @submit.prevent="submit">
      <div class="form-input">
        <label for="password">Пароль</label>
        <!-- <Password id="password" /> -->
        <InputText
          name="password"
          @change="v$['password'].$touch"
          v-model.trim="formData['password']"
          :class="{ 'p-invalid': v$['password'].$error }"
          id="password"
          type="password"
        />
        <span class="error" v-if="v$['password'].$error">
          {{ v$['password'].$errors[0].$message }}
        </span>
      </div>
      <div class="form-input">
        <label for="password-confirm">Повторите пароль</label>
        <!-- <Password id="password-confirm" /> -->
        <InputText
          name="password-confirm"
          @change="v$['password-confirm'].$touch"
          v-model.trim="formData['password-confirm']"
          :class="{ 'p-invalid': v$['password-confirm'].$error }"
          id="password-confirm"
          type="password"
        />
        <span class="error" v-if="v$['password-confirm'].$error">
          {{ v$['password-confirm'].$errors[0].$message }}
        </span>
      </div>
      <div class="form-input">
        <Button type="submit" class="form-button" label="Изменить пароль" />
      </div>
    </form>
  </div>
</template>

<script setup>
import { changePassword } from '~/store/changePassword';
import { useVuelidate } from '@vuelidate/core';
import { required, helpers, sameAs } from '@vuelidate/validators';

const route = useRoute();

const change = changePassword();

let data = new FormData();

const formData = reactive({
  password: null,
  'password-confirm': null,
});

const rules = computed(() => {
  return {
    password: {
      required: helpers.withMessage('Обязательно', required),
    },
    'password-confirm': {
      required: helpers.withMessage('Обязательно', required),
      sameAs: helpers.withMessage('Пароли не совпадают', sameAs(formData.password)),
    },
  };
});

const v$ = useVuelidate(rules, formData);

const submit = async () => {
  v$.value.$validate();
  if (formData.password && formData['password-confirm'] && !v$.value.$error) {
    data.append('password', formData['password-confirm']);
    await change.changePassword(data, route.params.code);
    navigateTo({ path: '/auth' });
  }
};
</script>
