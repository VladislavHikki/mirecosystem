<template>
  <div class="my-chat">
    <Dialog modal header="Редактировать аватарку" v-model:visible="cropper_show">
      <UICropper
        @get-image="(cropper_show = false), (image = $event?.file), (image = $event?.url)"
        :image="image"
        isAvatar
      />
    </Dialog>
    <h1 class="page-title">Чаты</h1>
    <div class="myResourceCards">
      <div class="myResourceCard_container" v-for="(value, index) in userStore?.getProfileChats" :key="index">
        <CardsResource :data="value" />

        <div class="myResourceCard_btn">
          <Button @click="openEditModal(value)" class="myResourceCard_operation_red" label="РЕДАКТИРОВАТЬ" />

          <Button @click="openDelModal(value)" class="myResourceCard_operation_del" label="УДАЛИТЬ" />
        </div>
      </div>
      <div class="message" v-if="!userStore?.getProfileChats?.length">
        <h2 class="page-subtitle">Тут пока ничего нет</h2>
      </div>
      <Dialog v-model:visible="visibleEdit" :draggable="false" header="Редактировать чат" modal :style="{ width: '50vw' }">
        <div>
          <div class="modal-window__content">
            <div class="modal-window__container">
              <form method="post">
                <div class="form__item">
                  <Dropdown
                    v-model="selectedItem.restypeId"
                    :options="resourceStore.types"
                    optionLabel="label"
                    optionValue="id"
                    placeholder="Вид ресурса"
                  />
                </div>
                <div class="form__item form-input upload-file upload-file_indent form-item_indent">
                  <label for="">Картинка</label>
                  <div class="form-upload">
                    <div class="out-choose-image">
                      <img loading="lazy" width="100" height="100" :src="image" alt="" />
                    </div>
                    <FileUpload
                      accept=".jpg, .png, .jpeg"
                      mode="basic"
                      :auto="true"
                      v-model="selectedItem.image"
                      customUpload
                      @uploader="customBase64Uploader"
                      chooseLabel="Загрузить"
                    />
                    <Button icon="pi pi-user-edit" label="Изменить" @click="cropper_show = true" />
                  </div>
                </div>
                <div class="form__item">
                  <InputText v-model.trim="selectedItem.label" type="text" placeholder="Название" />
                </div>
                <div class="form__item">
                  <InputText v-model.trim="selectedItem.url" type="text" placeholder="Ссылка" />
                </div>
                <div class="form__item">
                  <span class="p-float-label">
                    <Textarea v-model.trim="selectedItem.description" rows="2" cols="45" />
                    <label>Описание</label>
                  </span>
                </div>
                <div class="form__item">
                  <Dropdown
                    v-model="selectedItem.franchiseId"
                    :options="getSortWhereLabel(resourceStore.getList?.franchises)"
                    optionLabel="label"
                    optionValue="value"
                    placeholder="Франшиза"
                  />
                </div>
                <div class="form__item">
                  <Dropdown
                    v-model="selectedItem.coverageId"
                    :options="coverageStore.coverages"
                    optionLabel="label"
                    optionValue="value"
                    placeholder="Охват"
                  />
                </div>
                <div v-if="!isNationality(selectedItem.coverageId) && selectedItem.coverageId" class="form__item">
                  <Dropdown
                    v-model="selectedItem.regionId"
                    :options="regionStore.regions"
                    empty-filter-message="Нет результатов"
                    optionLabel="label"
                    optionValue="id"
                    placeholder="Регион"
                    @change="changeRegion(selectedItem.regionId)"
                    filter
                  />
                </div>
                <div v-if="!isNationality(selectedItem.coverageId) && selectedItem.coverageId" class="form__item">
                  <Dropdown
                    v-model="selectedItem.cityId"
                    :options="cityStore.all"
                    :disabled="!selectedItem.regionId"
                    empty-filter-message="Нет результатов"
                    optionLabel="label"
                    optionValue="id"
                    placeholder="Город"
                    filter
                  />
                </div>

                <div class="form__item">
                  <Dropdown
                    v-model="selectedItem.categoryId"
                    :options="changePlaceCategory(getSortWhereLabel(resourceStore.getList?.categories))"
                    optionLabel="label"
                    optionValue="value"
                    placeholder="Категория"
                  />
                </div>
                <div class="form__item">
                  <Dropdown
                    v-model="selectedItem.projectId"
                    :options="getSortWhereLabel(resourceStore.getList?.projects)"
                    optionLabel="label"
                    optionValue="value"
                    placeholder="Проект"
                  />
                </div>
                <div class="form__item">
                  <Dropdown
                    filter
                    empty-filter-message="Нет результатов"
                    v-model="selectedItem.curatorId"
                    :options="getSortWhereLabel(userList?.data?.curators)"
                    optionLabel="label"
                    optionValue="value"
                    placeholder="Куратор"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>

        <template #footer>
          <Button label="Сохранить" icon="pi pi-check" @click="editResourceFunction()" />
          <Button label="Отмена" icon="pi pi-times" @click="visibleEdit = false" />
        </template>
      </Dialog>
      <Dialog v-model:visible="visibleDel" header="Удалить чат" modal :style="{ width: '50vw' }">
        <h2>Вы уверены, что хотите удалить чат?</h2>
        <template #footer>
          <Button label="Удалить" icon="pi pi-check" @click="deleteChatFunction()" />
          <Button label="Отмена" icon="pi pi-times" @click="visibleDel = false" />
        </template>
      </Dialog>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import editResource from '~~/components/modals/editResource.vue';
