<template>
  <div class="wrap-auth-reg container">
    <Dialog modal header="Редактировать аватарку" v-model:visible="cropper_show">
      <UICropper
        @get-image="(cropper_show = false), (formData['image'] = $event?.file), (image = $event?.url)"
        :image="formData['image']"
        isAvatar
      />
    </Dialog>
    <div class="auth">
      <div class="wrap-auth">
        <form class="form_reg" method="post" @submit.prevent="submit">
          <div class="form-input">
            <h2 style="margin-bottom: 0">Завершение регистрации</h2>
          </div>
          <!-- <div class="form-input">
              <label for="referal-code">Реферальный код</label>
              <InputText
                name="referal-code"
                @input="refCodeError = false"
                @change="v$['referal-code'].$touch"
                v-model="formData['referal-code']"
                :class="{ 'p-invalid': v$['referal-code'].$error }"
                id="referal-code"
              />
              <span class="error" v-if="v$['referal-code'].$error">
                {{ v$['referal-code'].$errors[0].$message }}
              </span>
              <span class="error" v-if="refCodeError"> Реферальный код недействителен </span>
            </div> -->
          <div class="form-input">
            <label for="">Фотография профиля</label>
            <div class="form-upload">
              <div class="out-choose-image">
                <img loading="lazy" :src="image" alt="" />
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
              <Button icon="pi pi-user-edit" label="Изменить" @click="cropper_show = true" />
              <span class="error" v-if="v$['image'].$error">
                {{ v$['image'].$errors[0].$message }}
              </span>
            </div>
          </div>
          <div class="form-input">
            <label for="full-name">Имя Фамилия</label>
            <InputText
              name="full-name"
              @change="v$['full-name'].$touch"
              v-model.trim="formData['full-name']"
              :class="{ 'p-invalid': v$['full-name'].$error }"
              id="full-name"
            />
            <span class="error" v-if="v$['full-name'].$error">
              {{ v$['full-name'].$errors[0].$message }}
            </span>
          </div>
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
          <div class="form-input">
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
          </div>
          <!-- <div class="form-input">
              <label for="email">Email</label>
              <InputText
                name="email"
                autocomplete="username"
                @input="emailError = false"
                @change="v$['email'].$touch"
                v-model="formData['email']"
                :class="{ 'p-invalid': v$['email'].$error }"
                type="email"
                id="email"
              />
              <span class="error" v-if="v$['email'].$error">
                {{ v$['email'].$errors[0].$message }}
              </span>
              <span class="error" v-if="emailError"> Такая почта уже существует! </span>
            </div> -->
          <!-- <div class="form-input">
              <label for="password">Пароль</label>
              <Password id="password" />
              <Password
                name="password"
                autocomplete="on"
                @change="v$['password'].$touch"
                v-model="formData['password']"
                :class="{ 'p-invalid': v$['password'].$error }"
                id="password"
                type="password"
                toggleMask
                weakLabel="Слишком легкий"
                mediumLabel="Средняя сложность"
                strongLabel="Высокая сложность"
                promptLabel="Придумайте пароль"
              />
              <span class="error" v-if="v$['password'].$error">
                {{ v$['password'].$errors[0].$message }}
              </span>
            </div> -->
          <!-- <div class="form-input">
              <label for="password-confirm">Повторите пароль</label>
              <Password id="password-confirm" />
              <InputText
                name="password-confirm"
                @change="v$['password-confirm'].$touch"
                v-model="formData['password-confirm']"
                :class="{ 'p-invalid': v$['password-confirm'].$error }"
                id="password-confirm"
                type="password"
              />
              <span class="error" v-if="v$['password-confirm'].$error">
                {{ v$['password-confirm'].$errors[0].$message }}
              </span>
            </div> -->
          <div class="form-input form-checkbox">
            <InputSwitch v-model="formData['rememberMe']" :binary="true" id="remember-me" value="Нет"></InputSwitch>
            <label @click="consol()" for="remember-me">Запомнить меня</label>
          </div>
          <div class="form-input">
            <Button type="submit" class="form-button" label="Зарегистрироваться" />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useVuelidate } from '@vuelidate/core';
import { required, helpers, sameAs } from '@vuelidate/validators';

import { useCountryStore } from '@/store/country';
import { useRegionStore } from '@/store/region';
import { useCityStore } from '@/store/city';
import { useUserStore } from '@/store/user';

const countryStore = useCountryStore();
const regionStore = useRegionStore();
const cityStore = useCityStore();
const userStore = useUserStore();
const route = useRoute();
const userToken = ref(null);
const image = ref('/_nuxt/assets/images/avatar.svg');

onMounted(async () => {
  await countryStore.get();
  formData['country'].loading = false;
  let data = new FormData();
  data.append('verificationURL', route.params.code);
  userToken.value = await userStore.checkVerify(data);
});

