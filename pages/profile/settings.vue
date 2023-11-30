<template>
  <Dialog modal header="Редактировать аватарку" v-model:visible="cropper_show">
    <UICropper
      @get-image="(cropper_show = false), (formData['image'] = $event?.file), (image = $event?.url)"
      :image="formData['image']"
      isAvatar
    />
  </Dialog>
  <Dialog modal header="Редактировать фон" v-model:visible="cropper_background_show">
    <UICropper
      @get-image="(cropper_background_show = false), editTheme(currentTheme?.id, $event?.file)"
      :image="currentTheme?.url"
      isBg
      typeBox="square"
    />
  </Dialog>
  <div class="profile_settings container">
    <div class="settings">
      <div class="tab-buttons">
        <h2 class="page-title">Редактирование</h2>
      </div>
      <Toast />
      <div>
        <div class="wrap-settings">
          <form method="post" @submit.prevent="saveProfile()">
            <div class="form__item form-input upload-file upload-file_indent form-item_indent">
              <label for="">Картинка</label>
              <div class="form-upload">
                <div class="out-choose-image">
                  <img loading="lazy" width="100" height="100" :src="image" alt="" />
                </div>
                <div class="form-upload_item">
                  <FileUpload
                    accept=".jpg, .png, .jpeg"
                    mode="basic"
                    :auto="true"
                    v-model="formData['image']"
                    customUpload
                    @uploader="customBase64Uploader"
                    @change="formData['background'] = null"
                    chooseLabel="Загрузить"
                  />
                  <Button icon="pi pi-user-edit" label="Изменить" @click="cropper_show = true" />
                </div>
              </div>
            </div>
            <div class="form-input">
              <label for="full-name">Фамилия Имя</label>
              <InputText
                name="full-name"
                @change="v$['full-name'].$touch"
                :class="{ 'p-invalid': v$['full-name'].$error }"
                v-model.trim="formData['full-name']"
                id="full-name"
              />
              <span class="error" v-if="v$['full-name'].$error">
                {{ v$['full-name'].$errors[0].$message }}
              </span>
            </div>
            <div class="form-input">
              <label for="country">Страна</label>
              <Dropdown
                name="country"
                v-model="formData['country']['value']"
                id="country"
                placeholder="Выберите Страну"
                :options="countryStore.all"
                @change="reCountry(), v$['country']['value'].$touch"
                :class="{ 'p-invalid': v$['country'].$error }"
                optionLabel="label"
                optionValue="id"
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
                v-model="formData['region']['value']"
                id="region"
                placeholder="Выберите Регион"
                :class="{ 'p-invalid': v$['region'].$error }"
                :disabled="!formData['country']['value']"
                :options="regionStore.all"
                @change="reRegion(), v$['region']['value'].$touch"
                optionLabel="label"
                optionValue="id"
                :loading="formData['region']['loading']"
                filter
              />
              <span class="error" v-if="v$['region'].$error">
                {{ v$['region'].$errors[0].$message }}
              </span>
            </div>
            <div class="form-input">
              <label for="city">Город</label>
              <Dropdown
                name="city"
                v-model="formData['city']['value']"
                id="city"
                @change="v$['city']['value'].$touch"
                :class="{ 'p-invalid': v$['city'].$error }"
                placeholder="Выберите Город"
                :disabled="!formData['region']['value']"
                :options="cityStore.all"
                optionLabel="label"
                optionValue="id"
                :loading="formData['city']['loading']"
                filter
              />
              <span class="error" v-if="v$['city'].$error">
                {{ v$['city'].$errors[0].$message }}
              </span>
            </div>
            <div class="form-input">
              <label for="email">Email</label>
              <InputText
                name="email"
                v-model.trim="formData['email']"
                autocomplete="username"
                @input="emailError = false"
                @change="v$['email'].$touch"
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
              <label for="password">Подтвердите пароль</label>
              <Password
                name="password"
                v-model.trim="formData['password']"
                @change="v$['password'].$touch"
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
            <div class="form-input">
              <label>Тема сайта</label>
              <div class="form-input_theme-container">
                <div class="form-input_theme" style="display: flex; justify-content: flex-start; flex-wrap: wrap; gap: 12px">
                  <ColorPicker
                    @change="formData['backgroundFile'] = null"
                    v-model:model-value="formData.background"
                    format="hex"
                    inline
                  />
                  <FileUpload
                    accept=".jpg, .png, .jpeg"
                    mode="basic"
                    :auto="true"
                    v-model="formData.backgroundFile"
                    customUpload
                    @uploader="customBase64UploaderForBg"
                    chooseLabel="Загрузить"
                  />
                </div>

                <div class="form-input_last-theme">
                  <div class="form-input_last-theme_card" v-for="value in lastThemes" @click="changeTheme(value?.id)">
                    <div class="form-input_last-theme_card_preview">
                      <div
                        v-if="value?.type == 1"
                        class="color"
                        :style="{ 'background-color': `#${value?.background}` }"
                      ></div>
                      <img v-if="value?.type == 0" :src="`${url}/api/${value?.background}`" alt="" />
                    </div>
                    <div class="orm-input_last-theme_card_operation category_content_btns">
                      <div v-if="value?.active" class="form-input_last-theme_card_status">
                        <i class="pi pi-check"></i>
                      </div>
                      <Button
                        v-if="value?.type == 0"
                        @click="
                          (currentTheme.url = `${url}/api/${value?.background}`),
                            (currentTheme.id = value?.id),
                            (cropper_background_show = true)
                        "
                        icon="pi pi-user-edit"
                        severity="warning"
                      />
                      <Button @click="deleteTheme(value?.id)" class="delete" />
                    </div>
                  </div>
                  <Button @click="changeTheme(0)" label="Сбросить настройки фона" />
                </div>
              </div>
            </div>
            <div class="form-input">
              <Button style="text-align: center" type="submit" class="form-button" label="Сохранить" />
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useVuelidate } from '@vuelidate/core';
import { required, helpers, email, sameAs } from '@vuelidate/validators';
import { useCountryStore } from '@/store/country';
import { useRegionStore } from '@/store/region';
import { useCityStore } from '@/store/city';
import { useUserStore } from '@/store/user';
import { useToast } from 'primevue/usetoast';
import ColorPicker from 'primevue/colorpicker';
import url from '~/store/config';