import { useUserStore } from '~/store/user.js';
import { useResourceStore } from '~/store/resource.js';
import { useCountryStore } from '~/store/country.js';
import { useRegionStore } from '~/store/region.js';
import { useCityStore } from '~/store/city.js';
import { useToast } from 'primevue/usetoast';
import { getSortWhereLabel } from '~/store/sort';
import { useCategoryStore } from '~/store/category';
import { useTeamStore } from '~/store/team.js';
import { useCoverageStore } from '@/store/coverage';

const coverageStore = useCoverageStore();
const toast = useToast();
const countryStore = useCountryStore();
const regionStore = useRegionStore();
const cityStore = useCityStore();
const visibleEdit = ref(false);
const userStore = useUserStore();
const resourceStore = useResourceStore();
const categoryStore = useCategoryStore();
const visibleDel = ref(false);
const selectedItem = ref({});
const image = ref('/_nuxt/assets/images/avatar.svg');
let subsection = ref(null);
const subsectionTeams = ref(resourceStore.getList?.teams);
const teamStore = useTeamStore();
const cropper_show = ref(false);

await userStore.requestProfile(userStore.data.id);
await countryStore.get();
await resourceStore.requestTypeResources();
await resourceStore.requestList();
await coverageStore.requestCoverage();

let userList = ref(await userStore.getTutorsList());

onMounted(async () => {
  await categoryStore.requestListSubsections();
});

watch(
  () => selectedItem.value.coverageId,
  async () => {
    if (!isNationality(selectedItem?.value?.coverageId)) {
      selectedItem.value.countryId = getCountryByCoverage(selectedItem?.value?.coverageId)[0]?.id;
      await regionStore.get(selectedItem.value.countryId);
      await resourceStore.requestList(2);
    } else {
      selectedItem.value.countryId = null;
      selectedItem.value.regionId = null;
      selectedItem.value.cityId = null;
      await resourceStore.requestList(1);
    }
  }
);

