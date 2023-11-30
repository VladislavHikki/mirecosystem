<template>
  <div class="adminsList container">
    <div class="adminControl_btns">
      <!--            <div class="adminControl_btns_item">-->
      <!--                <Button class="filter">ФИЛЬТРЫ</Button>-->
      <!--                <Button style="margin-top:15px;" class="deleteFilter">СБРОСИТЬ ФИЛЬТРЫ</Button>-->
      <!--            </div>-->
      <div class="adminControl_btns_item">
        <!--                <Button label="Primary" severity="info" style="width: 109px"-->
        <!--                    ><span style="margin-right: 5px" class="pi pi-search"></span>НАЙТИ</Button-->
        <!--                >-->
        <Button
          style="margin-top: 15px"
          label="Success"
          severity="success"
          @click="(visible = true), changeCurrAction('Добавить', addAdmin)"
          ><span style="margin-right: 5px" class="pi pi-plus"></span>ДОБАВИТЬ АДМИНИСТРАТОРА</Button
        >
      </div>
      <Toast />
      <Dialog modal header="Редактировать аватарку" v-model:visible="cropper_show">
        <UICropper
          @get-image="(cropper_show = false), (formData['image'] = $event?.file), (image = $event?.url)"
          :image="formData['image']"
          isAvatar
        />
      </Dialog>
      <Dialog v-model:visible="visible" modal :header="currentAction" :style="{ width: '50vw' }">
        <!-- Добавление админа -->
        <div class="wrap-modal">
          <div class="modal-window__container">
            <form method="post">
              <div class="form-input">
                <label for="">Фотография профиля</label>
                <div class="form-upload">
                  <div class="out-choose-image">
                    <img loading="lazy" :src="image" alt="" />
                  </div>
                  <FileUpload
                    mode="basic"
                    :auto="true"
                    name="demo[]"
                    accept="image/*"
                    customUpload
                    @uploader="customBase64Uploader"
                    chooseLabel="Загрузить"
                    @change="v$['image'].$touch"
                  />
                  <Button icon="pi pi-user-edit" label="Изменить" @click="cropper_show = true" />
                </div>
                <span class="error" v-if="v$['image'].$error">
                  {{ v$['image'].$errors[0].$message }}
                </span>
              </div>
              <div class="form__item">
                <InputText
                  v-model.trim="formData.login"
                  type="text"
                  placeholder="Имя пользователя"
                  @change="v$['login'].$touch"
                />
                <span class="error" v-if="v$['login'].$error">
                  {{ v$['login'].$errors[0].$message }}
                </span>
              </div>
              <div class="form-input">
                <label for="country">Страна</label>
                <Dropdown
                  name="country"
                  v-model="formData.country"
                  id="country"
                  placeholder="Выберите Страну"
                  :options="countryStore.all"
                  optionLabel="label"
                  @change="v$['country'].$touch"
                />
                <span class="error" v-if="v$['country'].$error">
                  {{ v$['country'].$errors[0].$message }}
                </span>
              </div>
              <div class="form-input">
                <label for="region">Регион</label>
                <Dropdown
                  name="region"
                  v-model="formData.region"
                  id="region"
                  placeholder="Выберите Регион"
                  :options="regionStore.all"
                  :disabled="!formData.country"
                  optionLabel="label"
                  @change="v$['region'].$touch"
                  filter
                />
                <span class="error" v-if="v$['region'].$error">
                  {{ v$['region'].$errors[0].$message }}
                </span>
              </div>
              <div class="form-input">
                <label for="city">Город</label>
                <Dropdown
                  name="city"
                  v-model="formData.city"
                  id="city"
                  placeholder="Выберите Город"
                  :options="cityStore.all"
                  :disabled="!formData.region"
                  optionLabel="label"
                  @change="v$['city'].$touch"
                  filter
                />
                <span class="error" v-if="v$['city'].$error">
                  {{ v$['city'].$errors[0].$message }}
                </span>
              </div>
              <div class="form__item">
                <InputText v-model.trim="formData.email" type="email" placeholder="E-mail" @change="v$['email'].$touch" />
                <span class="error" v-if="v$['email'].$error">
                  {{ v$['email'].$errors[0].$message }}
                </span>
              </div>
              <div class="form__item">
                <InputText
                  v-model.trim="formData.password"
                  type="password"
                  placeholder="Новый пароль"
                  @change="v$['password'].$touch"
                />
                <span class="error" v-if="v$['password'].$error">
                  {{ v$['password'].$errors[0].$message }}
                </span>
              </div>
              <div class="form__item">
                <InputText
                  v-model.trim="formData.password2"
                  type="password"
                  placeholder="Повторите пароль"
                  @change="v$['password2'].$touch"
                />
                <span class="error" v-if="v$['password2'].$error">
                  {{ v$['password2'].$errors[0].$message }}
                </span>
              </div>
            </form>
          </div>
        </div>
        <template #footer>
          <Button label="Сохранить" icon="pi pi-check" @click="submit" />
          <Button label="Отмена" icon="pi pi-times" @click="visible = false" />
        </template>
      </Dialog>
    </div>
    <div class="adminsList">
      <h2 class="page-subtitle">Администраторы</h2>
      <div class="adminsList_content">
        <DataTable
          :value="adminListStore.adminList?.users?.rows"
          v-model:filters="filters"
          v-model:selection="selectedAdmin"
        >
          <!--                    <column selection-mode="multiple" header=""></column>-->
          <template #header>
            <div class="flex justify-content-end">
              <span class="p-input-icon-left">
                <i class="pi pi-search" />
                <InputText @input="searchAdmin($event.target.value, 1)" placeholder="Поиск" />
              </span>
            </div>
          </template>

          <column field="email" header="E-MAIL"></column>
          <column header="Логин">
            <template #body="slotProps">
              <div v-html="getDescription(slotProps?.data?.login)" />
            </template>
          </column>
          <column field="name" header="Имя пользователя"></column>
          <Column field="actions" header="Действие">
            <template #body="slotProps">
              <!-- {{ slotProps.data.isAdminHelper }} -->
              <div class="category_content_btns">
                <Button @click="openDelAdmin(slotProps)" class="delete"></Button>
                <Button
                  v-if="!slotProps.data.isAdminHelper"
                  @click="toggle($event, slotProps.data.id)"
                  aria-haspopup="true"
                  class="other"
                  aria-controls="menu-action"
                />
                <Button
                  v-else
                  @click="toggleHelper($event, slotProps.data.id)"
                  aria-haspopup="true"
                  class="other"
                  aria-controls="menu-action-helper"
                />
                <Menu style="z-index: !important" ref="menu" id="menu-action" :model="menu__items" :popup="true" />
                <Menu
                  style="z-index: !important"
                  ref="menu_helper"
                  id="menu-action-helper"
                  :model="menuItemsHelper"
                  :popup="true"
                />
              </div>
            </template>
          </Column>
        </DataTable>

        <Dialog :draggable="false" v-model:visible="visibleDel" modal header="Удалить админа" :style="{ width: '50vw' }">
          <!-- <div style="margin-bottom: 20px;">Код удаления - {{ adminListStore.deleteToken }}</div> -->
          <InputText name="deleteCode" placeholder="Введите код удаления" v-model="deleteCode" />
          <p style="color: var(--error-text); font-size: 14px; margin-top: 10px" v-if="error && visibleDel">
            {{ error }}
          </p>
          <template #footer>
            <Button label="Удалить" icon="pi pi-check" @click="deleteAdmin(deleteCode)" />
            <Button label="Отмена" icon="pi pi-times" @click="visibleDel = false" />
          </template>
        </Dialog>
        <div class="adminsList_content_result">
          {{ declOfNum(adminListStore.adminList?.rows?.length, ['Показан', 'Показано', 'Показано']) }}
          {{ adminListStore?.adminList?.users?.count }}
          {{ declOfNum(adminListStore.adminList?.rows?.length, ['результат', 'результата', 'результатов']) }}
        </div>
      </div>

      <div class="pagination_btns">
        <Paginator
          v-if="adminListStore.adminList?.pages > 1"
          :template="{
            '640px': 'PrevPageLink CurrentPageReport NextPageLink',
            '960px': 'FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink',
            '1300px': 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink',
            default: 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink JumpToPageDropdown JumpToPageInput',
          }"
          v-model:first="page"
          :total-records="adminListStore.adminList?.pages"
          :rows="1"
          currentPageReportTemplate="{last} из {totalRecords}"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import addAdmin from '~~/components/modals/addAdmin.vue';
