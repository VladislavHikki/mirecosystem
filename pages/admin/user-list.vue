<template>
  <div class="userList container">
    <div class="adminControl_btns">
      <!--            <div class="adminControl_btns_item">-->
      <!--                <Button class="filter">ФИЛЬТРЫ</Button>-->
      <!--                <Button style="margin-top:15px;" class="deleteFilter">СБРОСИТЬ ФИЛЬТРЫ</Button>-->
      <!--            </div>-->
      <div class="adminControl_btns_item">
        <!--                <Button label="Primary" severity="info" style="width:109px;"><span style="margin-right:5px;" class="pi pi-search"></span>НАЙТИ</Button>-->
        <!--                <Button-->
        <!--                    style="margin-top: 15px"-->
        <!--                    label="Success"-->
        <!--                    severity="success"-->
        <!--                    @click=";(visible = true), changeCurrAction('Добавить', addUser)"-->
        <!--                    ><span style="margin-right: 5px" class="pi pi-plus"></span>Добавить-->
        <!--                    пользователя</Button-->
        <!--                >-->
      </div>
    </div>
    <div class="userList_container">
      <TabView v-model:activeIndex="tab">
        <TabPanel header="Пользователи">
          <Dialog v-model:visible="viewUser" :draggable="false" modal header="Информация о пользователе">
            <ModalsViewUser :data="viewUserData" />
          </Dialog>
          <h1>Пользователи: {{ userListStore?.userList?.users?.count }}</h1>
          <DataTable
            table-style="width: 100%"
            v-model:selection="selectedUser"
            :value="userListStore?.userList?.users?.rows"
            v-model:filters="filters"
          >
            <template #header>
              <div class="flex justify-content-end">
                <span class="p-input-icon-left">
                  <i class="pi pi-search" />
                  <InputText v-model="findUserText" placeholder="Поиск" />
                </span>
              </div>
            </template>
            <Column field="avatar" header="Фото">
              <template #body="{ data }">
                <img
                  loading="lazy"
                  width="100"
                  height="100"
                  style="border-radius: 50%; object-fit: contain"
                  :src="`${url}/api/public${data?.avatar}`"
                  alt=""
                />
              </template>
            </Column>
            <Column field="name" header="Имя">
              <template #body="{ data }">
                <NuxtLink :to="`/profile/${data.id}`" target="_blank">
                  {{ data.name }}
                </NuxtLink>
                <Chip style="cursor: pointer" @click="copyUser(data.name)" class="chip" icon="pi pi-copy" label="" />
              </template>
            </Column>
            <Column field="email" header="E-MAIL">
              <template #body="{ data }">
                {{ data.email }}
                <Chip style="cursor: pointer" @click="copyUser(data.email)" class="chip" icon="pi pi-copy" label="" />
              </template>
            </Column>
            <!-- <Column field="login" header="Телеграм">
              <template #body="telegram">
                <div v-html="getDescription(telegram?.data?.login)" />
              </template>
            </Column> -->
            <Column field="createdAt" dataType="date" header="ЗАРЕГИСТРИРОВАН">
              <template #body="{ data }">
                {{ new Date(data.createdAt).toLocaleString() ?? '' }}
              </template>
            </Column>
            <Column field="actions" header="Действие">
              <template #body="slotProps">
                1<div class="category_content_btns">
                  <!--                                        <Button @click="editUser(slotProps.data.id, slotProps.data)" class="red"></Button>-->
                  <Button @click="openDelUser(slotProps)" class="delete"></Button>
                  <!-- <Button @click="imgUser(slotProps.data.id, true)" class="picture"></Button> -->
                  <Button
                    @click="toggle($event, slotProps.data.id)"
                    aria-haspopup="true"
                    class="other"
                    aria-controls="menu-action"
                  ></Button>
                  <Button
                    severity="success"
                    aria-haspopup="true"
                    aria-controls="menu-action"
                    icon="pi pi-eye"
                    @click="(viewUser = true), (viewUserData = slotProps.data)"
                  />
                  <Menu style="z-index: 2 !important" ref="menu" id="menu-action" :model="menu__items" :popup="true" />
                </div>
              </template>
            </Column>
          </DataTable>
          <div class="pagination_btns">
            <Paginator
              v-if="userListStore?.userList?.pages > 1"
              :template="{
                '640px': 'PrevPageLink CurrentPageReport NextPageLink',
                '960px': 'FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink',
                '1300px': 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink',
                default: 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink JumpToPageDropdown JumpToPageInput',
              }"
              v-model:first="page"
              :total-records="userListStore?.userList?.pages"
              :rows="1"
              currentPageReportTemplate="{last} из {totalRecords}"
            />
          </div>
          <div class="userList_content_result">
            {{ declOfNum(userListStore.userList.users.rows.length, ['Показан', 'Показано', 'Показано']) }}
            {{ userListStore.userList.users.rows.length }}
            {{ declOfNum(userListStore.userList.users.rows.length, ['результат', 'результата', 'результатов']) }}
          </div>
        </TabPanel>
        <TabPanel header="Владельцы">
          <h1>Владельцы: {{ trainerStore?.trainerList?.users?.count }}</h1>
          <DataTable
            table-style="width: 100%"
            v-model:selection="selectedTrainer"
            :value="trainerStore?.trainerList?.users?.rows"
            v-model:filters="filters"
          >
            <template #header>
              <div class="flex justify-content-end">
                <span class="p-input-icon-left">
                  <i class="pi pi-search" />
                  <InputText @input="searchUser($event.target.value, 2)" placeholder="Поиск" />
                </span>
              </div>
            </template>
            <Column field="avatar" header="Фото">
              <template #body="{ data }">
                <img
                  loading="lazy"
                  width="100"
                  height="100"
                  style="border-radius: 50%; object-fit: contain"
                  :src="`${url}/api/public${data?.avatar}`"
                  alt=""
                />
              </template>
            </Column>
            <Column field="email" header="E-MAIL">
              <template #body="{ data }">
                {{ data.email }}
                <Chip style="cursor: pointer" @click="copyUser(data.email)" class="chip" icon="pi pi-copy" label="" />
              </template>
            </Column>
            <Column field="name" header="Имя">
              <template #body="{ data }">
                <NuxtLink :to="`/profile/${data.id}`" target="_blank">
                  {{ data.name }}
                </NuxtLink>
                <Chip style="cursor: pointer" @click="copyUser(data.name)" class="chip" icon="pi pi-copy" label="" />
              </template>
            </Column>

            <Column field="createdAt" dataType="date" header="ЗАРЕГИСТРИРОВАН">
              <template #body="{ data }">
                {{ new Date(data.createdAt).toLocaleString() ?? '' }}
              </template>
            </Column>
            <Column field="actions" header="Действие">
              <template #body="slotProps">
                <div class="category_content_btns">
                  <!--                                        <Button @click="editUser(slotProps.data.id, slotProps.data)" class="red"></Button>-->
                  <Button @click="openDelUser(slotProps)" class="delete"></Button>
                  <!-- <Button @click="imgUser(slotProps.data.id, true)" class="picture"></Button> -->
                  <Button
                    @click="trainerToggle($event, slotProps.data.id)"
                    aria-haspopup="true"
                    class="other"
                    aria-controls="menu-action"
                  />
                  <Button
                    severity="success"
                    aria-haspopup="true"
                    aria-controls="menu-action"
                    icon="pi pi-eye"
                    @click="(viewUser = true), (viewUserData = slotProps.data)"
                  />
                  <Menu
                    style="z-index: 2 !important"
                    ref="trainerMenu"
                    id="menu-action"
                    :model="trainerMenuItems"
                    :popup="true"
                  />
                </div>
              </template>
            </Column>
          </DataTable>
          <Dialog
            v-model:visible="addGourenge"
            :draggable="false"
            header="Выбрать подопечного"
            modal
            :style="{ width: '50vw' }"
          >
            <div class="selectSponsor">
              <Listbox
                v-model="selectedSponsor"
                :options="sponsors"
                filter
                optionLabel="name"
                listStyle="max-height:250px"
                class="w-full md:w-14rem selectSponsor_select"
                empty-filter-message="Нет результатов"
              />
              <Button label="Выбрать" @click="chooseSponsor" severity="success" />
            </div>
          </Dialog>
          <div class="pagination_btns">
            <Paginator
              v-if="trainerStore?.trainerList?.pages > 1"
              :template="{
                '640px': 'PrevPageLink CurrentPageReport NextPageLink',
                '960px': 'FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink',
                '1300px': 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink',
                default: 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink JumpToPageDropdown JumpToPageInput',
              }"
              v-model:first="pageTrainer"
              :total-records="trainerStore?.trainerList?.pages"
              :rows="1"
              currentPageReportTemplate="{last} из {totalRecords}"
            />
          </div>
          <div class="userList_content_result">
            {{ declOfNum(trainerStore?.trainerList?.users?.count, ['Показан', 'Показано', 'Показано']) }}
            {{ trainerStore?.trainerList?.users?.count }}
            {{ declOfNum(trainerStore?.trainerList?.users?.count, ['результат', 'результата', 'результатов']) }}
          </div>
        </TabPanel>
        <TabPanel header="Кураторы">
          <h1>Кураторы: {{ userListStore?.tutors?.curators?.count }}</h1>
          <DataTable
            table-style="width: 100%"
            v-model:selection="selectedTrainer"
            :value="userListStore?.tutors?.curators?.rows"
            v-model:filters="filters"
          >
            <template #header>
              <div class="flex justify-content-end">
                <span class="p-input-icon-left">
                  <i class="pi pi-search" />
                  <InputText @input="searchTutors($event.target.value)" placeholder="Поиск" />
                </span>
              </div>
            </template>
            <Column field="avatar" header="Фото">
              <template #body="{ data }">
                <img
                  loading="lazy"
                  width="100"
                  height="100"
                  style="border-radius: 50%; object-fit: contain"
                  :src="`${url}/api/public${data?.avatar}`"
                  alt=""
                />
              </template>
            </Column>
            <Column field="email" header="E-MAIL">
              <template #body="{ data }">
                {{ data.email }}
                <Chip style="cursor: pointer" @click="copyUser(data.email)" class="chip" icon="pi pi-copy" label="" />
              </template>
            </Column>
            <Column field="name" header="Имя">
              <template #body="{ data }">
                <NuxtLink :to="`/profile/${data.id}`" target="_blank">
                  {{ data.name }}
                </NuxtLink>
                <Chip style="cursor: pointer" @click="copyUser(data.name)" class="chip" icon="pi pi-copy" label="" />
              </template>
            </Column>
            <!-- <Column field="login" header="Телеграм">
              <template #body="telegram">
                <div v-html="getDescription(telegram?.data?.login)" />
              </template>
            </Column> -->
            <Column field="actions" header="Действие">
              <template #body="slotProps">
                <div class="category_content_btns">
                  <!--                                        <Button @click="editUser(slotProps.data.id, slotProps.data)" class="red"></Button>-->
                  <Button @click="openDelUser(slotProps)" class="delete"></Button>
                  <!-- <Button @click="imgUser(slotProps.data.id, true)" class="picture"></Button> -->
                  <Button
                    @click="tutorsToggle($event, slotProps.data.id)"
                    aria-haspopup="true"
                    class="other"
                    aria-controls="menu-action"
                  />
                  <Button
                    severity="success"
                    aria-haspopup="true"
                    aria-controls="menu-action"
                    icon="pi pi-eye"
                    @click="(viewUser = true), (viewUserData = slotProps.data)"
                  />
                  <Menu style="z-index: 2 !important" ref="tutorsMenu" id="menu-action" :model="tutorsMenuItems" popup />
                </div>
              </template>
            </Column>
          </DataTable>
          <div class="userList_content_result">
            {{ declOfNum(userListStore?.tutors?.curators?.rows?.length, ['Показан', 'Показано', 'Показано']) }}
            {{ userListStore?.tutors?.curators?.rows?.length }}
            {{ declOfNum(userListStore?.tutors?.curators?.rows?.length, ['результат', 'результата', 'результатов']) }}
          </div>
          <div class="pagination_btns">
            <Paginator
              v-if="userListStore?.tutors?.pages > 1"
              :template="{
                '640px': 'PrevPageLink CurrentPageReport NextPageLink',
                '960px': 'FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink',
                '1300px': 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink',
                default: 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink JumpToPageDropdown JumpToPageInput',
              }"
              v-model:first="pageTutors"
              :total-records="userListStore?.tutors?.pages"
              :rows="1"
              currentPageReportTemplate="{last} из {totalRecords}"
            />
          </div>
        </TabPanel>
        <TabPanel header="Спонсоры">
          <h1>Спонсоры: {{ sponsorsByAdmin?.data?.spCount }}</h1>
          <DataTable v-model:expandedRows="expandedRows" :value="sponsorsByAdmin.data.sponsorProfile">
            <template #header>
              <div class="flex justify-content-end">
                <span class="p-input-icon-left">
                  <i class="pi pi-search" />
                  <InputText @input="searchSponsors($event.target.value)" placeholder="Поиск" />
                </span>
              </div>
            </template>
            <Column v-model="expandedRows" expander style="width: 5rem" />
            <Column field="avatar" header="Фото">
              <template #body="{ data }">
                <img
                  loading="lazy"
                  width="100"
                  height="100"
                  style="border-radius: 50%; object-fit: contain"
                  :src="`${url}/api/public${data?.avatar}`"
                  alt=""
                />
              </template>
            </Column>
            <Column field="name" header="Спонсор">
              <template #body="{ data }">
                <NuxtLink :to="`/profile/${data.id}`" target="_blank">
                  {{ data.name }}
                </NuxtLink>
                <Chip style="cursor: pointer" @click="copyUser(data.name)" class="chip" icon="pi pi-copy" label="" />
              </template>
            </Column>
            <Column field="actions" header="Действие">
              <template #body="slotProps">
                <div class="category_content_btns">
                  <Button
                    severity="success"
                    aria-haspopup="true"
                    aria-controls="menu-action"
                    icon="pi pi-eye"
                    @click="(viewUser = true), (viewUserData = slotProps.data)"
                  />
                </div>
              </template>
            </Column>
            <!-- <Column header="Телеграм">
              <template #body="telegram">
                <div v-html="getDescription(telegram?.data?.login)" />
              </template>
            </Column> -->
            <template #expansion="slotProps">
              <div class="p-3">
                <DataTable :value="slotProps.data.sponsor">
                  <Column field="avatar" header="Фото">
                    <template #body="{ data }">
                      <img
                        loading="lazy"
                        width="100"
                        height="100"
                        style="border-radius: 50%; object-fit: contain"
                        :src="`${url}/api/public${data?.avatar}`"
                        alt=""
                      />
                    </template>
                  </Column>
                  <Column field="name" header="Подопечные">
                    <template #body="{ data }">
                      <NuxtLink :to="`/profile/${data.id}`" target="_blank">
                        {{ data.name }}
                      </NuxtLink>
                      <Chip style="cursor: pointer" @click="copyUser(data.name)" class="chip" icon="pi pi-copy" label="" />
                    </template>
                  </Column>

                  <!-- <Column field="login" header="Телеграм">
                    <template #body="telegram">
                      <div v-html="getDescription(telegram?.data?.login)" />
                    </template>
                  </Column> -->

                  <Column field="createdAt" header="Дата">
                    <template #body="{ data }">
                      {{ new Date(data.createdAt).toLocaleString() ?? '' }}
                    </template>
                  </Column>
                  <Column field="createdAt" header="Действия">
                    <template #body="slotProps">
                      <div class="category_content_btns">
                        <Button @click="delete_student(slotProps?.data?.id)" class="delete"></Button>
                        <Button
                          severity="success"
                          aria-haspopup="true"
                          aria-controls="menu-action"
                          icon="pi pi-eye"
                          @click="(viewUser = true), (viewUserData = slotProps.data)"
                        />
                      </div>
                    </template>
                  </Column>
                </DataTable>
              </div>
            </template>
          </DataTable>
          <div class="userList_content_result">
            {{ declOfNum(sponsorsByAdmin?.data?.spCount, ['Показан', 'Показано', 'Показано']) }}
            {{ sponsorsByAdmin?.data?.spCount }}
            {{ declOfNum(sponsorsByAdmin?.data?.spCount, ['результат', 'результата', 'результатов']) }}
          </div>
          <div class="pagination_btns">
            <Paginator
              v-if="sponsorsByAdmin?.data?.pages > 1"
              :template="{
                '640px': 'PrevPageLink CurrentPageReport NextPageLink',
                '960px': 'FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink',
                '1300px': 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink',
                default: 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink JumpToPageDropdown JumpToPageInput',
              }"
              v-model:first="pageSponsor"
              :total-records="sponsorsByAdmin?.data?.pages"
              :rows="1"
              currentPageReportTemplate="{last} из {totalRecords}"
            />
          </div>
        </TabPanel>
        <TabPanel header="Подопечные">
          <h1>Подопечные: {{ userListStore?.students?.count }}</h1>
          <DataTable
            table-style="width: 100%"
            v-model:selection="selectedTrainer"
            :value="userListStore?.students?.students"
            v-model:filters="filters"
          >
            <template #header>
              <div class="flex justify-content-end">
                <span class="p-input-icon-left">
                  <i class="pi pi-search" />
                  <InputText @input="searchStudents($event.target.value)" placeholder="Поиск" />
                </span>
              </div>
            </template>
            <Column field="avatar" header="Фото">
              <template #body="{ data }">
                <img
                  loading="lazy"
                  width="100"
                  height="100"
                  style="border-radius: 50%; object-fit: contain"
                  :src="`${url}/api/public${data?.avatar}`"
                  alt=""
                />
              </template>
            </Column>
            <Column field="name" header="Подопечный">
              <template #body="{ data }">
                <NuxtLink :to="`/profile/${data.id}`" target="_blank">
                  {{ data.name }}
                </NuxtLink>
                <Chip style="cursor: pointer" @click="copyUser(data.name)" class="chip" icon="pi pi-copy" label="" />
              </template>
            </Column>
            <Column header="Спонсор">
              <template #body="slotProps">
                {{ slotProps.data.user[0].name }}
                <Chip
                  style="cursor: pointer"
                  @click="copyUser(slotProps.data.user[0].name)"
                  class="chip"
                  icon="pi pi-copy"
                  label=""
                />
              </template>
            </Column>
            <Column header="Дата">
              <template #body="slotProps">
                {{ new Date(slotProps.data.user[0].user_sponsors.createdAt).toLocaleString() ?? '' }}
              </template>
            </Column>
            <Column field="actions" header="Действие">
              <template #body="slotProps">
                <div class="category_content_btns">
                  <Button
                    severity="success"
                    aria-haspopup="true"
                    aria-controls="menu-action"
                    icon="pi pi-eye"
                    @click="(viewUser = true), (viewUserData = slotProps.data)"
                  />
                </div>
              </template>
            </Column>
          </DataTable>
          <div class="userList_content_result">
            {{ declOfNum(userListStore?.students?.count, ['Показан', 'Показано', 'Показано']) }}
            {{ userListStore?.students?.count }}
            {{ declOfNum(userListStore?.students?.count, ['результат', 'результата', 'результатов']) }}
          </div>
          <div class="pagination_btns">
            <Paginator
              v-if="userListStore?.students?.pages > 1"
              :template="{
                '640px': 'PrevPageLink CurrentPageReport NextPageLink',
                '960px': 'FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink',
                '1300px': 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink',
                default: 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink JumpToPageDropdown JumpToPageInput',
              }"
              v-model:first="pageStudents"
              :total-records="userListStore?.students?.pages"
              :rows="1"
              currentPageReportTemplate="{last} из {totalRecords}"
            />
          </div>
        </TabPanel>
      </TabView>
      <Toast />
      <Dialog :draggable="false" v-model:visible="visibleDel" modal header="Удалить пользователя" :style="{ width: '50vw' }">
        <h2>Вы действительно хотите удалить пользователя и все его ресурсы?</h2>
        <!-- <div style="margin-bottom: 20px;">Код удаления - {{ adminListStore.deleteToken.deleteToken }}</div> -->
        <InputText name="deleteCode" placeholder="Введите код удаления" v-model="deleteCode" />
        <p style="color: var(--error-text); font-size: 14px; margin-top: 10px" v-if="error && visibleDel">
          {{ error }}
        </p>
        <template #footer>
          <Button label="Удалить" icon="pi pi-check" @click="deleteUserFunction()" />
          <Button label="Отмена" icon="pi pi-times" @click="visibleDel = false" />
        </template>
      </Dialog>
    </div>
  </div>