const countryStore = useCountryStore();
const regionStore = useRegionStore();
const cityStore = useCityStore();
const userStore = useUserStore();
const toast = useToast();
const image = ref('/_nuxt/assets/images/avatar.svg');
const lastThemes = ref(await userStore.getSettings());

const cropper_show = ref(false);
const cropper_background_show = ref(false);

const customBase64Uploader = async (event) => {
  const file = event.files[0];
  document.querySelector(`.out-choose-image > img`).src = file.objectURL;
  formData['image'] = file;
  image.value = getImageUrl(formData['image']);
  // cropper.value = new cropper(image.value);
};

let wrapper = ref();
let currentTheme = ref({
  id: null,
  url: null,
});

onMounted(() => {
  if (process.client) {
    wrapper.value = document.querySelector('.wrapper');
  }
});

const customBase64UploaderForBg = async (e) => {
  const file = e.files[0];
  wrapper.value.style.backgroundImage = `url(${file.objectURL})`;
  wrapper.value.style.backgroundPosition = 'center';
  wrapper.value.style.backgroundRepeat = 'no-repeat';
  wrapper.value.style.backgroundSize = 'cover';
  wrapper.value.style.backgroundAttachment = 'fixed';
  formData['backgroundFile'] = file;
};

async function reCountry() {
  await regionStore.get(formData['country'].value);
  formData['region'].value = null;
  formData['city'].value = null;
}

async function reRegion() {
  await cityStore.get(formData['region'].value);
}

