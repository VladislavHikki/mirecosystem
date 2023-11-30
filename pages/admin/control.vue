<template>
  <div class="adminControl container">
    <div class="adminControl_btns">
      <!--            <div class="adminControl_btns_item">-->
      <!--                <Button class="filter">ФИЛЬТРЫ</Button>-->
      <!--                <Button style="margin-top: 15px" class="deleteFilter">СБРОСИТЬ ФИЛЬТРЫ</Button>-->
      <!--            </div>-->
      <div class="adminControl_btns_item">
        <!--                <Button label="Primary" severity="info"-->
        <!--                    ><span style="margin-right: 5px" class="pi pi-search"></span>НАЙТИ</Button-->
        <!--                >-->
        <!-- <Button
                    style="margin-top: 15px"
                    label="Success"
                    severity="success"
                    @click=";(visible = true), (errorFormat = null)"
                    ><span style="margin-right: 5px" class="pi pi-plus"></span>ДОБАВИТЬ
                    ОБЪЯВЛЕНИЕ</Button
                > -->
        <Button style="margin-top: 15px" label="Success" severity="success" @click="visibleResource = true"
          ><span style="margin-right: 5px" class="pi pi-plus"></span>ДОБАВИТЬ РЕСУРС</Button
        >
      </div>
      <Dialog v-model:visible="visible" modal header="Добавить объявление" :style="{ width: '50vw' }">
        <div class="wrap-modal">
          <div class="modal-window__content">
            <div class="container">
              <div class="form__item">
                <InputText v-model.trim="label" type="text" placeholder="Заголовок" />
              </div>
              <div class="file_download">
                <div class="out-choose-image">
                  <img loading="lazy" width="100" height="100" src="@/assets/images/avatar.svg" alt="" />
                </div>
                <FileUpload
                  mode="basic"
                  :auto="true"
                  name="demo[]"
                  accept="image/*"
                  customUpload
                  @uploader="customBase64Uploader"
                  chooseLabel="Загрузить"
                />
              </div>
              <div class="error" style="margin: 0 auto; color: #e24c4c; margin-top: 10px; text-align: center">
                {{ errorFormat }}
              </div>
              <div class="form__item">
                <Dropdown
                  v-model="selectedResource"
                  placeholder="Выберите ресурс"
                  :options="resourceStore.selectResources"
                  optionLabel="label"
                  option-value="value"
                />
              </div>
              {{ resourceStore.selectResources }}
              <div class="form__item">
                <span class="p-float-label">
                  <Textarea v-model.trim="description" rows="3" cols="42" />
                  <label>Описание</label>
                </span>
              </div>
            </div>
          </div>
        </div>
        <template #footer>
          <Button
            label="Сохранить"
            :disabled="errorFormat || !label || !description || !selectedResource"
            icon="pi pi-check"
            @click="addRes"
          />
          <Button label="Отмена" icon="pi pi-times" @click="visible = false" />
        </template>
      </Dialog>
      <Dialog v-model:visible="visibleResource" :draggable="false" header="Добавить ресурс" modal :style="{ width: '50vw' }">
        <ModalsAddResource @update-formData="newFormData" :formData="formData" />
        <template #footer>
          <Button type="submit" label="Сохранить" icon="pi pi-check" @click="submit" />
          <Button label="Отмена" icon="pi pi-times" @click="visibleResource = false" />
        </template>
      </Dialog>
    </div>
    <div class="adminControl_container">
      <h1 class="page-title">Управление</h1>
      <div class="adminControl_content">
        <div class="adminControl_content_info">
          <Toast />
          <TabView>
            <!-- <TabPanel header="Объявления">
                            <DataTable
                                :value="resourceStore.getAnnounces?.announces?.rows"
                                tableStyle="min-width: 50rem"
                            >
                                <Column field="resource.label" header="Ресурс"></Column>
                                <Column field="label" header="Название"></Column>
                                <Column field="description" header="Описание"></Column>
                                <Column field="actions" header="Действие">
                                    <template #body="slotProps">
                                        <div class="category_content_btns">
                                            <Button
                                                @click="openEditAnnouce(slotProps.data)"
                                                class="red"
                                            ></Button>
                                            <Button
                                                @click="openDelAnnounce(slotProps.data.id)"
                                                class="delete"
                                            ></Button>
                                        </div>
                                    </template>
                                </Column>
                            </DataTable>
                            <Dialog
                                v-model:visible="visibleEditAnn"
                                :draggable="false"
                                header="Редактировать объявление"
                                modal
                                :style="{ width: '50vw' }"
                            >
                                <div>
                                    <div class="modal-window__content">
                                        <div class="modal-window__container">
                                            <div class="form__item">
                                                <Dropdown
                                                    v-model="selectedItemAnn.resourceId"
                                                    :options="resourceStore.selectResources"
                                                    optionLabel="label"
                                                    optionValue="value"
                                                    placeholder="Ресурс"
                                                />
                                            </div>
                                            <div class="form__item">
                                                <InputText
                                                    v-model="selectedItemAnn.label"
                                                    type="text"
                                                    placeholder="Название"
                                                />
                                            </div>
                                            <div class="form__item">
                                                <span class="p-float-label">
                                                    <Textarea
                                                        v-model="selectedItemAnn.description"
                                                        rows="2"
                                                        cols="45"
                                                    />
                                                    <label>Описание</label>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <template #footer>
                                    <Button
                                        label="Сохранить"
                                        icon="pi pi-check"
                                        @click="editAnnounceFunction()"
                                    />
                                    <Button
                                        label="Отмена"
                                        icon="pi pi-times"
                                        @click="visibleEditAnn = false"
                                    />
                                </template>
                            </Dialog>
                            <Dialog
                                v-model:visible="visibleDelAnn"
                                header="Удалить объявление"
                                modal
                                :style="{ width: '50vw' }"
                            >
                                <h2>Вы уверены, что хотите удалить объявление?</h2>
                                <template #footer>
                                    <Button
                                        label="Удалить"
                                        icon="pi pi-check"
                                        @click="deleteAnnounceFunction()"
                                    />
                                    <Button
                                        label="Отмена"
                                        icon="pi pi-times"
                                        @click="visibleDelAnn = false"
                                    />
                                </template>
                            </Dialog>
                            <div class="adminControl_content_result">
                                Показано
                                {{ resourceStore.getAnnounces?.announces?.rows?.length }}
                                результатов
                            </div>
                            <div class="pagination_btns">
                                <Paginator
                                    v-if="resourceStore.getAnnounces?.announces?.rows?.length"
                                    :template="{
                                        '640px': 'PrevPageLink CurrentPageReport NextPageLink',
                                        '960px':
                                            'FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink',
                                        '1300px':
                                            'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink',
                                        default:
                                            'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink JumpToPageDropdown JumpToPageInput',
                                    }"
                                    v-model:first="pageAnnouncement"
                                    :total-records="resourceStore.getAnnounces?.pages"
                                    :rows="1"
                                    currentPageReportTemplate="{last} из {totalRecords}"
                                />
                            </div>
                        </TabPanel> -->
            <TabPanel header="Ресурсы">
              <DataTable :value="resourceStore.getResources?.resources?.rows" tableStyle="min-width: 50rem">
                <template #header>
                  <div class="flex justify-content-end">
                    <span class="p-input-icon-left">
                      <i class="pi pi-search" />
                      <InputText v-model.trim="txtResource" @input="getResources" placeholder="Поиск" />
                    </span>
                  </div>
                </template>
                <Column>
                  <template #body="slotProps">
                    <img
                      width="60"
                      height="60"
                      style="object-fit: cover; border-radius: 50%"
                      :src="`${url}/api/public${slotProps?.data?.picture}`"
                      alt=""
                    />
                  </template>
                </Column>
                <Column field="label" header="Название">
                  <!-- <template #body="slotProps">
                    <pre>
                    {{ slotProps.data }}

                    </pre>
                  </template> -->
                </Column>
                <Column field="actions" header="Действие">
                  <template #body="slotProps">
                    <div class="category_content_btns">
                      <Button @click="openEditResource(slotProps.data)" class="red"></Button>
                      <Button @click="openDelModal(slotProps.data.id)" class="delete"></Button>
                      <!-- <Button @click="imgAds(slotProps.data.id, true)" class="picture"></Button> -->
                    </div>
                  </template>
                </Column>
                <Column field="description" header="Описание"></Column>
                <Column field="category.label" header="Категория"></Column>
                <Column field="franchise.label" header="Франшиза"></Column>
                <Column field="project.label" header="Проект"></Column>
                <Column field="country.label" header="Страна"></Column>
                <Column field="region.label" header="Регион"></Column>
                <Column field="city.label" header="Город"></Column>
                <Column field="team.subsection.label" header="Дивизия"></Column>
                <Column field="team.label" header="Команда"></Column>
                <Column field="restype.label" header="Тип ресурса"></Column>
              </DataTable>
              <div class="adminControl_content_result">
                Показано
                {{ resourceStore.getResources?.resources?.rows?.length }}
                результатов
              </div>
              <div class="pagination_btns">
                <Paginator
                  v-if="resourceStore.getResources?.pages > 1"
                  :template="{
                    '640px': 'PrevPageLink CurrentPageReport NextPageLink',
                    '960px': 'FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink',
                    '1300px': 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink',
                    default:
                      'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink JumpToPageDropdown JumpToPageInput',
                  }"
                  v-model:first="pageResource"
                  :total-records="resourceStore.getResources?.pages"
                  :rows="1"
                  currentPageReportTemplate="{last} из {totalRecords}"
                />
              </div>
            </TabPanel>
            <TabPanel header="Форма обратной связи">
              <DataTable :value="letterStore?.getLetters?.letters?.rows" tableStyle="min-width: 50rem">
                <Column field="username" header="Имя пользователя"></Column>
                <Column field="whatsapp" header="WhatsApp"></Column>
                <Column field="url" header="Ссылка"></Column>
                <Column field="message" header="Сообщение"></Column>
                <Column field="actions" header="Действие">
                  <template #body="slotProps">
                    <div class="category_content_btns">
                      <Button @click="deleteFeedback(slotProps?.data?.id, true)" class="delete"></Button>
                    </div>
                  </template>
                </Column>
              </DataTable>
              <div class="adminControl_content_result">
                Показано
                {{ letterStore?.getLetters?.letters?.rows?.length }}
                результатов
              </div>
              <div class="pagination_btns">
                <Paginator
                  v-if="letterStore?.getLetters?.pages > 1"
                  :template="{
                    '640px': 'PrevPageLink CurrentPageReport NextPageLink',
                    '960px': 'FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink',
                    '1300px': 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink',
                    default:
                      'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink JumpToPageDropdown JumpToPageInput',
                  }"
                  v-model:first="pageLetter"
                  :total-records="letterStore?.getLetters?.pages"
                  :rows="1"
                  currentPageReportTemplate="{last} из {totalRecords}"
                />
              </div>
              <Dialog v-model:visible="visibleFeedbackDelete" header="Удалить заявку" modal :style="{ width: '50vw' }">
                <h2>Вы уверены, что хотите удалить заявку?</h2>
                <template #footer>
                  <Button label="Удалить" icon="pi pi-check" @click="deleteFeedbackFunction()" />
                  <Button label="Отмена" icon="pi pi-times" @click="visibleFeedbackDelete = false" />
                </template>
              </Dialog>
            </TabPanel>
          </TabView>
        </div>
        <Dialog modal header="Редактировать аватарку" v-model:visible="cropper_show">
          <UICropper
            @get-image="(cropper_show = false), (selectedItem['image'] = $event?.file), (image = $event?.url)"
            :image="image"
            isAvatar
          />
        </Dialog>
        <Dialog
          v-model:visible="visibleEdit"
          :draggable="false"
          header="Редактировать ресурс
        
        "
          modal
          :style="{ width: '50vw' }"
        >
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
        <Dialog v-model:visible="visibleDel" header="Удалить ресурс" modal :style="{ width: '50vw' }">
          <h2>Вы уверены, что хотите удалить ресурс?</h2>
          <template #footer>
            <Button label="Удалить" icon="pi pi-check" @click="deleteChatFunction()" />
            <Button label="Отмена" icon="pi pi-times" @click="visibleDel = false" />
          </template>
        </Dialog>
      </div>
    </div>
  </div>