</template>

<script setup>
import url from '~~/store/config';
import Chip from 'primevue/chip';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import { useUserStore } from '~~/store/user';
import addUser from '~~/components/modals/addUser.vue';
import editUser from '~~/components/modals/editUser.vue';
import { useTrainerStore } from '~/store/trainerList';
import { useToast } from 'primevue/usetoast';
import { useAdminListStore } from '~/store/adminList';
import { FilterMatchMode } from 'primevue/api';
import {useSocketStore} from "~/store/socket";

const toast = useToast();
const page = ref(0);
const pageSponsor = ref(0);
const pageTutors = ref(0);
const pageTrainer = ref(0);
const pageStudents = ref(0);
const visibleDel = ref(false);
const currentAction = ref(null);
const currentDialog = ref(null);
let error = ref(null);
let deleteCode = ref(null);
const selectedUser = ref();
let expandedRows = ref(false);
let selectedTrainer = ref();
let tab = ref(0);
let viewUser = ref(false);
let viewUserData = ref({});
const selectedItem = ref({
  ids: null,
});
const userListStore = useUserStore();
const trainerStore = useTrainerStore();
const adminListStore = useAdminListStore();
const socket_store = useSocketStore();
let emit = defineEmits(['changeRole']);

await userListStore.getAllStudents({ text: '' });