const formData = reactive({
  // 'referal-code': null,
  image: null,
  'full-name': null,
  phone: null,
  // 'telegram-name': null,
  country: {
    value: null,
    loading: true,
  },
  region: {
    value: null,
    loading: false,
  },
  city: {
    value: null,
    loading: false,
  },
  verificationURL: route.params.code,
  // email: null,
  // password: null,
  // 'password-confirm': null,
  rememberMe: false,
});

// let emailError = ref(false);
let refCodeError = ref(false);
let cropper_show = ref(false);

const cropper = ref();

const getUrl = (img) => {
  if (img) {
    if (typeof img != 'string') {
      cropper.value.replace(URL.createObjectURL(img), false);
      return URL.createObjectURL(img);
    }
  }
  return img;
};

let i = ref();

function crop(e) {
  cropper.value.getCroppedCanvas().toBlob((blob) => {
    const url = URL.createObjectURL(blob);
    image.value = url;
    formData['image'] = url;
    i.value = new File([blob], 'new_avatar', { type: blob?.type });
  });
}

const customBase64Uploader = async (event) => {
  const file = event.files[0];
  document.querySelector(`.out-choose-image > img`).src = file.objectURL;
  formData['image'] = file;
  // image.value = getImageUrl(formData['image']);
  // const reader = new FileReader();
  // let blob = await fetch(file.objectURL).then((r) => r.blob()); //blob:url

  // reader.readAsDataURL(blob);

  // reader.onloadend = function () {
  //   const base64data = reader.result;
  // };
};

// const countryHandler = async () => {
//   await regionStore.get(formData["country"].id);
// };

watch(
  () => ({ ...formData['country'].value }),
  async () => {
    formData['region'].value = null;
    formData['city'].value = null;
    v$.value.$reset();
    formData['region'].loading = true;
    await regionStore.get(formData['country'].value.id);
    formData['region'].loading = false;
  }
);

watch(
  () => ({ ...formData['region'].value }),
  async () => {
    formData['city'].value = null;
    v$.value.$reset();
    formData['region'].loading = true;
    await cityStore.get(formData['region'].value.id);
    formData['region'].loading = false;
  }
);

const rules = computed(() => {
  return {
    image: {
      required: helpers.withMessage('Обязательно', required),
    },
    // 'referal-code': {
    //   required: helpers.withMessage('Обязательно', required),
    // },
    'full-name': {
      required: helpers.withMessage('Обязательно', required),
    },
    //   phone: {
    //     required: helpers.withMessage('Обязательно', required),
    //   },
    //   'telegram-name': {
    //     required: helpers.withMessage('Обязательно', required),
    //   },
    country: {
      value: { required: helpers.withMessage('Обязательно', required) },
    },
    region: {
      value: { required: helpers.withMessage('Обязательно', required) },
    },
    city: {
      value: { required: helpers.withMessage('Обязательно', required) },
    },
    // email: {
    //   required: helpers.withMessage('Обязательно', required),
    //   email: helpers.withMessage('Некорректная почта', email),
    // },
    //   password: {
    //     required: helpers.withMessage('Обязательно', required),
    //   },
    //   'password-confirm': {
    //     required: helpers.withMessage('Обязательно', required),
    //     sameAs: helpers.withMessage('Пароли не совпадают', sameAs(formData.password)),
    //   },
  };
});

const v$ = useVuelidate(rules, formData);

// const formData = reactive({
//   "referal-code": null,
//   "full-name": null,
//   phone: null,
//   "telegram-name": null,
//   country: {
//     value: null,
//     loading: true,
//   },
//   region: {
//     value: null,
//     loading: false,
//   },
//   city: {
//     value: null,
//     loading: false,
//   },
//   email: null,
//   password: null,
//   "password-confirm": null,
//   rememberMe: false,
// });

const submit = async () => {
  v$.value.$validate();

  if (!v$.value.$error) {
    let data = new FormData();
    // data.append('login', formData['telegram-name']);
    // data.append('password', formData['password']);
    //   data.append('referral', formData['referal-code']);
    // data.append('email', formData['email']);
    //   data.append('phone', formData['phone']);
    data.append('rememberCheck', formData['rememberMe']);
    data.append('verificationURL', formData['verificationURL']);
    data.append('cityId', formData['city']['value'].id);
    data.append('name', formData['full-name']);
    data.append('file', formData['image']);
    // data.append(
    //   "file",
    //   fs.createReadStream(
    //     "/C:/Users/User/Desktop/d2d75d7e2d84daf2175f7b62b5a861a8.jpg"
    //   )
    // );
    const result = await userStore.verify(data);
    if (result == 200) {
      // data.append('verified', 1);
      // data.append('verificationURL', null);
      let audio = new Audio("/sounds/new_user.mp3");
      audio.play();
      navigateTo({ path: '/profile/' });
    }
  }
};
</script>