</template>

<script setup>
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import { ref } from 'vue';
import { useResourceStore } from '~/store/resource';
import { useLetterStore } from '~/store/letter.js';
import { useUserStore } from '~/store/user.js';
import { useCountryStore } from '~/store/country.js';
import { useRegionStore } from '~/store/region.js';
import { useCityStore } from '~/store/city.js';
import { useToast } from 'primevue/usetoast';
import { useTeamStore } from '~/store/team.js';
import { useCoverageStore } from '@/store/coverage';
import ColumnGroup from 'primevue/columngroup'; // optional
import Row from 'primevue/row'; // optional
import { getSortWhereLabel, getSortWhereUserName } from '@/store/sort';
import url from '~/store/config';
import { useCategoryStore } from '~/store/category';

const toast = useToast();
const resourceStore = useResourceStore();
const letterStore = useLetterStore();
const visible = ref(false);
const visibleEditAnn = ref(false);
const visibleResource = ref(false);
const label = ref('');
const selectedResource = ref(null);
const description = ref('');
const file = ref(null);
const countryStore = useCountryStore();
const regionStore = useRegionStore();
const categoryStore = useCategoryStore();
const teamStore = useTeamStore();
const cityStore = useCityStore();
const visibleEdit = ref(false);
const userStore = useUserStore();
const visibleDel = ref(false);
const visibleDelAnn = ref(false);
const selectedItem = ref({});
const selectedItemAnn = ref({});
const coverageStore = useCoverageStore();
const image = ref('/_nuxt/assets/images/avatar.svg');
let subsection = ref(null);
const subsectionTeams = ref(resourceStore.getList?.teams);
let pageAnnouncement = ref(0);
let pageResource = ref(0);
let pageLetter = ref(0);
let txtResource = ref('');
const cropper_show = ref(false);