import { useAdminListStore } from '~/store/adminList';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { useCountryStore } from '~/store/country';
import { useRegionStore } from '~/store/region';
import { useCityStore } from '~/store/city';
import { useUserStore } from '~/store/user';
import { useVuelidate } from '@vuelidate/core';
import { email, helpers, required, sameAs } from '@vuelidate/validators';
import { useToast } from 'primevue/usetoast';
import { FilterMatchMode } from 'primevue/api';
import { useSocketStore } from '~/store/socket';

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});

const visible = ref(false);
const currentAction = ref(null);
const currentDialog = ref(null);
const selectedAdmin = ref(null);
const page = ref(0);
const countryStore = useCountryStore();
const regionStore = useRegionStore();
const cityStore = useCityStore();
const userListStore = useUserStore();
const toast = useToast();
const socket_store = useSocketStore();
const cropper_show = ref(false);

const changeCurrAction = (name, dialog) => {
  currentAction.value = name + ' администратора';
  currentDialog.value = dialog;
};
const adminListStore = useAdminListStore();
let visibleDel = ref(false);
let deleteCode = ref(null);
let delAdminId = ref(null);
let image = ref('/_nuxt/assets/images/avatar.svg')

await adminListStore.requestAdmins(1);

const customBase64Uploader = async (event) => {
  const file = event.files[0];
  image.value = file.objectURL;
  formData['image'] = file;
};