async function openEditModal(value) {
  await regionStore.get(value.countryId);
  await cityStore.get(value.regionId);
  subsectionTeams.value = resourceStore.getList?.teams;

  selectedItem.value.id = value.id;
  selectedItem.value.label = value.label;
  selectedItem.value.image = value.picture;
  selectedItem.value.url = value.url;
  selectedItem.value.description = value.description;
  selectedItem.value.categoryId = value.categoryId;
  selectedItem.value.cityId = value.cityId;
  selectedItem.value.countryId = value.countryId;
  selectedItem.value.franchiseId = value.franchiseId;
  selectedItem.value.projectId = value.projectId;
  selectedItem.value.regionId = value.regionId;
  selectedItem.value.restypeId = value.restypeId;
  selectedItem.value.curatorId = value.curatorId;
  selectedItem.value.coverageId = value.coverageId;
  // selectedItem.value.teamId = value.teamId;
  subsection.value = value.team?.subsection?.id;
  visibleEdit.value = true;
  if (selectedItem.value.regionId) await cityStore.get(selectedItem.value.regionId);
  if (selectedItem.value.countryId) await regionStore.get(selectedItem.value.countryId);
  image.value = getImageUrl(selectedItem.value.image);

  await regionStore.get(selectedItem.value.countryId);

  await resourceStore.requestList(!isNationality(selectedItem.value.coverageId) ? 2 : 1);
}

async function editResourceFunction() {
  const data = new FormData();
  data.append('id', selectedItem.value.id);
  typeof selectedItem.value.image == 'object' ? data.append('file', selectedItem.value.image) : data.append('file', null);
  if (selectedItem.value.label) data.append('label', selectedItem.value.label);
  if (selectedItem.value.url) data.append('url', selectedItem.value.url);
  if (selectedItem.value.description) data.append('description', selectedItem.value.description);
  if (selectedItem.value.categoryId) data.append('categoryId', selectedItem.value.categoryId);
  if (selectedItem.value.countryId) data.append('countryId', selectedItem.value.countryId);
  if (selectedItem.value.regionId) data.append('regionId', selectedItem.value.regionId);
  if (selectedItem.value.cityId) data.append('cityId', selectedItem.value.cityId);
  if (selectedItem.value.franchiseId) data.append('franchiseId', selectedItem.value.franchiseId);
  if (selectedItem.value.projectId) data.append('projectId', selectedItem.value.projectId);
  if (selectedItem.value.restypeId) data.append('restypeId', selectedItem.value.restypeId);
  if (selectedItem.value.teamId) data.append('teamId', selectedItem.value.teamId);
  if (selectedItem.value.curatorId) data.append('curatorId', selectedItem.value.curatorId);
  if (selectedItem.value.coverageId) data.append('coverageId', selectedItem.value.coverageId);
  const result = await resourceStore.updateResource(data, selectedItem.value.id);

  toast.add({
    severity: errorValidate(result).toastType,
    summary: errorValidate(result).summary,
    detail: errorValidate(result).message,
    life: 3000,
  });

  await userStore.requestProfile(userStore.data.id);
  visibleEdit.value = false;
}

const customBase64Uploader = (event) => {
  const file = event.files[0];
  selectedItem.value.image = file;
  image.value = getImageUrl(selectedItem.value.image);
};

async function reTeam() {
  let result = await teamStore.requestTeamsSubsection(subsection.value);
  subsectionTeams.value = result.teams;
}

function GetMyResource() {
  let myChannel = [];
  for (let i = 0; i < userStore.profile?.user.resources.length; ++i) {
    if (userStore.profile?.user.resources[i].restypeId === 1) {
      myChannel.push(userStore.profile?.user.resources[i]);
    }
  }
  if (myChannel[0] == null) {
    return false;
  }
  return myChannel;
}

function openDelModal(value) {
  visibleDel.value = true;
  selectedItem.value.id = value.id;
}

function changePlaceCategory(arr) {
  let newArr = [];
  arr.map((item) => {
    if (item?.label == 'Новости региона') {
      newArr.unshift(item);
    }
    if (item?.label == 'Новости города') newArr.push(item);
  });

  return [
    ...newArr,
    ...arr.filter((item) => {
      if (item?.label != 'Новости региона' && item?.label != 'Новости города') return item;
    }),
  ];
}

