<template>
  <div class="category_container">
    <h1>Рубрики: {{ categoryStore?.rubrics?.rubrics?.count }}</h1>
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
      <DataTable :value="categoryStore?.rubrics?.rubrics?.rows" dataKey="id" tableStyle="min-width: 50rem">
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
              <Button @click="deleteInstall(slotProps?.data?.id)" class="delete"></Button>
            </div>
          </template>
        </Column>
      </DataTable>
      <Dialog v-model:visible="visible" header="Редактировать рубрику" modal :style="{ width: '50vw' }">
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
                  placeholder="Наименование рубрики"
                />
                <span class="error" v-if="$v['label'].$error">
                  {{ $v['label'].$errors[0].$message }}
                </span>
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
      <Dialog v-model:visible="visibleDel" header="Удалить рубрику" modal :style="{ width: '50vw' }">
        <h2>Вы уверены, что хотите удалить рубрику?</h2>
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

onMounted(async () => {
  await categoryStore.getAllRubricsAdmin(1);
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

    data.append('label', selectedItem.value.label);

    const result = await categoryStore.editRubrics(selectedItem.value.id, data);
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
  const params = { force: true };
  const result = await categoryStore.deleteRubrics(selectedItem.value.ids, params);

  toast.add({
    severity: errorValidate(result.status).toastType,
    summary: errorValidate(result.status).summary,
    detail: errorValidate(result.status).message,
    life: 3000,
  });

  selectedItem.value = {};
  if (visibleSoftDel.value) visibleSoftDel.value = !visibleSoftDel.value;
  if (visibleDel.value) visibleDel.value = !visibleDel.value;
}

function editProject(id, item) {
  selectedItem.value.label = item.label;
  selectedItem.value.id = id;
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
  document.querySelector(`.out-choose-image > img`).src = file.objectURL;
  selectedItem['file'] = file;
};
</script>