const menu = ref();
const menu_helper = ref();
let userId = null;
const menu__items = [
  { label: 'Сделать владельцем', command: toTrainer },
  { label: 'Сделать помощником', command: toHelper },
  { label: 'Забрать права админа', command: delRoleAdmin },
];
const menuItemsHelper = [
  { label: 'Сделать владельцем', command: toTrainer },
  { label: 'Снять статус помощника', command: delHelper },
  { label: 'Забирать права админа', command: delRoleAdmin },
];

const toggle = (event, id) => {
  menu.value.toggle(event);
  userId = id;
};

const toggleHelper = (event, id) => {
  menu_helper.value.toggle(event);
  userId = id;
};

const changePage = async (number) => {
  await adminListStore.requestAdmins(number);
};

function getDescription(txt) {
  if (txt) {
    let pattern = /https?:\/\/t.me\/\S+/g;
    let links = txt.match(pattern);
    let newStr = txt;
    if (links?.length) {
      links.forEach((link) => {
        let pattern = new RegExp(link, 'g');
        newStr = newStr.replace(pattern, `<a style="color: #2c96ea;" target="_blank" href="${link}">${link}</a>`);
      });
    }
    return newStr;
  }

  return txt;
}

async function searchAdmin(emit, role) {
  let params = ref({
    text: emit,
    role: role,
  });

  await adminListStore.searchAdmin(1, params.value);
}

async function toTrainer() {
  if (userId != null) {
    const formData = new FormData();
    formData.append('role', 2);
    const result = await userListStore.changeRole(userId, formData);
    changePage(page.value + 1);
    toast.add({
      severity: errorValidate(result).toastType,
      summary: errorValidate(result).summary,
      detail: errorValidate(result).message,
      life: 3000,
    });
    userId = null;
  }
}