let visibleFeedbackDelete = ref(false);
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
    // selectedItem.value.categoryId = null;
  }
);

const selectPageAnnouncement = async (number) => {
  await resourceStore.requestAnnounces(number);
};

async function getResources() {
  pageResource.value = 0;
  await resourceStore.searchResourceFromAdmin(1, { txt: txtResource.value, amount: 25 });
}
const selectPageResource = async (number) => {
  await resourceStore.searchResourceFromAdmin(number, { txt: txtResource.value, amount: 25 });
};

const selectPageLetter = async (number) => {
  await letterStore.requestLetters(number);
};

watch(pageLetter, () => {
  selectPageLetter(pageLetter.value + 1);
});

watch(pageResource, () => {
  selectPageResource(pageResource.value + 1);
});

watch(pageAnnouncement, () => {
  selectPageAnnouncement(pageAnnouncement.value + 1);
});

function deleteFeedback(ids) {
  selectedItem.value.ids = ids;
  visibleFeedbackDelete.value = !visibleFeedbackDelete.value;
}

async function deleteFeedbackFunction() {
  const data = new FormData();
  data.append('ids', selectedItem.value.ids);

  const result = await letterStore.deleteLetter(data);

  toast.add({
    severity: errorValidate(result).toastType,
    summary: errorValidate(result).summary,
    detail: errorValidate(result).message,
    life: 3000,
  });

  selectedItem.value = {};
  visibleFeedbackDelete.value = false;
}

