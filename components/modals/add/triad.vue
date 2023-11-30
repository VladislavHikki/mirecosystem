<template>
  <div class="modal-window__body">
    <div class="modal-window__content">
      <div class="modal-window__container">
        <form action="" method="post" @submit.prevent="submit">
          <div class="form__item form-input upload-file upload-file_indent form-item_indent">
            <div class="form-upload">
              <div class="out-choose-image">
                <img loading="lazy" width="100" height="100" alt="" :src="image" />
              </div>
              <Dialog modal header="Редактировать аватарку" v-model:visible="cropper_show_subSec">
                <UICropper
                  @get-image="(cropper_show_subSec = false), (data['file'] = $event?.file), (image = $event?.url)"
                  :image="image"
                  isAvatar
                />
              </Dialog>
              <FileUpload
                accept=".jpg, .png, .jpeg"
                mode="basic"
                :auto="true"
                customUpload
                @uploader="customBase64Uploader"
                chooseLabel="Загрузить"
              />
              <Button icon="pi pi-user-edit" label="Изменить" @click="cropper_show_subSec = true" />
              <!-- <div class="error" v-if="v$['file'].$error">
              {{ v$['file'].$errors[0].$message }}
            </div> -->
            </div>
            <div class="error" v-if="v$['file'].$error">
              {{ v$['file'].$errors[0].$message }}
            </div>
          </div>
          <div class="form__item">
            <InputText
              v-model.trim="data.label"
              placeholder="Наименование триады"
              :class="{ 'p-invalid': v$['label'].$error }"
            />
            <div class="error" v-if="v$['label'].$error">
              {{ v$['label'].$errors[0].$message }}
            </div>
          </div>
          <div class="form__item">
            <Dropdown
              v-model="data.userId"
              placeholder="Глава триады"
              :options="userStore?.users"
              option-label="label"
              option-value="value"
              filter
              empty-filter-message="Нет результатов"
              :class="{ 'p-invalid': v$['userId'].$error }"
            />
            <div class="error" v-if="v$['userId'].$error">
              {{ v$['userId'].$errors[0].$message }}
            </div>
          </div>
          <div class="form__item">
            <MultiSelect
              v-model="data.divisions"
              :options="categoryStore?.subsectionsList"
              placeholder="Дивизионы триады"
              optionLabel="label"
              optionValue="id"
              filter
              empty-filter-message="Нет результатов"
              :class="{ 'p-invalid': v$['divisions'].$error }"
            />
            <div class="error" v-if="v$['divisions'].$error">
              {{ v$['divisions'].$errors[0].$message }}
            </div>
          </div>
          <div class="form__item_end-flex">
            <Button type="submit" class="form__button" label="Сохранить" />
            <Button @click="$emit('closeModal')" class="form__button" label="Отмена" />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useTriadsStore } from '@/store/triads';
import { useCategoryStore } from '~/store/category';
import { useVuelidate } from '@vuelidate/core';
import { required, helpers } from '@vuelidate/validators';
import { useUserStore } from '~/store/user';

const userStore = useUserStore();
const triadsStore = useTriadsStore();
const categoryStore = useCategoryStore();
const rules = computed(() => {
  return {
    label: {
      required: helpers.withMessage('Обязательно', required),
    },
    file: {
      required: helpers.withMessage('Обязательно', required),
    },
    userId: {
      required: helpers.withMessage('Обязательно', required),
    },
    divisions: {
      required: helpers.withMessage('Обязательно', required),
    },
  };
});
const emit = defineEmits(['closeModal']);

await categoryStore.requestListSubsections();
await userStore.requestUserList();

let data = shallowReactive({
  file: null,
  label: null,
  userId: null,
  divisions: null,
});
const v$ = useVuelidate(rules, data);
let image = ref();
let cropper_show_subSec = ref(false);

const submit = async () => {
  v$.value.$validate();
  if (!v$.value?.$error) {
    let form = new FormData();
    form.append('file', data.file);
    form.append('label', data?.label);
    form.append('userId', data.userId);
    if (data.divisions?.length) {
      data.divisions.map((item) => {
        form.append('ids', item);
      });
    }
    const result = await triadsStore.createTriad(form);
    emit('closeModal', result);
  }
};
const customBase64Uploader = (event) => {
  const file = event.files[0];
  image.value = file.objectURL;
  document.querySelector(`.out-choose-image > img`).src = file.objectURL;
  data.file = file;
};
</script>
