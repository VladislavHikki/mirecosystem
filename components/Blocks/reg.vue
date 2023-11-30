<template>
  <div class="wrap-auth">
    <form v-if="!successReg" class="form_reg" method="post" @submit.prevent="submit">
      <div class="form-input">
        <label for="referal-code">Реферальный код</label>
        <InputText
          name="referal-code"
          @input="refCodeError = false"
          @change="v$['referal-code'].$touch"
          v-model.trim="formData['referal-code']"
          :class="{ 'p-invalid': v$['referal-code'].$error }"
          id="referal-code"
        />
        <span class="error" v-if="v$['referal-code'].$error">
          {{ v$['referal-code'].$errors[0].$message }}
        </span>
        <span class="error" v-if="refCodeError"> Реферальный код недействителен </span>
      </div>
      <!-- <div class="form-input">
        <label for="">Фотография профиля</label>
        <div class="form-upload">
          <div class="out-choose-image">
            <img loading="lazy"  src="@/assets/images/avatar.svg" alt="" />
          </div>
          <FileUpload
          mode="basic"
          :auto="true"
            name="demo[]"
            accept="image/*"
            customUpload
            @uploader="customBase64Uploader"
            chooseLabel="Загрузить"
            />
            <span class="error" v-if="v$['image'].$error">
              {{ v$['image'].$errors[0].$message }}
            </span>
          </div>
        </div> -->
      <!-- <div class="form-input">
        <label for="full-name">Имя Фамилия</label>
        <InputText
        name="full-name"
        @change="v$['full-name'].$touch"
        v-model="formData['full-name']"
        :class="{ 'p-invalid': v$['full-name'].$error }"
        id="full-name"
        />
        <span class="error" v-if="v$['full-name'].$error">
          {{ v$['full-name'].$errors[0].$message }}
        </span>
      </div> -->
      <!-- <div class="form-input">
        <label for="phone">Мобильный телефон</label>
        <InputMask
        name="phone"
        @change="v$['phone'].$touch"
        v-model="formData['phone']"
        :class="{ 'p-invalid': v$['phone'].$error }"
        id="phone"
        date="phone"
        mask="+7 (999) 999-99-99"
        placeholder="+7 (999) 999-99-99"
        />
        <span class="error" v-if="v$['phone'].$error">
          {{ v$['phone'].$errors[0].$message }}
        </span>
      </div> -->
      <!-- <div class="form-input">
        <label for="telegram-name">Имя пользователя в Telegram</label>
        <InputText
        placeholder="https://t.me/Ivan_Ivanov"
        name="telegram-name"
        @change="v$['telegram-name'].$touch"
          v-model="formData['telegram-name']"
          :class="{ 'p-invalid': v$['telegram-name'].$error }"
          id="telegram-name"
          />
          <span class="error" v-if="v$['telegram-name'].$error">
            {{ v$['telegram-name'].$errors[0].$message }}
          </span>
        </div> -->
      <!-- <div class="form-input">
        <label for="country">Страна</label>
        <Dropdown
          name="country"
          @change="v$['country']['value'].$touch"
          v-model="formData['country']['value']"
          :class="{ 'p-invalid': v$['country'].$error }"
          id="country"
          placeholder="Выберите Страну"
          :options="countryStore.all"
          optionLabel="label"
          :loading="formData['country']['loading']"
          />
          <span class="error" v-if="v$['country'].$error">
          {{ v$['country'].$errors[0].$message }}
        </span>
      </div>
      <div class="form-input">
        <label for="region">Регион</label>
        <Dropdown
          name="region"
          @change="v$['region']['value'].$touch"
          v-model="formData['region']['value']"
          :class="{ 'p-invalid': v$['region'].$error }"
          id="region"
          placeholder="Выберите Регион"
          :disabled="!formData['country']['value']"
          :options="regionStore.all"
          optionLabel="label"
          :loading="formData['region']['loading']"
          filter
          empty-filter-message="Нет результатов"
        />
        <span class="error" v-if="v$['region'].$error">
          {{ v$['region'].$errors[0].$message }}
        </span>
      </div>
      <div class="form-input">
        <label for="city">Город</label>
        <Dropdown
        name="city"
        @change="v$['city']['value'].$touch"
        v-model="formData['city']['value']"
        :class="{ 'p-invalid': v$['city'].$error }"
        id="city"
        placeholder="Выберите Город"
        :disabled="!formData['region']['value']"
        :options="cityStore.all"
        optionLabel="label"
        :loading="formData['city']['loading']"
        filter
        empty-filter-message="Нет результатов"
        />
        <span class="error" v-if="v$['city'].$error">
          {{ v$['city'].$errors[0].$message }}
        </span>
      </div> -->
      <div class="form-input">
        <label for="email">Email</label>
        <InputText
          name="email"
          autocomplete="username"
          @input="emailError = false"
          @change="v$['email'].$touch"
          v-model.trim="formData['email']"
          :class="{ 'p-invalid': v$['email'].$error }"
          type="email"
          id="email"
        />
        <span class="error" v-if="v$['email'].$error">
          {{ v$['email'].$errors[0].$message }}
        </span>
        <span class="error" v-if="emailError"> Такая почта уже существует! </span>
      </div>
      <div class="form-input">
        <label for="password">Пароль</label>
        <!-- <Password id="password" /> -->
        <Password
          name="password"
          autocomplete="on"
          @change="v$['password'].$touch"
          v-model.trim="formData['password']"
          :class="{ 'p-invalid': v$['password'].$error }"
          id="password"
          type="password"
          toggleMask
          :feedback="false"
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
      <!-- <div class="form-input form-checkbox">
        <InputSwitch v-model="formData['rememberMe']" :binary="true" id="remember-me" value="Нет"></InputSwitch>
        <label @click="consol()" for="remember-me">Запомнить меня</label>
      </div> -->
      <div class="form-input">
        <Button type="submit" class="form-button" label="Далее" />
      </div>
    </form>
    <Transition style="padding: 10px" name="success-reg-animation">
      <h2 class="page-subtitle" v-if="successReg">
        На ваш имэйл отправлено письмо со ссылкой, пройдите по ссылке, чтобы завершить регистрацию.
      </h2>
    </Transition>
  </div>
