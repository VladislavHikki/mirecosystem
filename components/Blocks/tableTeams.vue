<template>
  <div class="category_container">
    <Dialog modal header="Редактировать аватарку" v-model:visible="cropper_show">
      <UICropper
        @get-image="(cropper_show = false), (selectedItem.image = $event?.file), (image = $event?.url)"
        :image="image"
        isAvatar
      />
    </Dialog>
    <h1>Команды: {{ teamStore?.teams?.teams?.count }}</h1>
    <Toast />
    <div class="category_elements">
      <!-- <div class="category_item" 
                    v-for="(value, index) in teamStore?.teams?.teams?.rows" :key="index"
                >
                    <button class="move_object" style="margin-top:0px;" @click="SetOrderObject(index)"></button>
                    <div class="category_item_content">
                        <div class="category_content_item">
                            <button style="margin-top:0px"> </button>
                            <div class="name">{{ value.label }}</div>
                        </div>
                        <div class="category_content_btns">
                            <Button @click="OpenDialog()" class="red"></Button>
                            <Button class="pause"></Button>
                            <Button class="delete"></Button>
                        </div>
                    </div>
                </div> -->
      <DataTable :value="teamStore?.teams?.teams?.rows" tableStyle="min-width: 50rem">
        <template #header>
          <div class="flex justify-content-end">
            <span class="p-input-icon-left">
              <i class="pi pi-search" />
              <InputText v-model="txtTeams" @input="getTeam" placeholder="Поиск" />
            </span>
          </div>
        </template>
        <Column field="label" header="Название"></Column>
        <Column field="user.name" header="Владелец"></Column>
        <Column field="subsectionLabel" header="Дивизион"></Column>
        <Column field="description" header="Описание"></Column>
        <Column field="createdAt" header="Дата создания">
          <template #body="slotProps">
            {{ new Date(slotProps.data.createdAt).toLocaleString() }}
          </template>
        </Column>
        <Column header="Действия">
          <template #body="slotProps">
            <div class="category_content_btns">
              <Button @click="editTeam(slotProps.data.id, slotProps.data)" class="red"></Button>
              <!--                            <Button @click="softDeleteInstall(slotProps.data.id, false)" class="pause"></Button>-->
              <Button @click="deleteInstall(slotProps.data.id, true)" class="delete"></Button>
            </div>
          </template>
        </Column>
      </DataTable>
      <Dialog v-model:visible="visible" header="Редактировать команду" modal :style="{ width: '50vw' }">
        <div class="modal-window__container">
          <form method="post">
            <div class="form__item">
              <InputText
                v-model="selectedItem.label"
                :value="selectedItem.label"
                type="text"
                placeholder="Наименование команды"
                :class="{ 'p-invalid': $v['label'].$error }"
                @change="$v['label'].$touch"
              />
              <span class="error" v-if="$v['label'].$error">
                {{ $v['label'].$errors[0].$message }}
              </span>
            </div>
            <div class="form__item">
              <Dropdown
                v-model="selectedItem.userId"
                option-label="label"
                option-value="value"
                :options="userStore?.trainers"
                placeholder="Владелец"
                filter
                empty-filter-message="Нет результатов"
              />
            </div>
            <div class="form__item">
              <Dropdown
                v-model="selectedItem.subSectionId"
                option-label="label"
                option-value="id"
                :options="categoryStore?.subsectionsList"
                placeholder="Дивизион"
                @change="check('subsection')"
              />
            </div>
            <div class="form__item">
              <Dropdown
                option-label="label"
                option-value="id"
                v-model="selectedItem['type']"
                :options="typeArr"
                placeholder="Тип"
              />
            </div>
            <div class="form__item">
              <div class="form-upload">
                <!-- <div class="out-choose-image">
                  <img loading="lazy"  width="100" height="100" :src="image" alt="" />
                </div> -->
                <div class="out-choose-image">
                  <img
                    class="team-picture"
                    v-if="selectedItem['type'] == 0"
                    loading="lazy"
                    width="100"
                    height="100"
                    :src="image"
                    alt=""
                  />
                  <div
                    v-else-if="selectedItem['type'] == 1"
                    class="avatar-elite"
                    style="
                      width: 110px;
                      height: 110px;
                      background-image: url(/border.png);
                      background-position: center;
                      background-size: cover;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                    "
                  >
                    <img class="team-picture avatar" style="width: 80px; height: 80px" :src="image" alt="" />
                  </div>
                </div>
                <FileUpload
                  accept=".jpg, .png, .jpeg"
                  mode="basic"
                  :auto="true"
                  v-model="selectedItem.image"
                  customUpload
                  @uploader="customBase64UploaderTeam"
                  chooseLabel="Загрузить"
                />
                <Button icon="pi pi-user-edit" label="Изменить" @click="cropper_show = true" />
              </div>
            </div>
            <div class="form__item">
              <Textarea
                v-model="selectedItem.description"
                :value="selectedItem.description"
                placeholder="Описание"
                rows="5"
                cols="45"
              />

              <!-- <span class="error" v-if="$v['description'].$error">
                  {{ $v['description'].$errors[0].$message }}
                </span> -->
            </div>
          </form>
        </div>
        <template #footer>
          <Button label="Сохранить" icon="pi pi-check" @click="submit()" />
          <Button label="Отмена" icon="pi pi-times" @click="visible = false" />
        </template>
      </Dialog>
      <!-- <Dialog v-model:visible="visibleSoftDel" header="Приостановить проект" modal :style="{ width: '50vw' }">
                <h2>Вы уверены, что хотите приостановить команду?</h2>
                <template #footer>
                    <Button label="Приостановить" icon="pi pi-check" @click="deleteInstallFunction()" />
                    <Button label="Отмена" icon="pi pi-times" @click="visibleSoftDel = false" />
                </template>
            </Dialog> -->
      <Dialog v-model:visible="visibleDel" header="Удалить команду" modal :style="{ width: '50vw' }">
        <h2>Вы уверены, что хотите удалить команду?</h2>
        <template #footer>
          <Button label="Удалить" icon="pi pi-check" @click="deleteInstallFunction()" />
          <Button label="Отмена" icon="pi pi-times" @click="visibleDel = false" />
        </template>
      </Dialog>
    </div>
    <div class="pagination_btns">
      <Paginator
        v-if="teamStore.getTeams?.pages > 1"
        :template="{
          '640px': 'PrevPageLink CurrentPageReport NextPageLink',
          '960px': 'FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink',
          '1300px': 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink',
          default: 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink JumpToPageDropdown JumpToPageInput',
        }"
        v-model:first="page"
        :total-records="teamStore.getTeams?.pages"
        :rows="1"
        currentPageReportTemplate="{last} из {totalRecords}"
      />
    </div>
  </div>