let addGourenge = ref(false);

let allusers = await adminListStore.getAllUsers();
await userListStore.getAllTutors(1, { text: '' });
// await userListStore.searchSponsors(1, '');

let allsponsors = ref(null);
allsponsors.value = await userListStore.getAllSponsors(1);
// let a = await userListStore.getAllSponsorsByAdmin(1, { text: '' });

let students = ref(null);
let arr = ref([]);

async function searchUser(emit, role) {
  let params = ref({
    text: emit,
    role: role,
  });
  if (role == 3) await userListStore.searchUsers(1, params.value);
  else if (role == 2) await trainerStore.searchTrainer(1, params.value);
}

let sponsorsByAdmin = ref([]);
sponsorsByAdmin.value = await userListStore.getAllSponsorsByAdmin(1);

async function searchSponsors(emit) {
  let params = ref({
    text: emit,
  });
  console.log(params.value.text);
  sponsorsByAdmin.value = await userListStore.getAllSponsorsByAdmin(1, params.value);
}

async function searchTutors(emit) {
  let params = ref({
    text: emit,
  });
  await userListStore.getAllTutors(1, params.value);
}
async function searchStudents(emit) {
  let params = ref({
    text: emit,
  });
  await userListStore.getAllStudents(params.value);
}

watch(expandedRows, async () => {
  students.value = await adminListStore.studentsBySponsor(expandedRows.value[expandedRows.value.length - 1]?.id, 1);
  let obj = {
    sponsorId: expandedRows.value[expandedRows.value.length - 1]?.id,
    students: students.value?.data?.students,
  };
  arr.value.push(obj);
});

