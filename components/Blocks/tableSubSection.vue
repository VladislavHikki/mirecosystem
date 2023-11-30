<template>
  <div class="category_container">
    <h1>Дивизионы: {{ categoryStore?.subsections?.subsections?.count }}</h1>
    <Toast />
    <div class="category_elements">
      <DataTable :value="categoryStore?.subsections?.subsections?.rows" dataKey="id" tableStyle="min-width: 50rem">
        <template #header>
          <div class="flex justify-content-end">
            <span class="p-input-icon-left">
              <i class="pi pi-search" />
              <InputText v-model="txtSubSection" @input="getSubSection" placeholder="Поиск" />
            </span>
          </div>
        </template>
        <Column field="label" header="Название"></Column>
        <Column field="id" header="Дата создания">
          <template #body="slotProps">
            {{ new Date(slotProps.data.createdAt).toLocaleString() }}
          </template>
        </Column>
        <Column field="user.name" header="Глава дивизиона"> </Column>
        <Column field="id" header="Действия">
          <template #body="slotProps">
            <div class="category_content_btns">
              <Button @click="editSubSection(slotProps.data.id, slotProps.data)" class="red"></Button>
              <Button @click="deleteInstall(slotProps.data.id, true)" class="delete"></Button>
            </div>
          </template>
        </Column>
      </DataTable>
      <Dialog modal header="Редактировать аватарку" v-model:visible="cropper_show">
        <UICropper
          @get-image="(cropper_show = false), (selectedItem['file'] = $event?.file), (image = $event?.url)"
          :image="image"
          isAvatar
        />
      </Dialog>
      <Dialog v-model:visible="visible" header="Редактировать дивизион" modal :style="{ width: '50vw' }">
        <div class="modal-window__container">
          <form method="post">
            <div class="form__item">
              <InputText
                name="label"
                type="text"
                :class="{ 'p-invalid': $v['label'].$error }"
                @change="$v['label'].$touch"
                v-model="selectedItem.label"
                :value="selectedItem.label"
                placeholder="Наименование дивизиона"
              />
              <span class="error" v-if="$v['label'].$error">
                {{ $v['label'].$errors[0].$message }}
              </span>
            </div>
            <div class="form__item">
              <div class="form-upload">
                <div class="out-choose-image">
                  <img loading="lazy" width="100" height="100" :src="image" alt="" />
                </div>
                <FileUpload
                  mode="basic"
                  :auto="true"
                  name="demo[]"
                  accept="image/*"
                  customUpload
                  v-model="selectedItem['file']"
                  @uploader="customBase64Uploader"
                  chooseLabel="Загрузить"
                />
                <Button icon="pi pi-user-edit" label="Изменить" @click="cropper_show = true" />
              </div>
            </div>
            <div class="form__item">
              <Dropdown
                v-model="selectedItem.userId"
                :value="selectedItem?.userId"
                option-label="label"
                option-value="value"
                :options="userStore?.users"
                placeholder="Глава дивизиона"
                filter
              />
              <span class="error" v-if="$v['label'].$error">
                {{ $v['label'].$errors[0].$message }}
              </span>
            </div>
          </form>
        </div>
        <template #footer>
          <Button label="Сохранить" icon="pi pi-check" @click="submit()" />
          <Button label="Отмена" icon="pi pi-times" @click="visible = false" />
        </template>
      </Dialog>
      <Dialog v-model:visible="visibleDel" header="Удалить дивизион" modal :style="{ width: '50vw' }">
        <h2>Вы уверены, что хотите удалить дивизион?</h2>
        <template #footer>
          <Button label="Удалить" icon="pi pi-check" @click="deleteInstallFunction()" />
          <Button label="Отмена" icon="pi pi-times" @click="visibleDel = false" />
        </template>
      </Dialog>
    </div>
    <div class="pagination_btns">
      <Paginator
        v-if="categoryStore.subsections?.pages > 1"
        :template="{
          '640px': 'PrevPageLink CurrentPageReport NextPageLink',
          '960px': 'FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink',
          '1300px': 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink',
          default: 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink JumpToPageDropdown JumpToPageInput',
        }"
        v-model:first="page"
        :total-records="categoryStore.subsections?.pages"
        :rows="1"
        currentPageReportTemplate="{last} из {totalRecords}"
      />
    </div>
  </div>
</template>

<script setup>
import { useVuelidate } from '@vuelidate/core';
import { required, helpers } from '@vuelidate/validators';
import { useCategoryStore } from '~/store/category';
import { useUserStore } from '~/store/user';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { useToast } from 'primevue/usetoast';

let image = ref('/_nuxt/assets/images/avatar.svg');
const toast = useToast();
const page = ref(0);
const visibleSoftDel = ref(false);
const visibleDel = ref(false);
const visible = ref(false);
const selectedItem = ref({});
const categoryStore = useCategoryStore();
const userStore = useUserStore();
let txtSubSection = ref('');
let params = ref({});
const cropper_show = ref(false);

const selectPage = async (number) => {
  await categoryStore.requestSubsections(number);
};

const rules = computed(() => {
  return {
    label: {
      required: helpers.withMessage('Введите название', required),
    },
  };
});
const $v = useVuelidate(rules, selectedItem);

watch(page, () => {
  selectPage(page.value + 1);
});

async function getSubSection() {
  page.value = 0;
  params.value = { search: txtSubSection.value };
  await categoryStore.requestSubsections(1, params.value);
}

const selectPageResource = async (number) => {
  params.value = { search: txtSubSection.value };
  await categoryStore.requestSubsections(number, params.value);
};

watch(page, () => {
  selectPageResource(page.value + 1);
});

onMounted(async () => {
  await categoryStore.requestSubsections(1);
  await userStore.requestUserList();
});

const customBase64Uploader = (event) => {
  const file = event.files[0];
  image.value = file.objectURL;
  selectedItem.value['file'] = file;
};

async function submit() {
  $v.value.$validate();
  if ($v.value.$error == 0) {
    const data = new FormData();

    typeof selectedItem.value['file'] == 'object'
      ? data.append('file', selectedItem.value['file'])
      : data.append('file', null);

    data.append('label', selectedItem.value.label);
    data.append('userId', selectedItem.value.userId);

    const result = await categoryStore.updateSubsection(selectedItem.value.id, data, page.value + 1);

    toast.add({
      severity: errorValidate(result).toastType,
      summary: errorValidate(result).summary,
      detail: errorValidate(result).message,
      life: 3000,
    });

    selectedItem.value = {};
    visible.value = !visible.value;
  }
}

function deleteInstall(ids) {
  selectedItem.value.ids = ids;
  visibleDel.value = !visibleDel.value;
}
async function deleteInstallFunction() {
  const data = new FormData();
  data.append('ids', selectedItem.value.ids);
  selectedItem.value.force ? data.append('force', selectedItem.value.force) : null;

  const result = await categoryStore.deleteSubsection(data, page.value + 1);

  toast.add({
    severity: errorValidate(result).toastType,
    summary: errorValidate(result).summary,
    detail: errorValidate(result).message,
    life: 3000,
  });

  selectedItem.value = {};
  if (visibleSoftDel.value) visibleSoftDel.value = !visibleSoftDel.value;
  if (visibleDel.value) visibleDel.value = !visibleDel.value;
}

function editSubSection(id, item) {
  selectedItem.value.label = item.label;
  selectedItem.value.id = id;
  selectedItem.value.userId = item.userId;
  image.value = getImageUrl(item.picture);
  visible.value = !visible.value;
}
</script>

<style lang="scss"></style>