onMounted(async () => {
  // await resourceStore.requestResources(1);
  await resourceStore.searchResourceFromAdmin(1, { txt: '', amount: 25 });
  await resourceStore.requestAnnounces(1);
  await resourceStore.requestAllResources();
  await letterStore.requestLetters(1);
  await countryStore.get();
  await resourceStore.requestTypeResources();
  if (process.client) {
    document.querySelector('.p-datatable-wrapper').addEventListener('wheel', function (event) {
      if (event.deltaMode == event.DOM_DELTA_PIXEL) {
        var modifier = 1;
        // иные режимы возможны в Firefox
      } else if (event.deltaMode == event.DOM_DELTA_LINE) {
        var modifier = parseInt(getComputedStyle(this).lineHeight);
      } else if (event.deltaMode == event.DOM_DELTA_PAGE) {
        var modifier = this.clientHeight;
      }
      if (event.deltaY != 0) {
        // замена вертикальной прокрутки горизонтальной
        this.scrollLeft += modifier * event.deltaY;
        event.preventDefault();
      }
    });
  }
});

const openEditAnnouce = (value) => {
  selectedItemAnn.value.id = value.id;
  selectedItemAnn.value.resourceId = value.resourceId;
  selectedItemAnn.value.label = value.label;
  selectedItemAnn.value.description = value.description;
  visibleEditAnn.value = true;
};

