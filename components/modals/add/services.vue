<template>
  <div>
    <div class="modal-window__body">
      <Dialog modal header="Редактировать аватарку" v-model:visible="cropper_show">
        <UICropper
          @get-image="(cropper_show = false), (data['file'] = $event?.file), (image = $event?.url)"
          :image="image"
          isBg
          typeBox="square"
        />
      </Dialog>
      <div class="modal-window__content">
        <div class="modal-window__container">
          <form method="post" @submit.prevent="createService">
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
                <Button icon="pi pi-user-edit" label="Изменить" @click="cropper_show = true" />
              </div>
              <div class="error" v-if="v$['file'].$error">
                {{ v$['file'].$errors[0].$message }}
              </div>
            </div>
            <div class="form__item">
              <InputText v-model="data.label" placeholder="Название" :class="{ 'p-invalid': v$['label'].$error }" />
            </div>
            <div class="error form-input" v-if="v$['label'].$error">
              {{ v$['label'].$errors[0].$message }}
            </div>
            <div class="form__item">
              <InputText v-model="data.url" placeholder="Ссылка" />
            </div>
            <div class="form__item">
              <Dropdown
                :options="[
                  { label: 'Активный', id: 1 },
                  { label: 'Неактивный', id: 0 },
                ]"
                v-model="data.active"
                placeholder="Статус"
                option-label="label"
                option-value="id"
                :class="{ 'p-invalid': v$['active'].$error }"
              />
            </div>
            <div class="error form-input" v-if="v$['active'].$error">
              {{ v$['active'].$errors[0].$message }}
            </div>
            <div class="form__item_end-flex">
              <Button type="submit" class="form__button" label="Сохранить" />
              <Button @click="$emit('closeModal', 'close')" class="form__button" label="Отмена" />
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useServicesStore } from '~/store/services';
import { useVuelidate } from '@vuelidate/core';
import { required, helpers } from '@vuelidate/validators';

const rules = computed(() => {
  return {
    label: {
      required: helpers.withMessage('Обязательно', required),
    },
    file: {
      required: helpers.withMessage('Обязательно', required),
    },
    active: {
      required: helpers.withMessage('Обязательно', required),
    },
  };
});
const servicesStore = useServicesStore();
const cropper_show = ref(false);
const props = defineProps({
  typeId: {
    type: Number,
    default: null,
  },
});
const emit = defineEmits(['closeModal']);
const data = shallowReactive({
  file: null,
  label: new String(),
  url: new String(),
  active: new Number(),
});
const v$ = useVuelidate(rules, data);

let image = ref('/_nuxt/assets/images/avatar.svg');

const customBase64Uploader = (event) => {
  const file = event.files[0];
  image.value = file.objectURL;
  data.file = file;
};

const createService = async () => {
  v$.value.$validate();
  if (!v$.value?.$error) {
    let form = new FormData();
    form.append('file', data.file);
    form.append('label', data.label);
    form.append('url', data.url);
    form.append('active', data.active ? 1 : 0);
    form.append('typeId', props.typeId);
    const result = await servicesStore.createService(form);
    emit('closeModal', result);
  }
};
</script>
