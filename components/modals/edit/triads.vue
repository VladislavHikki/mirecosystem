<template>
  <div class="modal-window__body">
    <div class="modal-window__content">
      <div class="modal-window__container">
        <form method="post" @submit.prevent="submit">
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
          </div>
          <div class="form__item">
            <InputText v-model="data.label" placeholder="Наименование триады" />
            <!-- <div class="error" v-if="v$['title'].$error">
                {{ v$['title'].$errors[0].$message }}
              </div> -->
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
            />
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
</template>

<script setup>
import { useUserStore } from '~/store/user';
import { useCategoryStore } from '~/store/category';
import { useTriadsStore } from '@/store/triads';
import url from '@/store/config';

const props = defineProps({
  triad_info: {
    type: Object,
    default: null,
  },
});
const emit = defineEmits(['closeModal']);
const categoryStore = useCategoryStore();
const triadsStore = useTriadsStore();
const userStore = useUserStore();

await userStore.requestUserList();
await categoryStore.requestListSubsections();

let data = shallowReactive({
  file: null,
  label: props.triad_info.label,
  userId: props.triad_info.user.id,
  divisions: props.triad_info.subsections?.map((item) => item?.id),
});
let image = ref(`${url}/api/${props?.triad_info?.picture}`);
let cropper_show_subSec = ref(false);

const submit = async () => {
  let form = new FormData();
  form.append('file', data.file);
  form.append('label', data?.label);
  form.append('userId', data.userId);
  if (data.divisions?.length) {
    data.divisions.map((item) => {
      form.append('ids', item);
    });
  }
  const result = await triadsStore.editTriad(props?.triad_info?.id, form);
  emit('closeModal', result);
};
const customBase64Uploader = (event) => {
  const file = event.files[0];
  image.value = file.objectURL;
  document.querySelector(`.out-choose-image > img`).src = file.objectURL;
  data.file = file;
};
</script>