let i = 0;
const menu = ref();
const trainerMenu = ref();
const tutorsMenu = ref();
let userId = null;
const menu__items = ref([
  {
    label: 'Админ',
    icon: 'pi pi-fw pi-file',
    items: [
      {
        label: 'Сделать админом',
        command: userToAdmin,
      },
    ],
  },
  {
    label: 'Куратор',
    icon: 'pi pi-fw pi-file',
    items: [
      {
        label: 'Сделать куратором',
        command: userToTutor,
      },
    ],
  },
  {
    separator: true,
  },
  {
    label: 'Владелец',
    icon: 'pi pi-fw pi-file',
    items: [
      {
        label: 'Сделать владельцем',
        command: userToTrainer,
      },
    ],
  },
  {
    separator: true,
  },
  {
    label: 'Спонсор',
    icon: 'pi pi-fw pi-file',
    items: [
      {
        label: 'Спонсировать себя',
        command: createSponsor,
      },
      {
        label: 'Выбрать подопечного',
        command: openDialogAddGourenge,
      },
    ],
  },
]);

const selectedSponsor = ref();
const sponsors = ref(allusers?.data?.users);

let findUserText = ref('');

watch(findUserText, async () => {
  await searchUser(findUserText.value, 3);
  page.value = 0;
});

