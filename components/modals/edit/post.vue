<template>
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
        <form method="post" @submit.prevent="editPost">
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
            <InputText v-model="data.title" placeholder="Заголовок" />
          </div>
          <div class="form__item">
            <Dropdown
              :options="rubrics?.rubrics"
              optionLabel="label"
              optionValue="id"
              v-model="data.rubric"
              placeholder="Рубрика"
              filter
              emptyFilterMessage="Нет результатов"
            />
          </div>
          <div class="form__item">
            <ClientOnly>
              <UIEditor v-model="data.text" />
            </ClientOnly>
          </div>
          <div class="form__item">
            <div class="form-upload form__item_old-files">
              <div class="form__item_old-files_item" v-for="oldFile in data.attachIds">
                <div class="form__item_old-files_item_icon">
                  <img
                    width="45"
                    height="45"
                    style="border-radius: 50%; object-fit: cover"
                    v-if="oldFile?.type == 2"
                    :src="`${url}/api/${oldFile?.attach}`"
                    alt=""
                  />
                  <span style="font-size: 35px" v-else class="pi pi-paperclip"></span>
                </div>
                <div class="form__item_old-files_item_label">
                  <p>{{ oldFile?.label }}</p>
                </div>
                <div class="form__item_old-files_item_operation category_content_btns">
                  <Button class="delete" @click="deleteOldFile(oldFile?.id)" />
                </div>
              </div>
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
                  <p v-if="!data?.attachments?.length">Перетащите сюда файлы для загрузки.</p>
                  <p v-if="errorFile" style="color: var(--error-text); padding: 10px 0px 10px 0px">
                    Нельзя загружать больше 10 файлов
                  </p>
                  <div class="file-upload-multiple_content">
                    <div class="file-upload-multiple_content_item" v-for="(file, index) in data?.attachments" :key="index">
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
            <Button :disabled="sendStatus" type="submit" class="form__button" label="Сохранить" />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import url from '@/store/config';
import { useUserStore } from '@/store/user';
import { useBlogStore } from '@/store/post';

const userStore = useUserStore();
const blogStore = useBlogStore();
const props = defineProps(['post']);
const emit = defineEmits(['closeModal']);
const cropper_show = ref(false);

let currentPost = await blogStore.getPostById(props?.post?.id);

let data = ref({
  title: currentPost?.title,
  text: getDecode(currentPost?.text),
  attachIds: currentPost?.attachments,
  file: null,
  attachments: [],
  rubric: currentPost?.rubricId,
});
let rubrics = await blogStore.getAllRubric(1, 1);
let sendStatus = ref(false);
let errorFile = ref(false);
let image = ref(`${url}/api/${currentPost?.preview}`);

const customBase64Uploader = (event) => {
  const file = event.files[0];
  image.value = file.objectURL;
  data.value.file = file;
};

const onAdvancedUploader = (event) => {
  const file = event?.files;
  if (file?.length + data?.value?.attachments?.length > 10) errorFile.value = true;
  else {
    errorFile.value = false;
    data?.value?.attachments.push(...file);
  }
};

const deleteFile = (id) => {
  data?.value?.attachments.splice(id, 1);
};
const deleteOldFile = (id) => {
  for (let value in data.value.attachIds) {
    if (id == data.value.attachIds[value]?.id) {
      data.value.attachIds.splice(value, 1);
      break;
    }
  }
};

async function editPost() {
  let formData = new FormData();
  sendStatus.value = true;
  formData.append('title', data.value?.title);
  formData.append('text', data.value?.text);
  formData.append('preview', data.value?.file);
  formData.append('rubricId', data.value?.rubric);
  if (data?.value?.attachments?.length && !errorFile.value) {
    for (let value of data?.value?.attachments) formData.append('attachments', value);
  }
  if (data?.value?.attachIds.length) {
    for (let value of data?.value?.attachIds.map((item) => item?.id)) formData.append('attachIds', value);
  }
  const result = await userStore.editPost(props?.post?.id, formData);
  emit('closeModal', errorValidate(result?.status));
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
  .form__item {
    &_old-files {
      &_item {
        flex-direction: column;
        align-items: flex-start;
      }
    }
  }
}
.form__item {
  &_old-files {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: max-content;
    &_item {
      display: flex;
      align-items: center;
      width: 100%;
      gap: 12px;
      &_label {
        word-wrap: break-word;
        flex: 1 1 auto;
      }
    }
  }
}
</style>
