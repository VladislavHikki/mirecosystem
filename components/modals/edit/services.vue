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
          <form method="post" @submit.prevent="editService">
            <div class="form__item form-input upload-file upload-file_indent form-item_indent">
              <div class="form-upload">
                <div class="out-choose-image">
                  <img loading="lazy" width="100" height="100" :src="image" alt="" />
                </div>
                <FileUpload
                  accept=".jpg, .png, .jpeg, .svg"
                  mode="basic"
                  :auto="true"
                  customUpload
                  @uploader="customBase64Uploader"
                  chooseLabel="Загрузить"
                />
                <Button icon="pi pi-user-edit" label="Изменить" @click="cropper_show = true" />
              </div>
            </div>
            <div class="form__item">
              <InputText v-model="data.label" placeholder="Название" />
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
              />
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
import url from '@/store/config';

const servicesStore = useServicesStore();
const cropper_show = ref(false);
const props = defineProps({
  service: {
    type: Object,
    default: null,
  },
  typeId: {
    type: Number,
    default: null,
  },
});
const emit = defineEmits(['closeModal']);
const data = shallowReactive({
  file: null,
  label: props?.service?.label,
  url: props?.service?.url,
  active: props?.service?.active,
});

let image = ref(props?.service?.picture ? `${url}/api/${props?.service?.picture}` : '/_nuxt/assets/images/avatar.svg');

const customBase64Uploader = (event) => {
  const file = event.files[0];
  image.value = file.objectURL;
  data.file = file;
};

const editService = async () => {
  let form = new FormData();
  form.append('file', data.file);
  form.append('label', data.label);
  form.append('url', data.url);
  form.append('typeId', props?.typeId);
  form.append('active', data.active ? 1 : 0);
  const result = await servicesStore.editService(props?.service?.id, form);
  emit('closeModal', result);
};
</script>

<style></style>
