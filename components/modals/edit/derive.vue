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
        <form method="post" @change="check()" @submit.prevent="editDerive">
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
          </div>
          <div class="form__item">
            <InputText v-model.trim="data.label" placeholder="Название" />
          </div>
          <div class="form__item">
            <Textarea v-model.trim="data.description" placeholder="Описание" />
          </div>
          <div class="form__item">
            <InputNumber minFractionDigits="2" :min="0" v-model="data.exchange_rate" placeholder="Курс" />
          </div>
          <div class="form__item form__item_end-flex">
            <Button type="submit" class="form__button" label="Изменить" />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import url from '@/store/config';
import { useDeriveStore } from '@/store/derive';

const deriveStore = useDeriveStore();
const props = defineProps(['derive']);
const emit = defineEmits(['closeModal']);
const cropper_show = ref(false);
let image = ref(`${url}/api/${props?.derive?.image}`);

let data = ref({
  label: props?.derive?.label,
  description: props?.derive?.description,
  exchange_rate: props?.derive?.currentRate,
  file: null,
});

const customBase64Uploader = (event) => {
  const file = event.files[0];
  image.value = file.objectURL;
  data.value.file = file;
};

async function editDerive() {
  let formData = new FormData();
  formData.append('label', data.value?.label);
  formData.append('description', data.value?.description);
  formData.append('exchange_rate', data.value?.exchange_rate);
  formData.append('file', data.value?.file);
  const result = await deriveStore.editDerive(formData, props?.derive?.id);
  emit('closeModal', errorValidate(result?.status));
}
</script>
