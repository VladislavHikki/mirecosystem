<template>
  <div class="category_container">
    <h1>Категории: {{ categoryStore?.categories?.subcategories?.count }}</h1>
    <Toast />
    <div class="category_elements">
      <DataTable v-model:expandedRows="expandedRows" :value="categoryStore?.categories?.subcategories?.rows">
        <Column v-model="expandedRows" expander style="width: 5rem" />
        <Column header="Название Категории">
          <template #body="slotProps">
            <div
              class="category_content_btns"
              :class="{
                deleted_column: slotProps.data.deletedAt,
                active_column: !slotProps.data.deletedAt,
              }"
              style="color: white"
            >
              {{ slotProps.data.label }}
            </div>
          </template>
        </Column>
        <Column field="operations" header="Действия">
          <!-- <template class="c">  -->
          <template #body="slotProps">
            <div
              class="category_content_btns"
              :class="{
                deleted_column: slotProps.data.deletedAt,
                active_column: !slotProps.data.deletedAt,
              }"
            >
              <Button class="red" @click="editCategory(slotProps.data.id, slotProps.data.label)" />
              <Button class="pause" v-if="!slotProps.data.deletedAt" @click="softDeleteInstall(slotProps.data.id)" />
              <Button v-else class="continue" @click="activeCategory(slotProps.data.id)" />
              <Button class="delete" @click="deleteInstall(slotProps.data.id)" />
              <Button class="add" @click="addSubCat(slotProps.data.id, slotProps.data.label)">
                <span class="pi pi-plus"></span>
              </Button>
            </div>
          </template>
          <!-- </div> -->
        </Column>
        <template #expansion="slotProps">
          <div class="p-3">
            <DataTable :value="slotProps.data?.categories">
              <Column header="Название Подкатегории" sortable>
                <template #body="slotProps">
                  <div
                    class="category_content_btns"
                    :class="{
                      deleted_column: slotProps.data.deletedAt,
                      active_column: !slotProps.data.deletedAt,
                    }"
                    style="color: white"
                  >
                    {{ slotProps.data.label }}
                  </div>
                </template>
              </Column>
              <Column field="operations" header="Действия">
                <template #body="slotProps">
                  <div
                    class="category_content_btns"
                    :class="{
                      deleted_column: slotProps.data.deletedAt,
                      active_column: !slotProps.data.deletedAt,
                    }"
                  >
                    <Button @click="editSubcategory(slotProps.data.value, slotProps.data.label)" class="red" />
                    <Button
                      @click="activeSubcategory(slotProps.data.value)"
                      v-if="slotProps.data.deletedAt"
                      class="continue"
                    />
                    <Button
                      @click="softDeleteSubcategory(slotProps.data.value)"
                      v-else="!slotProps.data.deletedAt"
                      class="pause"
                    />
                    <Button @click="deleteSubcategory(slotProps.data.value)" class="delete" />
                  </div>
                </template>
              </Column>
            </DataTable>
          </div>
        </template>
      </DataTable>

      <!-- Модалка Изменить категорию -->
      <Dialog v-model:visible="visible" modal :draggable="false" header="Редактировать категорию" :style="{ width: '50vw' }">
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
                    placeholder="Название категории"
                  />
                  <span class="error" v-if="$v['label'].$error">
                    {{ $v['label'].$errors[0].$message }}
                  </span>
                </div>
            </form>
          </div>
        <template #footer>
          <Button label="Сохранить" icon="pi pi-check" @click="editCategoryFunction()" />
          <Button label="Отмена" icon="pi pi-times" @click="visible = false" />
        </template>
      </Dialog>
      <Dialog
        v-model:visible="visibleSubCategoryEdit"
        modal
        :draggable="false"
        header="Редактировать Подкатегорию"
        :style="{ width: '50vw' }"
      >
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
                    placeholder="Название подкатегории"
                  />
                  <span class="error" v-if="$v['label'].$error">
                    {{ $v['label'].$errors[0].$message }}
                  </span>
                </div>
            </form>
          </div>
        <template #footer>
          <Button label="Сохранить" icon="pi pi-check" @click="editSubcategoryFunction()" />
          <Button label="Отмена" icon="pi pi-times" @click="visible = false" />
        </template>
      </Dialog>
      <Dialog v-model:visible="visibleSoftDel" header="Приостановить категорию" modal :style="{ width: '50vw' }">
        <h2>Вы уверены, что хотите приостановить категорию?</h2>
        <template #footer>
          <Button label="Приостановить" icon="pi pi-check" @click="deleteInstallFunction()" />
          <Button label="Отмена" icon="pi pi-times" @click="visibleSoftDel = false" />
        </template>
      </Dialog>
      <Dialog v-model:visible="visibleDel" header="Удалить категорию" modal :style="{ width: '50vw' }">
        <h2>Вы уверены, что хотите удалить категорию?</h2>
        <template #footer>
          <Button label="Удалить" icon="pi pi-check" @click="deleteInstallFunction()" />
          <Button label="Отмена" icon="pi pi-times" @click="visibleDel = false" />
        </template>
      </Dialog>
      <Dialog
        v-model:visible="visibleAddSubCat"
        :draggable="false"
        :header="`Добавить подкатегорию для категории ` + selectedCategoriesLabel"
        modal
      >
        <div class="wrap-modal">
          <div class="modal-window__content">
            <div class="container">
              <div class="form__item">
                <InputText
                  type="text"
                  v-model="selectedItem.label"
                  :class="{ 'p-invalid': $v['label'].$error }"
                  @change="$v['label'].$touch"
                  placeholder="Название подкатегории"
                />
                <span class="error" v-if="$v['label'].$error">
                  {{ $v['label'].$errors[0].$message }}
                </span>
              </div>
            </div>
          </div>
        </div>
        <template #footer>
          <Button label="Сохранить" icon="pi pi-check" @click="submit()" />
          <Button label="Отмена" icon="pi pi-times" @click="visibleAddSubCat = false" />
        </template>
      </Dialog>
      <Dialog v-model:visible="visibleSoftDelSubcat" header="Приостановить категорию" modal :style="{ width: '50vw' }">
        <h2>Вы уверены, что хотите приостановить подкатегорию?</h2>
        <template #footer>
          <Button label="Приостановить" icon="pi pi-check" @click="deleteSubcategoryFunction()" />
          <Button label="Отмена" icon="pi pi-times" @click="visibleSoftDelSubcat = false" />
        </template>
      </Dialog>
      <Dialog v-model:visible="visibleDelSubcat" header="Удалить категорию" modal :style="{ width: '50vw' }">
        <h2>Вы уверены, что хотите удалить подкатегорию?</h2>
        <template #footer>
          <Button label="Удалить" icon="pi pi-check" @click="deleteSubcategoryFunction()" />
          <Button label="Отмена" icon="pi pi-times" @click="visibleDelSubcat = false" />
        </template>
      </Dialog>
      <Dialog
        v-model:visible="visibleActiveSubcategory"
        header="Восстановление подкатегории"
        modal
        :style="{ width: '50vw' }"
      >
        <h2>Вы уверены, что хотите восстановить подкатегорию?</h2>
        <template #footer>
          <Button label="Восстановить" icon="pi pi-check" @click="activeSubcategoryFunction()" />
          <Button label="Отмена" icon="pi pi-times" @click="visibleActiveSubcategory = false" />
        </template>
      </Dialog>
      <Dialog v-model:visible="visibleActiveCategory" header="Восстановление категории" modal :style="{ width: '50vw' }">
        <h2>Вы уверены, что хотите восстановить категорию?</h2>
        <template #footer>
          <Button label="Восстановить" icon="pi pi-check" @click="activeCategoryFunction()" />
          <Button label="Отмена" icon="pi pi-times" @click="visibleActiveCategory = false" />
        </template>
      </Dialog>
    </div>
    <div class="pagination_btns">
      <Paginator
        v-if="categoryStore.categories?.pages > 1"
        :template="{
          '640px': 'PrevPageLink CurrentPageReport NextPageLink',
          '960px': 'FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink',
          '1300px': 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink',
          default: 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink JumpToPageDropdown JumpToPageInput',
        }"
        v-model:first="page"
        :total-records="categoryStore.categories?.pages"
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
// import { getSortWhereLabel } from '~/store/sort';
import { useToast } from 'primevue/usetoast';