</template>

<script setup>
import { useVuelidate } from '@vuelidate/core';
import { required, helpers } from '@vuelidate/validators';
import { useTeamStore } from '~/store/team';
import { useAdminListStore } from '~/store/adminList';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import EditTeam from '~~/components/modals/editTeam.vue';
import { getSortWhereLabel } from '@/store/sort';
import { useToast } from 'primevue/usetoast';
import { useCategoryStore } from '~/store/category';
import { useUserStore } from '@/store/user';

const toast = useToast();
const page = ref(0);
const image = ref('@/assets/avatar.svg');
const teamStore = useTeamStore();
const visibleSoftDel = ref(false);
const visibleDel = ref(false);
const visible = ref(false);
const selectedItem = ref({});
const adminListStore = useAdminListStore();
const userStore = useUserStore();
const rules = computed(() => {
  return {
    label: {
      required: helpers.withMessage('Введите название', required),
    },
    // description: {
    //   required: helpers.withMessage('Введите описание', required),
    // },
    type: {
      required: helpers.withMessage('Укажите тип', required),
    },
  };
});
const $v = useVuelidate(rules, selectedItem);
let txtTeams = ref('');
const cropper_show = ref(false);

async function getTeam() {
  page.value = 0;
  await teamStore.searchTeams(1, { txt: txtTeams.value, amount: 25 });
}

