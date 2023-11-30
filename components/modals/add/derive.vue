<template>
  <div class="modal-window__body">
    <Dialog modal header="Редактировать аватарку" v-model:visible="cropper_show">
      <UICropper
        @get-image="(cropper_show = false), (data['file'] = $event?.file), (image = $event?.url)"
        :image="image"
        isAvatar
      />
    </Dialog>
    <div class="modal-window__content">
      <div class="modal-window__container">
        <form method="post" @change="check()" @submit.prevent="createDerive">
          <div class="form__item form-input upload-file upload-file_indent form-item_indent">
            <div class="form-upload">
              <div class="out-choose-image">
                <img loading="lazy" width="100" height="100" :src="image" alt="" />
              </div>
              <FileUpload
                accept=".jpg, .png, .jpeg"
                mode="basic"
                :auto="true"
                customUpload
                @uploader="customBase64Uploader"
                chooseLabel="Загрузить"
              />
              <div class="error" v-if="v$['file'].$error" style="margin-left: 0px; margin-top: 5px">
                {{ v$['file'].$errors[0].$message }}
              </div>
              <Button icon="pi pi-user-edit" label="Изменить" @click="cropper_show = true" />
            </div>
          </div>
          <div class="form__item">
            <InputText :class="{ 'p-invalid': v$['label'].$error }" v-model="data.label" placeholder="Название" />
            <div class="error" v-if="v$['label'].$error">
              {{ v$['label'].$errors[0].$message }}
            </div>
          </div>
          <div class="form__item">
            <Textarea :class="{ 'p-invalid': v$['description'].$error }" v-model="data.description" placeholder="Описание" />
            <div class="error" v-if="v$['description'].$error">
              {{ v$['description'].$errors[0].$message }}
            </div>
          </div>
          <div class="form__item">
            <InputNumber
              :class="{ 'p-invalid': v$['exchange_rate'].$error }"
              minFractionDigits="2"
              :min="0"
              v-model="data.exchange_rate"
              placeholder="Курс"
            />
            <div class="error" v-if="v$['exchange_rate'].$error">
              {{ v$['exchange_rate'].$errors[0].$message }}
            </div>
          </div>
          <div class="form__item form__item_end-flex">
            <Button type="submit" class="form__button" label="Создать" />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import url from '@/store/config';
import { useVuelidate } from '@vuelidate/core';
import { required, helpers } from '@vuelidate/validators';
import { useDeriveStore } from '@/store/derive';

const deriveStore = useDeriveStore();
const emit = defineEmits(['closeModal']);
const rules = computed(() => {
  return {
    label: {
      required: helpers.withMessage('Обязательно', required),
    },
    description: {
      required: helpers.withMessage('Обязательно', required),
    },
    exchange_rate: {
      required: helpers.withMessage('Обязательно', required),
    },
    file: {
      required: helpers.withMessage('Обязательно', required),
    },
  };
});
const data = ref({
  label: '',
  description: '',
  exchange_rate: null,
  file: null,
});
const v$ = useVuelidate(rules, data);
const cropper_show = ref(false);
let image = ref('/_nuxt/assets/images/avatar.svg');

const customBase64Uploader = (event) => {
  const file = event.files[0];
  image.value = file.objectURL;
  data.value.file = file;
};

async function createDerive() {
  v$.value.$validate();
  if (!v$.value?.$error) {
    let formData = new FormData();
    formData.append('label', data.value?.label);
    formData.append('description', data.value?.description);
    formData.append('exchange_rate', data.value?.exchange_rate);
    formData.append('file', data.value?.file);
    const result = await deriveStore.createDerive(formData);
    emit('closeModal', errorValidate(result?.status));
  }
}
</script>