function openDialogAddGourenge() {
  addGourenge.value = true;
}

function chooseSponsor() {
  createStudents(userId, selectedSponsor.value.id);
  addGourenge.value = false;
}

const delete_student = async (id) => {
  let ids = new FormData();
  ids.append('userId', id);
  const result = await userListStore.deleteSpo(ids);
  toast.add({
    severity: errorValidate(result).toastType,
    summary: errorValidate(result).summary,
    detail: errorValidate(result).message,
    life: 3000,
  });
  pageSponsor.value = 0;
  sponsorsByAdmin.value = await userListStore.getAllSponsorsByAdmin(1);
};

const trainerMenuItems = [
  { label: 'Сделать админом', command: userToAdmin },
  { label: 'Снять статус владельца', command: deleteRole },
];

const tutorsMenuItems = [
  { label: 'Сделать админом', command: userToAdmin },
  { label: 'Снять статус куратора', command: deleteRoleTutor },
];
const components = [
  {
    addUser: addUser,
    editUser: editUser,
  },
];

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});

await userListStore.searchUsers(1, { text: '', role: 3 });
await trainerStore.requestTrainerList();

const selectPage = async (number) => {
  await userListStore.searchUsers(number, { text: findUserText.value, role: 3 });
};

const selectTrainerPage = async (number) => {
  await trainerStore.requestTrainerList(number);
};

