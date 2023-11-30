<template>
  <div class="category_container">
    <h1>Проекты: {{ categoryStore?.projects?.projects?.count }}</h1>
    <Toast />
    <div class="category_elements">
      <!-- <div class="category_item"
                    v-for="(value, index) in categoryStore?.projects?.projects?.rows" :key="index"
                >
                    <button class="move_object" style="margin-top:0px;" @click="SetOrderObject(index)"></button>
                    <div class="category_item_content">
                        <div class="category_content_item">
                            <button style="margin-top:0px"> </button>
                            <div class="name">{{ value.label }}</div>
                        </div>
                        <div class="category_content_btns">
                            <Button @click="openDialog()" class="red"></Button>
                            <Button class="pause"></Button>
                            <Button @click="openDialog(del = true)" class="delete"></Button>
                        </div>
                    </div>
                </div> -->
      <DataTable :value="categoryStore?.projects?.projects?.rows" dataKey="id" tableStyle="min-width: 50rem">
        <Column field="label" header="Название"></Column>
        <Column field="id" header="Дата создания">
          <template #body="slotProps">
            {{ new Date(slotProps.data.createdAt).toLocaleString() }}
          </template>
        </Column>
        <Column field="id" header="Действия">
          <template #body="slotProps">
            <div class="category_content_btns">
              <Button @click="editProject(slotProps.data.id, slotProps.data)" class="red"></Button>
              <!--                                <Button @click="softDeleteInstall(slotProps.data.id, false)" class="pause"></Button>-->
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
      <Dialog v-model:visible="visible" header="Редактировать проект" modal :style="{ width: '50vw' }">
        <div>
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
                  placeholder="Наименование проекта"
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
            </form>
          </div>
        </div>
        <template #footer>
          <Button label="Сохранить" icon="pi pi-check" @click="submit()" />
          <Button label="Отмена" icon="pi pi-times" @click="visible = false" />
        </template>
      </Dialog>
      <!-- <Dialog v-model:visible="visibleSoftDel" header="Приостановить проект" modal :style="{ width: '50vw' }">
                    <h2>Вы уверены, что хотите приостановить проект?</h2>
                    <template #footer>
                        <Button label="Приостановить" icon="pi pi-check" @click="deleteInstallFunction()" />
                        <Button label="Отмена" icon="pi pi-times" @click="visibleSoftDel = false" />
                    </template>
                </Dialog> -->
      <Dialog v-model:visible="visibleDel" header="Удалить проект" modal :style="{ width: '50vw' }">
        <h2>Вы уверены, что хотите удалить проект?</h2>
        <template #footer>
          <Button label="Удалить" icon="pi pi-check" @click="deleteInstallFunction()" />
          <Button label="Отмена" icon="pi pi-times" @click="visibleDel = false" />
        </template>
      </Dialog>
    </div>
    <div class="pagination_btns">
      <Paginator
        v-if="categoryStore.projects?.pages > 1"
        :template="{
          '640px': 'PrevPageLink CurrentPageReport NextPageLink',
          '960px': 'FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink',
          '1300px': 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink',
          default: 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink JumpToPageDropdown JumpToPageInput',
        }"
        v-model:first="page"
        :total-records="categoryStore.projects?.pages"
        :rows="1"
        currentPageReportTemplate="{last} из {totalRecords}"
      />
    </div>
  </div>
</template>

<script setup>
import { useVuelidate } from '@vuelidate/core';
import { required, helpers } from '@vuelidate/validators';
import { useCategoryStore } from '@/store/category';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { getSortWhereLabel } from '@/store/sort';
import { useToast } from 'primevue/usetoast';

const toast = useToast();
const page = ref(0);
let image = ref('/_nuxt/assets/images/avatar.svg');
const visibleSoftDel = ref(false);
const visibleDel = ref(false);
const visible = ref(false);
const selectedItem = ref({});
const categoryStore = useCategoryStore();
const cropper_show = ref(false);

onMounted(async () => {
  await categoryStore.requestProjects(1);
});

const selectPage = async (number) => {
  await categoryStore.requestProjects(number);
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

async function submit() {
  $v.value.$validate();
  if ($v.value.$error == 0) {
    const data = new FormData();
    typeof selectedItem.value['file'] == 'object'
      ? data.append('file', selectedItem.value['file'])
      : data.append('file', null);

    data.append('label', selectedItem.value.label);

    const result = await categoryStore.updateProject(selectedItem.value.id, data, page.value + 1);
    selectPage(page.value + 1);

    toast.add({ severity: 'success', summary: 'OK!', detail: 'Успешно', life: 3000 });
    selectedItem.value = {};
    visible.value = !visible.value;
  } else {
    toast.add({
      severity: errorValidate(result).toastType,
      summary: errorValidate(result).summary,
      detail: errorValidate(result).message,
      life: 3000,
    });
  }
}

async function deleteInstallFunction() {
  const data = new FormData();
  data.append('ids', selectedItem.value.ids);
  selectedItem.value.force ? data.append('force', selectedItem.value.force) : null;

  const result = await categoryStore.deleteProject(data, page.value + 1);

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

function editProject(id, item) {
  selectedItem.value.label = item.label;
  selectedItem.value.id = id;
  selectedItem['file'] = item.picture;
  image.value = getImageUrl(item.picture);
  visible.value = !visible.value;
}

// function softDeleteInstall(ids, force = false) {
//     selectedItem.value.ids = ids;
//     selectedItem.value.force = force;
//     visibleSoftDel.value = !visibleSoftDel.value;
// }

function deleteInstall(ids) {
  selectedItem.value.ids = ids;
  visibleDel.value = !visibleDel.value;
}

const customBase64Uploader = (event) => {
  const file = event.files[0];
  image.value = file.objectURL;
  selectedItem['file'] = file;
};
</script>
<style lang="scss">
.error {
  color: var(--error-text);
  font-size: 14px;
  margin-left: 15px;
  margin-top: 5px;
}
.category_container {
  background: #ffffff;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.25);
  border-radius: 7px;
  padding: 23px 28px 110px 36px;
  h1 {
    margin-bottom: 41px;
  }
  .category_elements {
    width: 100%;
    display: flex;
    flex-direction: column;
    .category_item {
      height: 100px;
      width: 100%;
      display: flex;
      align-items: center;
      gap: 12px;
      .move_object {
        padding: 0;
        height: 65px;
        width: 5%;
        border-radius: none;
        background: #f6f6f6;
        border-top: 1px;
        border-bottom: 1px;
        border-style: solid;
        border-color: #d9d9d9;
        box-shadow: none;
        border-radius: 0;
        background-image: url(~/assets/images/arrow_move_object_category.png);
        background-repeat: no-repeat;
        background-position: center center;
      }
    }
  }
  .category_item_content {
    display: flex;
    justify-content: space-between;
    width: 95%;
    padding: 15px;
    background: #f6f6f6;
    border-top: 1px;
    border-bottom: 1px;
    border-style: solid;
    border-color: #d9d9d9;
    align-items: center;
    .category_content_item {
      display: flex;
      align-items: center;
    }
  }
}
</style>