const selectPageResource = async (number) => {
  await teamStore.searchTeams(number, { txt: txtTeams.value, amount: 25 });
};

watch(page, () => {
  selectPageResource(page.value + 1);
});

const categoryStore = useCategoryStore();
await categoryStore.requestListSubsections();
await userStore.requestTrainerList();

onMounted(async () => {
  await adminListStore.requestAdminList();
});

onMounted(async () => {
  await teamStore.requestTeams(page.value + 1);
});

const selectPage = async (number) => {
  await teamStore.requestTeams(number);
};

watch(page, () => {
  selectPage(page.value + 1);
});

const customBase64UploaderTeam = (event) => {
  const file = event.files[0];
  selectedItem.value.image = file;
  image.value = file.objectURL;
};

async function submit() {
  $v.value.$validate();
  if ($v.value.$error == 0) {
    const data = new FormData();
    typeof selectedItem.value.image == 'object' ? data.append('file', selectedItem.value.image) : data.append('file', null);

    if (selectedItem.value.label) data.append('label', selectedItem.value.label);
    if (selectedItem.value.userId) data.append('userId', selectedItem.value.userId);
    if (selectedItem.value.subSectionId) data.append('subsectionId', selectedItem.value.subSectionId);
    data.append('description', selectedItem.value.description);
    if (selectedItem.value.type || selectedItem.value.type == 0) data.append('type', selectedItem.value.type);

    const result = await teamStore.updateTeam(selectedItem.value.id, data, page.value + 1);

    toast.add({
      severity: errorValidate(result).toastType,
      summary: errorValidate(result).summary,
      detail: errorValidate(result).message,
      life: 3000,
    });

    selectedItem.value = {};
    visible.value = !visible.value;
    await userStore.requestTrainerList();
  }
}

/* function getTrainers(arr) {
    let newArr = [];
    for(let i = 0; i < arr?.length; ++i) {
        if(!arr[i].team)
            newArr.push(arr[i]);
    }
    return newArr;
}

function getTrainersEdit(arr, id) {
    let newArr = [];
    for(let i = 0; i < arr?.length; ++i) {
        if(!arr[i].team || id == arr[i].value)
            newArr.push(arr[i]);
    }
    return newArr;
} */

async function deleteInstallFunction() {
  const data = new FormData();
  data.append('ids', selectedItem.value.ids);
  selectedItem.value.force ? data.append('force', selectedItem.value.force) : null;

  const result = await teamStore.deleteTeam(data, page.value + 1);

  toast.add({
    severity: errorValidate(result).toastType,
    summary: errorValidate(result).summary,
    detail: errorValidate(result).message,
    life: 3000,
  });
  await userStore.requestTrainerList();
  selectedItem.value = {};
  if (visibleSoftDel.value) visibleSoftDel.value = !visibleSoftDel.value;
  if (visibleDel.value) visibleDel.value = !visibleDel.value;
}

function editTeam(id, item) {
  selectedItem.value.label = item?.label;
  selectedItem.value.description = item?.description;
  selectedItem.value.userId = item?.user?.id;
  selectedItem.value.subSectionId = item?.subsectionId;
  selectedItem.value.image = item?.picture;
  selectedItem.value.id = id;
  selectedItem.value.type = item?.type;

  visible.value = !visible.value;

  image.value = getImageUrl(selectedItem.value.image);
}

function softDeleteInstall(ids, force = false) {
  selectedItem.value.ids = ids;
  selectedItem.value.force = force;
  visibleSoftDel.value = !visibleSoftDel.value;
}

function deleteInstall(ids) {
  selectedItem.value.ids = ids;
  visibleDel.value = !visibleDel.value;
}

function check(inputName) {
  if (inputName == 'subsection') {
    selectedItem.value.subSectionId = item.subsectionId;
  }
}

const typeArr = [
  { id: 0, label: 'Обычная' },
  { id: 1, label: 'Элитная' },
];
</script>
<style lang="scss">
.error {
  color: var(--error-text);
  font-size: 14px;
  margin-left: 15px;
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