watch(page, () => {
  selectPage(page.value + 1);
});

watch(pageTrainer, () => {
  selectTrainerPage(pageTrainer.value + 1);
});

watch(pageSponsor, async () => {
  sponsorsByAdmin.value = await userListStore.getAllSponsorsByAdmin(pageSponsor.value + 1);
});

watch(visibleDel, () => {
  error.value = null;
});

watch(pageTutors, async () => {
  await userListStore.getAllTutors(pageTutors.value + 1, '');
});

watch(pageStudents, async () => {
  await userListStore.getAllStudents({ text: '', page: pageStudents.value + 1 });
});

const toggle = (event, id) => {
  menu.value.toggle(event);
  userId = id;
};

const trainerToggle = (event, id) => {
  trainerMenu.value.toggle(event);
  userId = id;
};

const tutorsToggle = (event, id) => {
  tutorsMenu.value.toggle(event);
  userId = id;
};

function changeCurrAction(name, dialog) {
  currentAction.value = name + ' пользователя';
  currentDialog.value = dialog;
}

function openDelUser(itemId) {
  selectedItem.value.ids = itemId.data.id;
  visibleDel.value = true;
}

async function deleteRole() {
  if (userId) {
    const result = await userListStore.deleteRole(2, userId);
    if (tab.value == 1) {
      selectTrainerPage(pageTrainer.value + 1);
    } else {
      selectPage(page.value + 1);
    }
    toast.add({
      severity: errorValidate(result?.status).toastType,
      summary: errorValidate(result?.status).summary,
      detail: result?.data,
      life: 3000,
    });
    userId = null;
  }
}