const editAnnounceFunction = async () => {
  const data = new FormData();
  // data.append("id", selectedItemAnn.value.id);
  data.append('resourceId', selectedItemAnn.value.resourceId);
  data.append('label', selectedItemAnn.value.label);
  data.append('description', selectedItemAnn.value.description);

  const result = await resourceStore.updateAnnounce(data, selectedItemAnn.value.id, pageAnnouncement.value);

  toast.add({
    severity: errorValidate(result).toastType,
    summary: errorValidate(result).summary,
    detail: errorValidate(result).message,
    life: 3000,
  });

  selectedItemAnn.value = {};
  visibleEditAnn.value = false;
};

const openDelAnnounce = (value) => {
  selectedItemAnn.value.id = value;
  visibleDelAnn.value = true;
};

const deleteAnnounceFunction = async () => {
  const data = new FormData();
  data.append('ids', selectedItemAnn.value.id);

  const result = await resourceStore.deleteAnnounce(data, pageAnnouncement.value);

  toast.add({
    severity: errorValidate(result).toastType,
    summary: errorValidate(result).summary,
    detail: errorValidate(result).message,
    life: 3000,
  });

  selectedItemAnn.value = {};
  visibleDelAnn.value = false;
};

const CloseDialog = () => {
  visibleResource.value = false;
  errorFormat.value = null;
};

let errorFormat = ref(null);
const customBase64Uploader = async (event) => {
  const uploadFile = event.files[0];
  if (event.files[0].type == 'image/svg+xml') {
    errorFormat.value = 'Неподдерживаемый формат изображения';
  } else {
    errorFormat.value = null;
  }
  file.value = uploadFile;
};

async function addRes() {
  const data = new FormData();
  data.append('label', label.value);
  data.append('description', description.value);
  data.append('resourceId', selectedResource.value);
  data.append('file', file.value);

  const result = await resourceStore.createAnnounce(data);

  toast.add({
    severity: errorValidate(result).toastType,
    summary: errorValidate(result).summary,
    detail: errorValidate(result).message,
    life: 3000,
  });

  selectedResource.value = null;
  description.value = '';
  label.value = '';
  visible.value = false;
}

const formData = reactive({
  type: null,
  name: null,
  url: null,
  desc: null,
  country: null,
  region: null,
  city: null,
  project: null,
  franchise: null,
  team: null,
  image: null,
  category: null,
  curator: null,
});

const error = ref(true);

const newFormData = (value) => {
  error.value = value[1];
  if (!error.value) {
    formData.type = value[0].type;
    formData.name = value[0].name;
    formData.url = value[0].url;
    formData.desc = value[0].desc;
    formData.country = value[0].country;
    formData.region = value[0].region;
    formData.city = value[0].city;
    formData.project = value[0].project;
    formData.franchise = value[0].franchise;
    formData.team = value[0].team;
    formData.image = value[0].image;
    formData.coverage = value[0].coverage;
    formData.category = value[0].category;
    formData.curator = value[0].curator.value;
  }
};

const submit = async () => {
  if (!error.value) {
    let data = new FormData();
    data.append('file', formData['image']);
    data.append('label', formData['name']);
    data.append('url', formData.url);
    data.append('description', formData.desc);
    data.append('curatorId', formData.curator);
    let error = false;
    if (!formData.coverage.nationality) {
      if (!(formData.country?.id && formData.region?.id && formData.city?.id)) {
        error = true;
      } else {
        data.append('countryId', formData.country?.id);
        data.append('regionId', formData.region?.id);
        data.append('cityId', formData.city?.id);
      }
    }
    data.append('projectId', formData.project?.value);
    data.append('categoryId', formData.category?.value);
    data.append('coverageId', formData.coverage?.value);
    data.append('franchiseId', formData.franchise?.value);
    data.append('restypeId', formData.type?.id);

    if (!error) {
      const result = await resourceStore.requestCreate(data);
      selectPageResource(pageResource.value + 1);
      toast.add({
        severity: errorValidate(result).toastType,
        summary: errorValidate(result).summary,
        detail: errorValidate(result).message,
        life: 3000,
      });
      visibleResource.value = false;
    }
  }
};

const customBase64UploaderResource = (event) => {
  const file = event.files[0];
  selectedItem.value.image = file;
  image.value = getImageUrl(selectedItem.value.image);
};