async function toHelper() {
  if (userId) {
    const result = await adminListStore.toHelper(userId);
    changePage(page.value + 1);
    toast.add({
      severity: errorValidate(result).toastType,
      summary: errorValidate(result).summary,
      detail: errorValidate(result).message,
      life: 3000,
    });
    userId = null;
  }
}

async function delHelper() {
  if (userId) {
    const result = await adminListStore.delHelper(userId);
    changePage(page.value + 1);
    toast.add({
      severity: errorValidate(result).toastType,
      summary: errorValidate(result).summary,
      detail: errorValidate(result).message,
      life: 3000,
    });
    userId = null;
  }
}

async function delRoleAdmin() {
  if (userId) {
    const result = await adminListStore.delRole(userId, 1);
    changePage(page.value + 1);
    toast.add({
      severity: errorValidate(result).toastType,
      summary: errorValidate(result).summary,
      detail: errorValidate(result).message,
      life: 3000,
    });
    userId = null;
  }
}

onMounted(async () => {
  await countryStore.get();
});

watch(page, () => {
  changePage(page.value + 1);
});

function openDelAdmin(ids) {
  visibleDel.value = true;
  delAdminId.value = ids.data.id;
}

const formData = reactive({
  image: null,
  login: null,
  phone: null,
  telegram: null,
  country: null,
  region: null,
  city: null,
  email: null,
  password: null,
  password2: null,
});

watch(
  () => formData['country'],
  async () => {
    formData['region'] = null;
    formData['city'] = null;
    await regionStore.get(formData['country'].id);
  }
);

watch(
  () => formData['region'],
  async () => {
    formData['city'] = null;
    await cityStore.get(formData['region'].id);
  }
);

const rules = computed(() => {
  return {
    image: {
      required: helpers.withMessage('Обязательно', required),
    },
    login: {
      required: helpers.withMessage('Обязательно', required),
    },
    country: {
      required: helpers.withMessage('Обязательно', required),
    },
    region: {
      required: helpers.withMessage('Обязательно', required),
    },
    city: {
      required: helpers.withMessage('Обязательно', required),
    },
    email: {
      required: helpers.withMessage('Обязательно', required),
      email: helpers.withMessage('Некорректная почта', email),
    },
    password: {
      required: helpers.withMessage('Обязательно', required),
    },
    password2: {
      required: helpers.withMessage('Обязательно', required),
      sameAs: helpers.withMessage('Пароли не совпадают', sameAs(formData.password)),
    },
  };
});

const v$ = useVuelidate(rules, formData);

const submit = async () => {
  v$.value.$validate();
  if (!v$.value.$error) {
    let data = new FormData();
    data.append('file', formData.image);
    data.append('login', formData.telegram);
    data.append('password', formData.password);
    data.append('email', formData.email);
    data.append('phone', formData.phone);
    data.append('cityId', formData.city.id);
    data.append('name', formData.login);
    await adminListStore.createAdmin(data);
    changePage(page.value + 1);
    visible.value = false;
  }
};

let error = ref(null);

watch(visibleDel, () => {
  error.value = null;
});

async function deleteAdmin(code) {
  /* if(code) {
        adminListStore.requestDelToken();
        if(code == adminListStore.deleteToken.deleteToken) { */
  const form = new FormData();
  form.append('delToken', code);
  form.append('ids', delAdminId.value);
  let result = await adminListStore.deleteAdmin(form);
  toast.add({
    severity: errorValidate(result).toastType,
    summary: errorValidate(result).summary,
    detail: errorValidate(result).message,
    life: 3000,
  });
  changePage(page.value + 1);
  visibleDel.value = false;
  delAdminId.value = null;
}

const showDelAdminNot = () => {
  toast.add({ severity: 'success', summary: '', detail: 'Админ Удален', life: 3000 });
};
</script>