async function deleteRoleTutor() {
  if (userId) {
    const result = await userListStore.deleteRole(4, userId);
    await userListStore.getAllTutors(pageTutors.value + 1, '');

    toast.add({
      severity: errorValidate(result?.status).toastType,
      summary: errorValidate(result?.status).summary,
      detail: result?.data,
      life: 3000,
    });
    userId = null;
  }
}

async function userToAdmin() {
  if (userId != null) {
    const formData = new FormData();
    formData.append('role', 1);
    const result = await userListStore.changeRole(userId, formData);
    toast.add({
      severity: errorValidate(result?.status).toastType,
      summary: errorValidate(result?.status).summary,
      detail: result?.data,
      life: 3000,
    });
    userId = null;
  }
}

async function userToTutor() {
  if (userId) {
    const formData = new FormData();
    formData.append('role', 4);
    const result = await userListStore.changeRole(userId, formData);
    await userListStore.getAllTutors(1, '');

    toast.add({
      severity: errorValidate(result?.status).toastType,
      summary: errorValidate(result?.status).summary,
      detail: result?.data,
      life: 3000,
    });
    userId = null;
  }
}

async function userToTrainer() {
  if (userId != null) {
    const formData = new FormData();
    formData.append('role', 2);
    const result = await userListStore.changeRole(userId, formData);
    // selectPage(page.value + 1);
    selectTrainerPage(pageTrainer.value + 1);
    toast.add({
      severity: errorValidate(result?.status).toastType,
      summary: errorValidate(result?.status).summary,
      detail: result?.data,
      life: 3000,
    });
    userId = null;
  }
}

async function toUser() {
  if (userId) {
    const formData = new FormData();
    formData.append('role', 3);
    const result = await userListStore.changeRole(userId, formData);
    selectPage(page.value + 1);
    selectTrainerPage(pageTrainer.value + 1);
    toast.add({
      severity: errorValidate(result?.status).toastType,
      summary: errorValidate(result?.status).summary,
      detail: result?.data,
      life: 3000,
    });
    userId = null;
  }
}

async function deleteUserFunction() {
  /* f(deleteCode.value) {
        adminListStore.requestDelToken();
        if (selectedItem.value.ids && adminListStore.deleteToken.deleteToken == deleteCode.value) { */
  const data = new FormData();
  data.append('ids', selectedItem.value.ids);
  data.append('delToken', deleteCode.value);
  const result = await userListStore.deleteUser(data, page.value + 1);
  selectPage(page.value + 1);
  selectTrainerPage(pageTrainer.value + 1);
  toast.add({
    severity: errorValidate(result?.status).toastType,
    summary: errorValidate(result?.status).summary,
    detail: result?.data,
    life: 3000,
  });

  selectedItem.value.ids = null;
  visibleDel.value = false;
  deleteCode.value = null;
  /* } else {
            error.value = "Вы ввели неправильный код";
        }
    }  else {
        error.value = "Вы не заполнили поле!"
    } */
}