async function openEditResource(value) {
  subsectionTeams.value = resourceStore.getList?.teams;
  selectedItem.value.coverageId = value.coverageId;
  await resourceStore.requestList(!isNationality(selectedItem.value.coverageId) ? 2 : 1);
  selectedItem.value.id = value.id;
  selectedItem.value.label = value.label;
  selectedItem.value.url = value.url;
  selectedItem.value.description = value.description;
  selectedItem.value.categoryId = value.categoryId;
  selectedItem.value.cityId = value.cityId;
  selectedItem.value.countryId = value.countryId;
  selectedItem.value.franchiseId = value.franchiseId;
  selectedItem.value.projectId = value.projectId;
  selectedItem.value.regionId = value.regionId;
  selectedItem.value.restypeId = value.restypeId;
  selectedItem.value.image = value.picture;
  selectedItem.value.teamId = value.teamId;
  selectedItem.value.curatorId = value.curatorId;
  subsection.value = value.team?.subsection?.id;
  visibleEdit.value = true;
  if (selectedItem.value.regionId) await cityStore.get(selectedItem.value.regionId);
  if (selectedItem.value.countryId) await regionStore.get(selectedItem.value.countryId);
  await coverageStore.requestCoverage();
  await countryStore.get();
  image.value = getImageUrl(selectedItem.value.image);

  await regionStore.get(selectedItem.value.countryId);
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
  // if (selectedItem.value.teamId) data.append('teamId', selectedItem.value.teamId);
  if (selectedItem.value.coverageId) data.append('coverageId', selectedItem.value.coverageId);
  if (selectedItem.value.curatorId) data.append('curatorId', selectedItem.value.curatorId);

  const result = await resourceStore.updateResource(data, selectedItem.value.id, pageResource.value);

  toast.add({
    severity: errorValidate(result).toastType,
    summary: errorValidate(result).summary,
    detail: errorValidate(result).message,
    life: 3000,
  });

  selectedItem.value = {};
  visibleEdit.value = false;
}

function openDelModal(value) {
  visibleDel.value = true;
  selectedItem.value.id = value;
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

  selectedItem.value = {};
  visibleDel.value = false;
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

function isNationality(coverageId) {
  for (let i = 0; i < coverageStore.coverages?.length; ++i) {
    if (coverageId == coverageStore.coverages[i].value) {
      return coverageStore.coverages[i].nationality;
    }
  }
  return false;
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

function getCountryByCoverage(coverage) {
  let countryId = null;
  for (let i = 0; i < coverageStore.coverages?.length; ++i) {
    if (coverage == coverageStore.coverages[i].value) {
      countryId = coverageStore.coverages[i].countryId;
    }
  }
  for (let i = 0; i < countryStore.all?.length; ++i) {
    if (countryId == countryStore.all[i].id) {
      return [countryStore.all[i]];
    }
  }
  return null;
}

async function changeRegion(regionId) {
  await cityStore.get(regionId);
}
</script>

<style lang="scss">
.p-dropdown-trigger .pi {
  padding-bottom: 5px !important;
}
.adminControl {
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 100%;
  @media (max-width: 400px) {
    .p-paginator {
      .p-paginator-element {
        min-width: 1.5rem !important;
        height: 1.5rem !important;
      }
      .p-paginator-current {
        font-size: 12px !important;
      }
    }
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
  .adminControl_container {
    h1 {
      margin-bottom: 20px;
    }
    width: 100%;
    background: #ffffff;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.25);
    border-radius: 7px;
    padding: 23px 48px;
    .adminControl_content {
      width: 100%;
      .adminControl_content_h {
        padding-left: 28px;
        width: 100%;
        display: flex;
        align-items: center;
        font-size: 15px;
        justify-content: space-between;
        padding-bottom: 20px;

        h2 {
          white-space: nowrap;
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
      .adminControl_content_info {
        width: 100%;
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

        .adminControl_content_info_item {
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

          .actually,
          .data,
          .category,
          .userName,
          .location,
          .heading .list_operation,
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
          .adminControl_operation {
            width: 15%;
            display: flex;
            gap: 10px;
            //padding-right: 104px;
          }
        }
        .adminControl_content_info_item:nth-child(2n) {
          background-color: white;
          border: none;
        }
      }
      .adminControl_content_result {
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
.file_download {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
  img {
    border: 1px solid #000;
    border-radius: 100px;
  }
}
.p-fileupload {
  margin-left: 0;
}
</style>