<style lang="scss">
.category_content_btns {
  display: flex;
  gap: 10px;
  .other {
    background: #2ca8ff !important;
    background-image: url(~/assets/images/other.png) !important;
    background-position: center center !important;
    background-repeat: no-repeat !important;
    // width: 32px !important;
    height: 32px !important;
  }
}
.adminsList {
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 100%;
  .delete {
    background: #f81111 !important;
    background-image: url(~/assets/images/delete.png) !important;
    background-position: center center !important;
    background-repeat: no-repeat !important;
    border: none;
  }
  .adminControl_btns {
    display: flex;
    width: 100%;
    justify-content: space-between;
    .adminControl_btns_item:nth-child(1) {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }
    .adminControl_btns_item:nth-child(2) {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      .find_btn {
        background: #2ca8ff;
        box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.25);
        border-radius: 7px;
        background-image: url(~/assets/images/find.png);
        background-repeat: no-repeat;
        background-position: left 10px center;
        padding-left: 40px;
        padding-right: 14px;
        width: 150px;
        align-self: flex-end;
      }
    }
  }
  .adminsList {
    h1 {
      margin-bottom: 20px;
    }
    width: 100%;
    background: #ffffff;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.25);
    border-radius: 7px;
    padding: 23px 48px;
    .adminsList_content {
      width: 100%;
      .adminsList_content_h {
        padding-left: 28px;
        min-width: 970px;
        width: 100%;
        display: flex;
        align-items: center;
        font-size: 15px;
        justify-content: space-between;
        padding-bottom: 20px;
        h2 {
          font-size: 15px;
          width: 20%;
          margin: 0;
        }
        color: #bbbbbb;
        input {
          width: 26px;
          height: 26px;
        }
      }
      .adminsList_content_info {
        width: 100%;
        overflow-x: auto;
        .adminsList_content_info_item {
          min-width: 970px;
          display: flex;
          padding: 20px 0;
          padding-left: 28px;
          border-bottom: 1px solid #d9d9d9;
          border-top: 1px solid #d9d9d9;
          width: 100%;
          justify-content: space-between;
          align-items: center;
          font-size: 15px;
          color: #989898;
          background-color: #f6f6f6;
          .email {
            color: #2ca8ff;
            width: 14.2%;
          }
          .email,
          .userName,
          .realName,
          .list_operation {
            width: 20%;
          }
          input {
            width: 26px;
            height: 26px;
          }
          .adminsList_operation {
            width: 20%;
            display: flex;
            gap: 10px;
            padding-right: 104px;
          }
        }
        .adminsList_content_info_item:nth-child(2n) {
          background-color: white;
          border: none;
        }
      }
      .adminsList_content_result {
        margin-top: 26px;
        font-size: 15px;
        color: #bbbbbb;
      }
    }
  }
}
.filter {
  border: 1px solid #2ca8ff;
  filter: drop-shadow(0px 2px 5px rgba(0, 0, 0, 0.25));
  border-radius: 7px;
  background: transparent;
  color: #2ca8ff;
  box-shadow: none;
}
.deleteFilter {
  border: 1px solid #f44336;
  filter: drop-shadow(0px 2px 5px rgba(0, 0, 0, 0.25));
  border-radius: 7px;
  background: transparent;
  color: #f44336;
  box-shadow: none;
}

.delete {
  width: 32px;
  height: 32px;
  border-radius: 5px;
  text-align: center;
  margin: 0;
  padding-left: 5px;
  padding-right: 5px;
  background: #f81111;
  background-image: url(~/assets/images/delete.png);
  background-repeat: no-repeat;
  background-position: center center;
  padding: 0;
}
.adminRed {
  width: 32px;
  height: 32px;
  border-radius: 5px;
  text-align: center;
  margin: 0;
  padding-left: 5px;
  padding-right: 5px;
  padding: 8px 0px;
}

.adminRed {
  background-color: #ff8a00;
  background-image: url(~/assets/images/pen.png);
  background-repeat: no-repeat;
  background-position: center center;
}
@media (max-width: $x-small) {
  .adminControl_btns {
    flex-direction: column;
    gap: 20px;
    .adminControl_btns_item {
      align-items: flex-start !important;
    }
  }
}
</style>