async function createSponsor() {
  const result = await adminListStore.createSponsor(userId, userId);
  await userListStore.getAllStudents({ text: '' });
  toast.add({
    severity: errorValidate(result.status).toastType,
    summary: errorValidate(result.status).summary,
    detail: result?.data,
    life: 3000,
  });
}

async function createStudents(userId, studentId) {
  const result = await adminListStore.createSponsor(userId, studentId);

  allsponsors.value = await adminListStore.getAllSponsors(1);
  students.value = await adminListStore.studentsBySponsor(userId, 1);
  await userListStore.getAllSponsorsByAdmin(1, { text: '' });
  arr.value = [];
  let obj = {
    sponsorId: userId,
    students: students.value?.data?.students,
  };
  arr.value.push(obj);
  toast.add({
    severity: errorValidate(result.status).toastType,
    summary: errorValidate(result.status).summary,
    detail: result?.data,
    life: 3000,
  });
}
// У пользователя есть спонсор

function copyUser(text) {
  navigator.clipboard.writeText(text);
}
</script>

<style lang="scss">
.p-chip .p-chip-icon {
  margin-right: 0 !important;
}

.userList {
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 100%;
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
    }
  }
  .userList_container {
    h1 {
      margin-bottom: 20px;
    }
    width: 100%;
    background: #ffffff;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.25);
    border-radius: 7px;
    padding: 23px 48px;
    .userList_content {
      width: 100%;
      .userList_content_h {
        padding-left: 28px;
        width: 100%;
        display: flex;
        align-items: center;
        font-size: 15px;
        justify-content: space-between;
        padding-bottom: 20px;
        h2 {
          font-size: 15px;
          width: 11%;
          margin: 0;
        }
        .status_h {
          text-align: center;
        }
        .regData_h,
        .lastOnline_h {
          color: #2ca8ff;
        }
        color: #bbbbbb;
        input {
          width: 26px;
          height: 26px;
        }
      }
      .userList_content_info {
        width: 100%;

        .userList_content_info_item {
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
            width: 11%;
          }
          .email,
          .var,
          .id,
          .realName,
          .regTime,
          .lastOnline .list_operation,
          .status {
            width: 11%;
            text-align: left;
          }
          .status {
            background: #18af10;
            border-radius: 7px;
            padding: 20px 0px;
            font-weight: 400;
            text-align: center;
            color: white;
          }
          input {
            width: 26px;
            height: 26px;
          }
          .adminsList_operation {
            width: 11%;
            display: flex;
            gap: 10px;
            //padding-right: 104px;
          }
        }
        .userList_content_info_item:nth-child(2n) {
          background-color: white;
          border: none;
        }
      }
      .userList_content_result {
        margin-top: 26px;
        font-size: 15px;
        color: #bbbbbb;
      }
    }
  }
}
.userList {
  a {
    color: #2c96ea;
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
.dop {
  width: 32px;
  height: 32px;
  border-radius: 5px;
  text-align: center;
  margin: 0;
  padding-left: 5px;
  padding-right: 5px;
  background: #2ca8ff;
  padding: 8px 0px;
}
.userRed,
.userImg {
  width: 32px;
  height: 32px;
  border-radius: 5px;
  text-align: center;
  margin: 0;
  padding-left: 5px;
  padding-right: 5px;
  padding: 8px 0px;
}

.userRed {
  background-color: #ff8a00;
  background-image: url(~/assets/images/pen.png);
  background-repeat: no-repeat;
  background-position: center center;
}

.userImg {
  background-color: #6c6c6c;
  background-image: url(~/assets/images/userListImg.png);
  background-repeat: no-repeat;
  background-position: center center;
}
.userList_content_result {
  color: #bbbbbb;
  margin-top: 20px;
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
    background: #ff8a00 !important;
    background-image: url(~/assets/images/pen.png) !important;
    background-position: center center !important;
    background-repeat: no-repeat !important;
  }
  .delete {
    background: #f81111 !important;
    background-image: url(~/assets/images/delete.png) !important;
    background-position: center center !important;
    background-repeat: no-repeat !important;
  }
  .picture {
    background: #6c6c6c !important;
    background-image: url(~/assets/images/userListImg.png) !important;
    background-position: center center !important;
    background-repeat: no-repeat !important;
  }
  .other {
    background: #2ca8ff !important;
    background-image: url(~/assets/images/other.png) !important;
    background-position: center center !important;
    background-repeat: no-repeat !important;
  }
}
.selectSponsor {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 20px;
  &_select {
    width: 100%;
  }
}
</style>