const toast = useToast();
const page = ref(0);
const visibleSoftDel = ref(false);
const visibleSoftDelSubcat = ref(false);
const visibleDelSubcat = ref(false);
const visibleActiveCategory = ref(false);
const visibleActiveSubcategory = ref(false);
const visibleDel = ref(false);
const visible = ref(false);
const visibleSubCategoryEdit = ref(false);
const visibleAddSubCat = ref(false);
const categoryStore = useCategoryStore();
const selectedItem = ref({});
const expandedRows = ref([]);
const selectedCategoriesLabel = ref(null);
let color = '#3B82F6';
let index = ref(0);
const paranoid = false;
const params = ref({
  paranoid: paranoid,
});

const rules = computed(() => {
  return {
    label: {
      required: helpers.withMessage('Введите название', required),
    },
  };
});
const $v = useVuelidate(rules, selectedItem);
onMounted(async () => {
  await categoryStore.requestCategories(params);
});

const selectPage = async (number) => {
  await categoryStore.requestCategories(params);
};

watch(page, () => {
  selectPage(page.value + 1);
});

async function submit() {
  $v.value.$validate();
  if ($v.value.$error == 0) {
    const data = new FormData();
    data.append('label', selectedItem.value.label);
    data.append('subcategoryId', selectedItem.value.ids);
    const result = await categoryStore.createSubcategory(data, page.value + 1);
    toast.add({ severity: 'success', summary: 'OK!', detail: 'Успешно' });

    selectedItem.value = {};
    visibleAddSubCat.value = !visibleAddSubCat.value;
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

  const result = await categoryStore.deleteCategory(data, page.value + 1);
  toast.add({
    severity: errorValidate(result).toastType,
    summary: errorValidate(result).summary,
    detail: errorValidate(result).message,
    life: 3000,
  });
  selectedItem.value = {};
  visibleDel.value = false;
  visibleSoftDel.value = false;
  selectPage(page.value + 1);
}

async function deleteSubcategoryFunction() {
  const data = new FormData();
  data.append('ids', selectedItem.value.ids);
  selectedItem.value.force ? data.append('force', selectedItem.value.force) : null;

  const result = await categoryStore.deleteSubCategory(data, page.value + 1);
  toast.add({
    severity: errorValidate(result).toastType,
    summary: errorValidate(result).summary,
    detail: errorValidate(result).message,
    life: 3000,
  });
  selectedItem.value = {};
  visibleDelSubcat.value = false;
  visibleSoftDelSubcat.value = false;
  selectPage(page.value + 1);
}

async function editSubcategoryFunction() {
  const data = new FormData();
  data.append('label', selectedItem.value.label);
  const result = await categoryStore.updateSubcategory(selectedItem.value.id, data);
  toast.add({
    severity: errorValidate(result).toastType,
    summary: errorValidate(result).summary,
    detail: errorValidate(result).message,
    life: 3000,
  });
  visibleSubCategoryEdit.value = !visibleSubCategoryEdit.value;
  selectedItem.value = {};
  selectPage(page.value + 1);
}

async function editCategoryFunction() {
  const data = new FormData();
  data.append('label', selectedItem.value.label);
  const result = await categoryStore.updateCategory(selectedItem.value.id, data);
  toast.add({
    severity: errorValidate(result).toastType,
    summary: errorValidate(result).summary,
    detail: errorValidate(result).message,
    life: 3000,
  });
  visible.value = !visible.value;
  selectedItem.value = {};
  selectPage(page.value + 1);
}

async function activeCategoryFunction() {
  const data = new FormData();
  data.append('ids', selectedItem.value.ids);
  const result = await categoryStore.restoreCategory(data);
  toast.add({
    severity: errorValidate(result).toastType,
    summary: errorValidate(result).summary,
    detail: errorValidate(result).message,
    life: 3000,
  });
  visibleActiveCategory.value = false;
  selectedItem.value = {};
  selectPage(page.value + 1);
}

async function activeSubcategoryFunction() {
  const data = new FormData();
  data.append('ids', selectedItem.value.ids);
  const result = await categoryStore.restoreSubcategory(data);
  toast.add({
    severity: errorValidate(result).toastType,
    summary: errorValidate(result).summary,
    detail: errorValidate(result).message,
    life: 3000,
  });
  visibleActiveSubcategory.value = false;
  selectedItem.value = {};
  selectPage(page.value + 1);
}

function editCategory(id, item) {
  selectedItem.value.label = item;
  selectedItem.value.id = id;
  visible.value = !visible.value;
}

function editSubcategory(id, item) {
  selectedItem.value.label = item;
  selectedItem.value.id = id;
  visibleSubCategoryEdit.value = !visibleSubCategoryEdit.value;
}

function softDeleteInstall(ids, force = false) {
  selectedItem.value.ids = ids;
  selectedItem.value.force = force;
  visibleSoftDel.value = !visibleSoftDel.value;
}

function deleteInstall(ids) {
  selectedItem.value.ids = ids;
  selectedItem.value.force = true;
  visibleDel.value = !visibleDel.value;
}

function addSubCat(ids, label) {
  selectedItem.value.label = null;
  selectedItem.value.ids = ids;
  selectedCategoriesLabel.value = label;
  visibleAddSubCat.value = !visibleAddSubCat.value;
}

function softDeleteSubcategory(ids, force = false) {
  selectedItem.value.ids = ids;
  selectedItem.value.force = force;
  visibleSoftDelSubcat.value = true;
}

function deleteSubcategory(ids) {
  selectedItem.value.ids = ids;
  selectedItem.value.force = true;
  visibleDelSubcat.value = !visibleDelSubcat.value;
}

function activeCategory(ids) {
  selectedItem.value.ids = ids;
  visibleActiveCategory.value = !visibleActiveCategory.value;
}

function activeSubcategory(ids) {
  selectedItem.value.ids = ids;
  visibleActiveSubcategory.value = !visibleActiveSubcategory.value;
}
</script>
<style lang="scss">
.category_container {
  .p-datatable .p-datatable-tbody > tr > td {
    padding: 0 0 !important;
  }
  .category_content_btns {
    height: 4rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.add {
  display: flex;
  justify-content: center;
  background: #16a34a;
  color: white !important;
}

.add:focus {
  background: #16a34a !important;
  color: white !important;
}

.add:hover {
  background: #16a34a !important;
  color: white !important;
}

.deleted_column {
  background: #16a34a !important;
}

.active_column {
  background: #3b82f6 !important;
}

.continue {
  background: #2ca8ff !important;
  background-image: url(~/assets/images/arrow_right.png) !important;
  background-position: center center !important;
  background-repeat: no-repeat !important;
}

.continue:hover {
  background-image: url(~/assets/images/arrow_right.png) !important;
  background-position: center center !important;
  background-repeat: no-repeat !important;
}

.continue:focus {
  background-image: url(~/assets/images/arrow_right.png) !important;
  background-position: center center !important;
  background-repeat: no-repeat !important;
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
        .category_content_btns {
          display: flex;
          gap: 10px;
          button {
            width: 32px;
            height: 32px;
            border-radius: 5px;
            padding: 0;
          }
          .p-button {
            border: 0px;
          }
          .red {
            background: #ff8a00;
            background-image: url(~/assets/images/pen.png);
            background-position: center center;
            background-repeat: no-repeat;
          }
          .pause {
            background: #2ca8ff;
            background-image: url(~/assets/images/pause.png);
            background-position: center center;
            background-repeat: no-repeat;
          }
          .delete {
            background: #f81111;
            background-image: url(~/assets/images/delete.png);
            background-position: center center;
            background-repeat: no-repeat;
          }
        }
      }
    }
  }
}
</style>