</template>

<script setup>
import { useVuelidate } from '@vuelidate/core';
import { required, helpers, email, sameAs } from '@vuelidate/validators';

// import { useCountryStore } from '@/store/country';
// import { useRegionStore } from '@/store/region';
// import { useCityStore } from '@/store/city';
import { useUserStore } from '@/store/user';

// const countryStore = useCountryStore();
// const regionStore = useRegionStore();
// const cityStore = useCityStore();
const userStore = useUserStore();
let successReg = ref(false);

// onMounted(async () => {
//   await countryStore.get();
//   formData['country'].loading = false;
// });

const formData = reactive({
  'referal-code': null,
  // image: null,
  // 'full-name': null,
  // phone: null,
  // 'telegram-name': null,
  // country: {
  //   value: null,
  //   loading: true,
  // },
  // region: {
  //   value: null,
  //   loading: false,
  // },
  // city: {
  //   value: null,
  //   loading: false,
  // },
  email: null,
  password: null,
  'password-confirm': null,
  rememberMe: false,
});

let emailError = ref(false);
let refCodeError = ref(false);

const customBase64Uploader = async (event) => {
  const file = event.files[0];
  document.querySelector(`.out-choose-image > img`).src = file.objectURL;
  formData['image'] = file;
};

// watch(
//   () => ({ ...formData['country'].value }),
//   async () => {
//     formData['region'].value = null;
//     formData['city'].value = null;
//     v$.value.$reset();
//     formData['region'].loading = true;
//     await regionStore.get(formData['country'].value.id);
//     formData['region'].loading = false;
//   }
// );

// watch(
//   () => ({ ...formData['region'].value }),
//   async () => {
//     formData['city'].value = null;
//     v$.value.$reset();
//     formData['region'].loading = true;
//     await cityStore.get(formData['region'].value.id);
//     formData['region'].loading = false;
//   }
// );

const rules = computed(() => {
  return {
    // image: {
    //   required: helpers.withMessage('Обязательно', required),
    // },
    'referal-code': {
      required: helpers.withMessage('Обязательно', required),
    },
    // 'full-name': {
    //   required: helpers.withMessage('Обязательно', required),
    // },
    // phone: {
    //   required: helpers.withMessage('Обязательно', required),
    // },
    // 'telegram-name': {
    //   required: helpers.withMessage('Обязательно', required),
    // },
    // country: {
    //   value: { required: helpers.withMessage('Обязательно', required) },
    // },
    // region: {
    //   value: { required: helpers.withMessage('Обязательно', required) },
    // },
    // city: {
    //   value: { required: helpers.withMessage('Обязательно', required) },
    // },
    email: {
      required: helpers.withMessage('Обязательно', required),
      email: helpers.withMessage('Некорректная почта', email),
    },
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
  if (!v$.value.$error) {
    let data = new FormData();
    // data.append('login', formData['telegram-name']);
    data.append('password', formData['password']);
    data.append('referral', formData['referal-code']);
    data.append('email', formData['email']);
    data.append('phone', formData['phone']);
    // data.append('cityId', formData['city']['value'].id);
    // data.append('name', formData['full-name']);
    // data.append('file', formData['image']);
    // data.append('rememberCheck', formData['rememberMe']);
    const result = await userStore.register(data);
    if (result?.data === 'users_email must be unique') {
      emailError.value = true;
    } else if (result?.data === 'Отсутствует реферальный код!') {
      refCodeError.value = true;
    } else {
      let data = new FormData();
      data.append('email', formData['email']);
      const result = await userStore.sendEmailForReg(data);

      successReg.value = result;
      // navigateTo({ path: '/profile/' });
    }
  }
};
</script>

<style scoped lang="scss">
.success-reg-animation-enter-active,
.success-reg-animation-leave-active {
  transition: opacity 0.5s;
}

.success-reg-animation-enter-from,
.success-reg-animation-leave-to {
  opacity: 0;
}
</style>
