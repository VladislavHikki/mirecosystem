<template>
  <div class="modal-window__body">
    <Dialog modal header="Редактировать аватарку" v-model:visible="cropper_show">
      <UICropper
        @get-image="(cropper_show = false), (data['file'] = $event?.file), (image = $event?.url)"
        :image="data['file']"
        isBg
        typeBox="square"
      />
    </Dialog>
    <div class="modal-window__content">
      <div class="modal-window__container">
        <!-- <ProgressSpinner style="position: absolute; z-index: 3;" v-if="true" /> -->
        <form method="post" @submit.prevent="createPost">
          <div class="form__item form-input upload-file upload-file_indent form-item_indent">
            <div class="form-upload">
              <div class="out-choose-image">
                <img loading="lazy" width="100" height="100" alt="" :src="image" />
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
              <div class="error" v-if="v$['file'].$error">
                {{ v$['file'].$errors[0].$message }}
              </div>
            </div>
          </div>
          <div class="form__item">
            <InputText v-model.trim="data.title" :class="{ 'p-invalid': v$['title'].$error }" placeholder="Заголовок" />
            <div class="error" v-if="v$['title'].$error">
              {{ v$['title'].$errors[0].$message }}
            </div>
          </div>
          <div class="form__item">
            <ClientOnly>
              <UIEditor v-model="data.text" />
            </ClientOnly>
            <div class="error" v-if="v$['text'].$error">
              {{ v$['text'].$errors[0].$message }}
            </div>
          </div>
          <div class="form__item">
            <Dropdown
              filter
              empty-filter-message="Нет результатов"
              :options="rubrics?.rubrics"
              optionLabel="label"
              optionValue="id"
              v-model="data.rubric"
              placeholder="Рубрика"
              :class="{ 'p-invalid': v$['rubric'].$error }"
            />
            <div class="error" v-if="v$['rubric'].$error">
              {{ v$['rubric'].$errors[0].$message }}
            </div>
          </div>
          <div class="form__item">
            <div class="form-upload">
              <FileUpload
                name="demo[]"
                :auto="true"
                :multiple="true"
                customUpload
                @uploader="onAdvancedUploader($event)"
                choose-label="Загрузить"
                :show-cancel-button="false"
                :show-upload-button="false"
              >
                <template #content>
                  <p v-if="!attachments?.length">Перетащите сюда файлы для загрузки.</p>
                  <p v-if="errorFile" style="color: var(--error-text); padding: 10px 0px 10px 0px">
                    Нельзя загружать больше 10 файлов
                  </p>
                  <div class="file-upload-multiple_content">
                    <div class="file-upload-multiple_content_item" v-for="(file, index) in attachments" :key="index">
                      <img
                        width="45"
                        height="45"
                        v-if="getIconByTypeFile(file)?.url"
                        :src="getIconByTypeFile(file)?.url"
                        alt=""
                      />
                      <span style="font-size: 35px" v-else :class="getIconByTypeFile(file)?.class"></span>
                      <p>{{ getIconByTypeFile(file)?.name }}</p>
                      <!-- <span class="error" v-if="getIconByTypeFile(file)?.status">{{ getIconByTypeFile(file)?.status }}</span> -->
                      <div class="category_content_btns">
                        <Button @click="deleteFile(index)" class="delete"></Button>
                      </div>
                    </div>
                  </div>
                </template>
              </FileUpload>
            </div>
          </div>
          <div class="form__item form__item_end-flex">
            <Button :disabled="sendStatus" type="submit" class="form__button" label="Создать" />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '@/store/user';
import { useBlogStore } from '@/store/post';
import { useVuelidate } from '@vuelidate/core';
import { required, helpers } from '@vuelidate/validators';

const blogStore = useBlogStore();
const userStore = useUserStore();
const props = defineProps(['post']);
const emit = defineEmits(['closeModal', 'createPost']);
const rules = computed(() => {
  return {
    title: {
      required: helpers.withMessage('Обязательно', required),
    },
    text: {
      required: helpers.withMessage('Обязательно', required),
    },
    file: {
      required: helpers.withMessage('Обязательно', required),
    },
    rubric: {
      required: helpers.withMessage('Обязательно', required),
    },
  };
});
const data = ref({
  title: '',
  text: '',
  file: null,
  rubric: null,
});
const v$ = useVuelidate(rules, data);
const cropper_show = ref(false);

let image = ref('/_nuxt/assets/images/avatar.svg');
let rubrics = ref(await blogStore.getAllRubric(1, 1));
let attachments = ref([]);
let sendStatus = ref(false);
let errorFile = ref(false);

const customBase64Uploader = (event) => {
  const file = event.files[0];
  image.value = file.objectURL;
  document.querySelector(`.out-choose-image > img`).src = file.objectURL;
  data.value.file = file;
};

const onAdvancedUploader = (event) => {
  const file = event?.files;
  if (file?.length + attachments.value?.length > 10) errorFile.value = true;
  else {
    errorFile.value = false;
    attachments.value.push(...file);
  }
};

const deleteFile = (id) => {
  attachments.value.splice(id, 1);
};

async function createPost() {
  v$.value.$validate();
  if (!v$.value?.$error) {
    sendStatus.value = true;

    let formData = new FormData();
    formData.append('title', data.value?.title);
    formData.append('text', data.value?.text);
    formData.append('preview', data.value?.file);
    formData.append('rubricId', data.value?.rubric);
    if (attachments?.value?.length && !errorFile.value) {
      for (let value of attachments?.value) formData.append('attachments', value);
    }
    const result = await userStore.createPost(formData);
    console.log(result);
    emit('closeModal', errorValidate(result?.status));
  }
}
</script>

<style lang="scss" scoped>
.file-upload-multiple_content {
  display: flex;
  flex-direction: column;
  gap: 8px;
  &_item {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  p {
    flex: 1 1 auto;
    -webkit-line-clamp: 1;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
}
@media screen and (max-width: $x-small) {
  .file-upload-multiple_content {
    &_item {
      flex-direction: column;
      align-items: flex-start;
    }
  }
}
</style>