async function deleteTheme(id) {
  const formData = new FormData();
  formData.append('ids', id);
  const result = await userStore.deleteBack(formData);
  lastThemes.value = await userStore.getSettings();
}

async function changeTheme(id) {
  const formData = new FormData();
  formData.append('id', id);
  const result = await userStore.changeBack(formData);
  lastThemes.value = await userStore.getSettings();
  setBackground(url, id ? lastThemes.value : null);
}

async function editTheme(id, file) {
  const formData = new FormData();
  formData.append('file', file);
  await userStore.editTheme(id, formData);
  lastThemes.value = await userStore.getSettings();
  setBackground(url, lastThemes.value);
}

await userStore.requestProfile(userStore.data.id);

onMounted(async () => {
  await countryStore.get();
  await regionStore.get(userStore.profile?.user?.city?.region?.country?.id);
  await cityStore.get(userStore.profile?.user?.city?.region?.id);
  formData['country'].loading = false;
  image.value = getImageUrl(userStore.profile?.user?.avatar);
});

const formData = reactive({
  image: getImageUrl(userStore.profile?.user?.avatar),
  'full-name': userStore.profile?.user?.name || '',
  // phone: userStore.profile?.user?.phone || '',
  'telegram-name': userStore.profile?.user?.login || '',
  country: {
    value: userStore.profile?.user?.city?.region?.country?.id || '',
    loading: true,
  },
  region: {
    value: userStore.profile?.user?.city?.region?.id || '',
    loading: false,
  },
  city: {
    value: userStore.profile?.user?.city?.id || '',
    loading: false,
  },
  email: userStore.profile?.user?.email || '',
  password: null,
  background: null,
  backgroundFile: null,
});

watch(
  () => formData.background,
  () => {
    wrapper.value.style.backgroundColor = `#${formData.background}`;
    wrapper.value.style.backgroundImage = 'none';
  }
);

let emailError = ref(false);

const rules = computed(() => {
  return {
    'full-name': {
      required: helpers.withMessage('Обязательно', required),
    },
    country: {
      value: { required: helpers.withMessage('Обязательно', required) },
    },
    region: {
      value: { required: helpers.withMessage('Обязательно', required) },
    },
    city: {
      value: { required: helpers.withMessage('Обязательно', required) },
    },
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

async function saveProfile() {
  v$.value.$validate();
  if (!v$.value.$error) {
    const data = new FormData();

    if (formData['image']) data.append('file', formData['image']);

    // /if (formData['image'] != userStore.profile?.user?.avatar) data.append('file', formData['image']);
    if (formData['full-name']) data.append('name', formData['full-name']);
    if (formData['phone']) data.append('phone', formData['phone']);
    if (formData['telegram-name']) data.append('login', formData['telegram-name']);
    if (formData['city'].value) data.append('cityId', formData['city'].value);
    if (formData['email']) data.append('email', formData['email']);
    data.append('password', formData['password']);
    let bgData = new FormData();
    if (formData['background']) {
      bgData.append('background', formData.background);
    }
    if (formData['backgroundFile']) {
      bgData.append('file', formData.backgroundFile);
    }
    await userStore.setSettings(bgData);
    lastThemes.value = await userStore.getSettings();
    setBackground(url, lastThemes.value);

    formData['background'] = null;
    formData['backgroundFile'] = null;

    const result = await userStore.updateProfile(data, userStore.data.id);
    if (result.status == 403) {
      toast.add({
        severity: 'error',
        summary: 'Ошибка валидации',
        detail: 'Пароль не совпадает!',
        life: 3000,
      });
    } else {
      toast.add({
        severity: errorValidate(result.status).toastType,
        summary: errorValidate(result.status).summary,
        detail: errorValidate(result.status).message,
        life: 3000,
      });
    }
  }
}

onUnmounted(async () => {
  const bgs = await userStore.getSettings();
  setBackground(url, bgs);
});
</script>