async function deleteChatFunction() {
  const data = new FormData();
  data.append('ids', selectedItem.value.id);
  const result = await resourceStore.deleteResource(data);

  toast.add({
    severity: errorValidate(result).toastType,
    summary: errorValidate(result).summary,
    detail: errorValidate(result).message,
    life: 3000,
  });

  await userStore.requestProfile(userStore.data.id);
  visibleDel.value = false;
}
function filterTeamsBySubsection(subsectionId, teams) {
  let filterTeam = [];
  if (subsectionId) {
    for (let i = 0; i < teams?.length; ++i) {
      if (subsectionId == teams[i].subsection) {
        filterTeam.push(teams[i]);
      }
    }
  }
  return filterTeam;
}

function selectFranchise(franchiseId, arr) {
  for (let i = 0; i < arr?.length; ++i) {
    if (franchiseId == arr[i].value) {
      return arr[i].label;
    }
  }
  return null;
}

function filterCityLocation(franchiseName, city) {
  if (franchiseName == 'Национальная') {
    let filterLocation = [];
    for (let i = 0; i < city?.length; ++i) {
      if (city[i].label == 'Все города') {
        filterLocation.push(city[i]);
        break;
      }
    }
    for (let i = 0; i < city?.length; ++i) {
      if (city[i].label == 'Все города') {
        continue;
      }
      filterLocation.push(city[i]);
    }
    return filterLocation;
  }
  return city;
}

function filterRegionLocation(franchiseName, regions) {
  if (franchiseName == 'Национальная') {
    let filterLocation = [];
    for (let i = 0; i < regions?.length; ++i) {
      if (regions[i].label == 'Все регионы') {
        filterLocation.push(regions[i]);
        break;
      }
    }
    for (let i = 0; i < regions?.length; ++i) {
      if (regions[i].label == 'Все регионы') {
        continue;
      }
      filterLocation.push(regions[i]);
    }
    return filterLocation;
  }
  return regions;
}
function isNationality(coverageId) {
  for (let i = 0; i < coverageStore.coverages.length; ++i) {
    if (coverageId == coverageStore.coverages[i].value) {
      return coverageStore.coverages[i].nationality;
    }
  }
  return coverageStore.coverages[i].nationality;
}
function getCountryByCoverage(coverage) {
  let countryId = null;
  for (let i = 0; i < coverageStore.coverages.length; ++i) {
    if (coverage == coverageStore.coverages[i].value) {
      countryId = coverageStore.coverages[i].countryId;
    }
  }
  for (let i = 0; i < countryStore.all.length; ++i) {
    if (countryId == countryStore.all[i].id) {
      return [countryStore.all[i]];
    }
  }
}

async function changeRegion(regionId) {
  await cityStore.get(regionId);
}

async function changeCountry(countryId) {
  await regionStore.get(countryId);
}
</script>

<style lang="scss">
.my-chat {
  h1 {
    margin-bottom: 34px;
    font-size: 32px;
  }
  .myResourceCards {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    .myResourceCard_container {
      width: 494px;
      .myResourceCard_btn {
        display: flex;
        width: 100%;
        justify-content: flex-start;
        gap: 19px;
        button {
          padding: 9px 14px 9px 32px;
          margin: 0;
          margin-top: 11px;
          font-size: 13px;
        }
        .myResourceCard_operation_red {
          background: #18af10;
          background-image: url(~~/assets/images/pen.png);
          background-repeat: no-repeat;
          background-position: left 9px center;
          border: none;
          color: white;
        }
        .myResourceCard_operation_del {
          background: #eb1515;
          background-image: url(~~/assets/images/delete.png);
          background-repeat: no-repeat;
          background-position: left 9px center;
          border: none;
          color: white;
        }
      }
    }
  }
}
</style>
