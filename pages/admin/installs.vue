<template>
  <div class="container" style="display: flex; flex-direction: column">
    <div class="adminControl">
      <span style="margin-bottom: 15px" class="page-subtitle"><b>Установки</b></span>
      <Toast />
      <div class="adminControl_btns">
        <div class="adminControl_btns_add_items">
          <Button class="adminControl_btns_item" @click="step = 1" :class="{ btn_active: step === 1 }">ПРОЕКТЫ</Button>
          <Button class="adminControl_btns_item" @click="step = 3" :class="{ btn_active: step === 3 }">ФРАНШИЗЫ</Button>
          <Button class="adminControl_btns_item" @click="step = 4" :class="{ btn_active: step === 4 }">КАТЕГОРИИ</Button>
          <Button class="adminControl_btns_item" @click="step = 6" :class="{ btn_active: step === 6 }">ССЫЛКИ</Button>
          <Button class="adminControl_btns_item" @click="step = 7" :class="{ btn_active: step === 7 }">РУБРИКИ</Button>
          <Button class="adminControl_btns_item" @click="step = 9" :class="{ btn_active: step === 9 }">СЕРВИСЫ</Button>
          <div class="adminControl_btns_add_items">
            <Button class="adminControl_btns_item" @click="step = 8" :class="{ btn_active: step === 8 }">ТРИАДЫ</Button>
            <Button class="adminControl_btns_item" @click="step = 5" :class="{ btn_active: step === 5 }">ДИВИЗИОНЫ</Button>
            <Button class="adminControl_btns_item" @click="step = 2" :class="{ btn_active: step === 2 }">КОМАНДЫ</Button>
          </div>
        </div>
        <div class="adminControl_btns_item">
          <!--                    <Button label="Primary" severity="info">-->
          <!--                        <span style="margin-right: 5px" class="pi pi-search"></span>НАЙТИ</Button-->
          <!--                    >-->
          <Button @click="visible = true" label="Success" severity="success"
            ><span style="margin-right: 5px" class="pi pi-plus"></span>ДОБАВИТЬ</Button
          >
          <Dialog modal header="Редактировать аватарку" v-model:visible="cropper_show">
            <UICropper
              @get-image="(cropper_show = false), (selectedItemInstall['file'] = $event?.file), (image = $event?.url)"
              :image="selectedItemInstall['file']"
              isAvatar
            />
          </Dialog>
          <Dialog v-if="step === 1" v-model:visible="visible" :draggable="false" header="Добавить проект" modal>
            <div class="modal-window__container">
              <form method="post">
                <div class="form__item">
                  <InputText
                    name="projectLabel"
                    type="text"
                    v-model.trim="selectedItemInstall['projectLabel']"
                    :class="{
                      'p-invalid': $vProject['projectLabel'].$error,
                    }"
                    @change="$vProject['projectLabel'].$touch"
                    placeholder="Введите название"
                  />
                  <span class="error" v-if="$vProject['projectLabel'].$error">
                    {{ $vProject['projectLabel'].$errors[0].$message }}
                  </span>
                </div>
                <div class="form__item">
                  <div class="form-upload">
                    <div class="out-choose-image">
                      <!-- <img loading="lazy" width="100" height="100" src="@/assets/images/avatar.svg" alt="" /> -->
                      <img loading="lazy" width="100" height="100" :src="image" alt="" />
                    </div>
                    <FileUpload
                      mode="basic"
                      :auto="true"
                      name="demo[]"
                      accept="image/*"
                      customUpload
                      v-model="selectedItemInstall['file']"
                      @uploader="customBase64Uploader"
                      chooseLabel="Загрузить"
                    />
                    <Button icon="pi pi-user-edit" label="Изменить" @click="cropper_show = true" />
                    <span class="error" v-if="$vProject['file'].$error">
                      {{ $vProject['file'].$errors[0].$message }}
                    </span>
                  </div>
                </div>
              </form>
            </div>
            <template #footer>
              <Button label="Сохранить" icon="pi pi-check" @click="addProjectFunction()" />
              <Button label="Отмена" icon="pi pi-times" @click="visible = false" />
            </template>
          </Dialog>
          <Dialog modal header="Редактировать аватарку" v-model:visible="cropper_show_team">
            <UICropper
              @get-image="(cropper_show_team = false), (selectedItemInstall['file'] = $event?.file), (image = $event?.url)"
              :image="selectedItemInstall['file']"
              isAvatar
            />
          </Dialog>
          <Dialog
            v-if="step === 2"
            v-model:visible="visible"
            :draggable="false"
            header="Добавить команду"
            modal
            :style="{ width: '50vw' }"
          >
            <div class="modal-window__container">
              <form method="post">
                <div class="form__item">
                  <InputText
                    name="teamLabel"
                    type="text"
                    v-model.trim="selectedItemInstall['teamLabel']"
                    :class="{ 'p-invalid': $vTeam['teamLabel'].$error }"
                    @change="$vTeam['teamLabel'].$touch"
                    placeholder="Введите название"
                  />
                  <span class="error" v-if="$vTeam['teamLabel'].$error">
                    {{ $vTeam['teamLabel'].$errors[0].$message }}
                  </span>
                </div>
                <div class="form__item">
                  <Dropdown
                    name="adminId"
                    option-label="label"
                    option-value="value"
                    v-model="selectedItemInstall['adminId']"
                    :class="{ 'p-invalid': $vTeam['adminId'].$error }"
                    @change="$vTeam['adminId'].$touch"
                    :options="userStore?.trainers"
                    placeholder="Владелец"
                    empty-filter-message="Нет результатов"
                    filter
                  />
                  <span class="error" v-if="$vTeam['adminId'].$error">
                    {{ $vTeam['adminId'].$errors[0].$message }}
                  </span>
                </div>
                <div class="form__item">
                  <Dropdown
                    name="subSectionId"
                    option-label="label"
                    option-value="id"
                    v-model="selectedItemInstall['subSectionId']"
                    :class="{ 'p-invalid': $vTeam['subSectionId'].$error }"
                    @change="$vTeam['subSectionId'].$touch"
                    :options="categoryStore?.subsectionsList"
                    placeholder="Дивизион"
                  />
                  <span class="error" v-if="$vTeam['subSectionId'].$error">
                    {{ $vTeam['subSectionId'].$errors[0].$message }}
                  </span>
                </div>
                <div class="form__item">
                  <Dropdown
                    name="type"
                    option-label="label"
                    option-value="id"
                    v-model="selectedItemInstall['type']"
                    :options="typeArr"
                    placeholder="Тип"
                  />
                </div>
                <div class="form__item">
                  <div class="form-upload">
                    <div class="out-choose-image">
                      <img
                        class="team-picture"
                        v-if="selectedItemInstall['type'] == 0"
                        loading="lazy"
                        width="100"
                        height="100"
                        :src="image"
                        alt=""
                      />
                      <div
                        v-else-if="selectedItemInstall['type'] == 1"
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
                        <img
                          class="team-picture avatar"
                          style="width: 80px; height: 80px"
                          src="@/assets/images/avatar.svg"
                          alt=""
                        />
                      </div>
                    </div>
                    <FileUpload
                      mode="basic"
                      :auto="true"
                      name="demo[]"
                      accept="image/*"
                      customUpload
                      v-model="selectedItemInstall['file']"
                      @uploader="customBase64Uploader"
                      chooseLabel="Загрузить"
                    />
                    <Button icon="pi pi-user-edit" label="Изменить" @click="cropper_show_team = true" />
                    <span class="error" v-if="$vTeam['file'].$error">
                      {{ $vTeam['file'].$errors[0].$message }}
                    </span>
                  </div>
                </div>
                <div class="form__item">
                  <Textarea
                    name="teamDesc"
                    v-model.trim="selectedItemInstall['teamDesc']"
                    rows="5"
                    cols="45"
                    placeholder="Описание"
                  />

                  <!-- <span class="error" v-if="$vTeam['teamDesc'].$error">
                    {{ $vTeam['teamDesc'].$errors[0].$message }}
                  </span> -->
                </div>
              </form>
            </div>
            <template #footer>
              <Button label="Сохранить" icon="pi pi-check" @click="addTeamFunction()" />
              <Button label="Отмена" icon="pi pi-times" @click="visible = false" />
            </template>
          </Dialog>
          <Dialog modal header="Редактировать аватарку" v-model:visible="cropper_show_franch">
            <UICropper
              @get-image="(cropper_show_franch = false), (selectedItemInstall['file'] = $event?.file), (image = $event?.url)"
              :image="selectedItemInstall['file']"
              isAvatar
            />
          </Dialog>
          <Dialog v-if="step === 3" v-model:visible="visible" :draggable="false" header="Добавить франшизу" modal>
            <div class="modal-window__container">
              <form method="post">
                <div class="form__item">
                  <InputText
                    name="franchiseLabel"
                    type="text"
                    v-model.trim="selectedItemInstall['franchiseLabel']"
                    :class="{
                      'p-invalid': $vFranchise['franchiseLabel'].$error,
                    }"
                    @change="$vFranchise['franchiseLabel'].$touch"
                    placeholder="Введите название"
                  />
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
                      v-model="selectedItemInstall['file']"
                      @uploader="customBase64Uploader"
                      chooseLabel="Загрузить"
                    />
                    <span class="error" v-if="$vFranchise['file'].$error">
                      {{ $vFranchise['file'].$errors[0].$message }}
                    </span>
                    <Button icon="pi pi-user-edit" label="Изменить" @click="cropper_show_franch = true" />
                  </div>
                </div>
                <div class="form__item p-float-label">
                  <span class="p-float-label">
                    <Textarea
                      v-model.trim="selectedItemInstall['franchiseDescription']"
                      :value="selectedItemInstall['franchiseDescription']"
                      rows="5"
                      cols="45"
                      :class="{
                        'p-invalid': $vFranchise['franchiseDescription'].$error,
                      }"
                      @change="$vFranchise['franchiseDescription'].$touch"
                    />
                    <label>Введите описание</label>
                  </span>
                  <span class="error" v-if="$vFranchise['franchiseDescription'].$error">
                    {{ $vFranchise['franchiseDescription'].$errors[0].$message }}
                  </span>
                </div>
              </form>
            </div>
            <template #footer>
              <Button label="Сохранить" icon="pi pi-check" @click="addFranchiseFunction()" />
              <Button label="Отмена" icon="pi pi-times" @click="visible = false" />
            </template>
          </Dialog>
          <Dialog v-if="step === 4" v-model:visible="visible" :draggable="false" header="Добавить категорию" modal>
            <div class="wrap-modal">
              <div class="modal-window__container">
                <form method="post">
                  <div class="form__item">
                    <InputText
                      type="text"
                      v-model.trim="selectedItemInstall['categoryLabel']"
                      :class="{
                        'p-invalid': $vCategory['categoryLabel'].$error,
                      }"
                      @change="$vCategory['categoryLabel'].$touch"
                      placeholder="Наименование категории"
                    />
                    <span class="error" v-if="$vCategory['categoryLabel'].$error">
                      {{ $vCategory['categoryLabel'].$errors[0].$message }}
                    </span>
                  </div>
                </form>
              </div>
            </div>
            <template #footer>
              <Button label="Сохранить" icon="pi pi-check" @click="addCategoryFunction()" />
              <Button label="Отмена" icon="pi pi-times" @click="visible = false" />
            </template>
          </Dialog>
          <Dialog modal header="Редактировать аватарку" v-model:visible="cropper_show_subSec">
            <UICropper
              @get-image="(cropper_show_subSec = false), (selectedItemInstall['file'] = $event?.file), (image = $event?.url)"
              :image="selectedItemInstall['file']"
              isAvatar
            />
          </Dialog>
          <Dialog
            v-if="step === 5"
            v-model:visible="visible"
            :draggable="false"
            header="Добавить дивизион"
            modal
            style="width"
          >
            <div class="wrap-modal">
              <div class="modal-window__container">
                <form method="post">
                  <div class="form__item">
                    <InputText
                      type="text"
                      v-model.trim="selectedItemInstall['subSectionLabel']"
                      :class="{
                        'p-invalid': $vSubSection['subSectionLabel'].$error,
                      }"
                      @change="$vSubSection['subSectionLabel'].$touch"
                      placeholder="Наименование дивизиона"
                    />
                    <span class="error" v-if="$vSubSection['subSectionLabel'].$error">
                      {{ $vSubSection['subSectionLabel'].$errors[0].$message }}
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
                        v-model="selectedItemInstall['file']"
                        @uploader="customBase64Uploader"
                        chooseLabel="Загрузить"
                      />
                      <Button icon="pi pi-user-edit" label="Изменить" @click="cropper_show_subSec = true" />
                    </div>
                    <span class="error" v-if="$vSubSection['file'].$error">
                      {{ $vSubSection['file'].$errors[0].$message }}
                    </span>
                  </div>
                  <div class="form__item">
                    <Dropdown
                      v-model="selectedItemInstall['subSectionUserId']"
                      option-label="label"
                      option-value="value"
                      placeholder="Глава дивизиона"
                      :class="{
                        'p-invalid': $vSubSection['subSectionUserId'].$error,
                      }"
                      @change="$vSubSection['subSectionUserId'].$touch"
                      :options="userStore?.users"
                      filter
                    />
                    <span class="error" v-if="$vSubSection['subSectionUserId'].$error">
                      {{ $vSubSection['subSectionUserId'].$errors[0].$message }}
                    </span>
                  </div>
                </form>
              </div>
            </div>
            <template #footer>
              <Button label="Сохранить" icon="pi pi-check" @click="addSubSectionFunction()" />
              <Button label="Отмена" icon="pi pi-times" @click="visible = false" />
            </template>
          </Dialog>
          <Dialog v-if="step === 6" v-model:visible="visible" :draggable="false" header="Добавить cсылку" modal>
            <div class="wrap-modal">
              <div class="modal-window__container">
                <form method="post">
                  <div class="form__item">
                    <Dropdown
                      v-model="selectedItemInstall['linksLocation']"
                      option-label="label"
                      option-value="value"
                      placeholder="Местоположение ссылки"
                      :class="{
                        'p-invalid': $vCoverage['linksLocation'].$error,
                      }"
                      @change="$vCoverage['linksLocation'].$touch"
                      :options="locationsLinks"
                    />
                    <span class="error" v-if="$vCoverage['linksLocation'].$error">
                      {{ $vCoverage['linksLocation'].$errors[0].$message }}
                    </span>
                  </div>
                  <div class="form__item">
                    <InputText
                      type="text"
                      v-model.trim="selectedItemInstall['linkLabel']"
                      :class="{
                        'p-invalid': $vCoverage['linkLabel'].$error,
                      }"
                      @change="$vCoverage['linkLabel'].$touch"
                      placeholder="Имя ссылки"
                    />
                    <span class="error" v-if="$vCoverage['linkLabel'].$error">
                      {{ $vCoverage['linkLabel'].$errors[0].$message }}
                    </span>
                  </div>
                  <div class="form__item">
                    <InputText
                      type="text"
                      v-model.trim="selectedItemInstall['link']"
                      :class="{
                        'p-invalid': $vCoverage['link'].$error,
                      }"
                      @change="$vCoverage['link'].$touch"
                      placeholder="Ссылка"
                    />
                    <span class="error" v-if="$vCoverage['link'].$error">
                      {{ $vCoverage['link'].$errors[0].$message }}
                    </span>
                  </div>
                </form>
              </div>
            </div>
            <template #footer>
              <Button label="Сохранить" icon="pi pi-check" @click="addLinkFunction()" />
              <Button label="Отмена" icon="pi pi-times" @click="visible = false" />
            </template>
          </Dialog>
          <Dialog v-if="step === 7" v-model:visible="visible" :draggable="false" header="Добавить рубрику" modal>
            <div class="modal-window__container">
              <form method="post">
                <div class="form__item">
                  <InputText
                    name="rubricLabel"
                    type="text"
                    v-model.trim="selectedItemInstall['rubricLabel']"
                    :class="{
                      'p-invalid': $vRubric['rubricLabel'].$error,
                    }"
                    @change="$vRubric['rubricLabel'].$touch"
                    placeholder="Введите название"
                  />
                  <span class="error" v-if="$vRubric['rubricLabel'].$error">
                    {{ $vRubric['rubricLabel'].$errors[0].$message }}
                  </span>
                </div>
              </form>
            </div>
            <template #footer>
              <Button label="Сохранить" icon="pi pi-check" @click="createRubric()" />
              <Button label="Отмена" icon="pi pi-times" @click="visible = false" />
            </template>
          </Dialog>
          <Dialog v-if="step === 8" v-model:visible="visible" :draggable="false" header="Добавить триаду" modal>
            <ModalsAddTriad @close-modal="(visible = false), show_toast($event)" />
          </Dialog>
          <Dialog v-if="step === 9" v-model:visible="visible" :draggable="false" header="Добавить категорию" modal>
            <ModalsAddServCat @close-modal="visible = $event" />
          </Dialog>
        </div>
      </div>
      <component
        :is="
          step === 1
            ? tableProjects
            : step === 2
            ? tableTeams
            : step === 3
            ? tableFranchises
            : step === 4
            ? tableCategories
            : step === 5
            ? tableSubSection
            : step === 6
            ? tableLinks
            : step === 7
            ? tableRubrics
            : step === 8
            ? tableTriads
            : step === 9
            ? tableServices
            : null
        "
      />
    </div>
  </div>
</template>

<script setup>
import { useVuelidate } from '@vuelidate/core';
import { required, helpers } from '@vuelidate/validators';
import { useCategoryStore } from '~/store/category';
import { useAdminListStore } from '~/store/adminList';
import { useTeamStore } from '~/store/team';
import tableProjects from '~/components/Blocks/tableProjects.vue';
import tableTeams from '~/components/Blocks/tableTeams.vue';
import tableFranchises from '~/components/Blocks/tableFranchises.vue';
import tableCategories from '~/components/Blocks/tableCategories.vue';
import tableSubSection from '~/components/Blocks/tableSubSection.vue';
import tableLinks from '~/components/Blocks/tableLinks.vue';
import tableRubrics from '~/components/Blocks/tableRubrics.vue';
import tableTriads from '~/components/Blocks/tableTriads.vue';
import tableServices from '~/components/Blocks/tableServices.vue';
import { useToast } from 'primevue/usetoast';
import { useUserStore } from '@/store/user';

const toast = useToast();
const orderCategories = ref([]);
const ind = ref(1);
const currentInd = ref(null);
const visible = ref(false);
const step = ref(1);
const categoryStore = useCategoryStore();
const teamStore = useTeamStore();
const adminListStore = useAdminListStore();
const userStore = useUserStore();
const locationsLinks = [
  { value: 1, label: 'Шапка' },
  { value: 2, label: 'Подвал' },
];
const selectedItemProject = reactive({
  projectLabel: '',
});
let image = ref('/_nuxt/assets/images/avatar.svg');
const cropper_show = ref(false);
const cropper_show_franch = ref(false);
const cropper_show_subSec = ref(false);
const cropper_show_team = ref(false);

await categoryStore.getAllLinks({ type: 1 });

const selectedItemInstall = reactive({
  rubricLabel: '',
  projectLabel: '',
  franchiseLabel: '',
  file: '',
  franchiseDescription: '',
  categoryLabel: '',
  teamLabel: '',
  subSectionLabel: '',
  subSectionId: '',
  subSectionUserId: '',
  linkLabel: '',
  link: '',
  adminId: '',
  teamDesc: '',
  linksLocation: '',
  type: 0,
});
const ruleProject = computed(() => {
  return {
    projectLabel: {
      required: helpers.withMessage('Введите название проекта', required),
    },
    file: {
      required: helpers.withMessage('Картинка обязательна', required),
    },
  };
});
const ruleTeam = computed(() => {
  return {
    teamLabel: {
      required: helpers.withMessage('Введите название команды', required),
    },
    adminId: {
      required: helpers.withMessage('Выберите владельца', required),
    },
    subSectionId: {
      required: helpers.withMessage('Выберите дивизион', required),
    },
    // teamDesc: {
    //   required: helpers.withMessage('Введите описание команды', required),
    // },
    file: {
      required: helpers.withMessage('Картинка обязательна', required),
    },
  };
});
const ruleFranchise = computed(() => {
  return {
    franchiseLabel: {
      required: helpers.withMessage('Введите название франшизы', required),
    },
    file: {
      required: helpers.withMessage('Картинка обязательна', required),
    },
    franchiseDescription: {
      required: helpers.withMessage('Введите описание франшизы', required),
    },
  };
});
const ruleCategory = computed(() => {
  return {
    categoryLabel: {
      required: helpers.withMessage('Введите название категории', required),
    },
  };
});
const ruleSubSection = computed(() => {
  return {
    subSectionLabel: {
      required: helpers.withMessage('Введите название дивизиона', required),
    },
    file: {
      required: helpers.withMessage('Картинка обязательна', required),
    },
    subSectionUserId: {
      required: helpers.withMessage('Выберите главу дивизиона', required),
    },
  };
});
const ruleCoverage = computed(() => {
  return {
    linkLabel: {
      required: helpers.withMessage('Введите название ссылки', required),
    },
    link: {
      required: helpers.withMessage('Введите ссылку', required),
    },
    linksLocation: {
      required: helpers.withMessage('Выберете располжение', required),
    },
  };
});
const ruleRubric = computed(() => {
  return {
    rubricLabel: {
      required: helpers.withMessage('Введите название рубрики', required),
    },
  };
});
const $vProject = useVuelidate(ruleProject, selectedItemInstall);
const $vTeam = useVuelidate(ruleTeam, selectedItemInstall);
const $vFranchise = useVuelidate(ruleFranchise, selectedItemInstall);
const $vCategory = useVuelidate(ruleCategory, selectedItemInstall);
const $vRubric = useVuelidate(ruleRubric, selectedItemInstall);
const $vSubSection = useVuelidate(ruleSubSection, selectedItemInstall);
const $vCoverage = useVuelidate(ruleCoverage, selectedItemInstall);

await adminListStore.requestAdminList();
await categoryStore.requestListSubsections();
await userStore.requestTrainerList();

function OpenDialog() {
  visible.value = !visible.value;
}

const show_toast = (result) => {
  toast.add({
    severity: errorValidate(result).toastType,
    summary: errorValidate(result).summary,
    detail: errorValidate(result).message,
    life: 3000,
  });
};

async function addProjectFunction() {
  $vProject.value.$validate();
  if ($vProject.value.$errors.length <= 1) {
    const data = new FormData();

    data.append('label', selectedItemInstall['projectLabel']);
    data.append('file', selectedItemInstall['file']);
    const result = await categoryStore.createProject(data);

    toast.add({
      severity: errorValidate(result).toastType,
      summary: errorValidate(result).summary,
      detail: errorValidate(result).message,
      life: 3000,
    });

    selectedItemInstall['projectLabel'] = '';
    visible.value = false;
  }
}

function getTrainers(arr) {
  let newArr = [];
  for (let i = 0; i < arr?.length; ++i) {
    if (!arr[i].team) newArr.push(arr[i]);
  }
  return newArr;
}

// const editNameProject = ref();
// async function editProjectFunction() {
//     const data  = new FormData();
// }

const file = ref(null);
let errorFormat = ref(null);
const customBase64Uploader = (event) => {
  const file = event.files[0];
  image.value = file.objectURL;
  if (document.querySelector(`.out-choose-image > img`)) {
    document.querySelector(`.out-choose-image > img`).src = file.objectURL;
  } else {
    document.querySelector(`.team-picture`).src = file.objectURL;
  }
  selectedItemInstall['file'] = file;
};

async function addTeamFunction() {
  $vTeam.value.$validate();
  // console.log($vTeam.value.$errors.length);
  if ($vTeam.value.$errors.length < 3) {
    const data = new FormData();
    data.append('label', selectedItemInstall['teamLabel']);
    data.append('userId', selectedItemInstall['adminId']);
    data.append('subsectionId', selectedItemInstall['subSectionId']);
    data.append('type', selectedItemInstall['type']);
    data.append('file', selectedItemInstall['file']);
    data.append('description', selectedItemInstall['teamDesc']);

    const result = await teamStore.createTeam(data);

    toast.add({
      severity: errorValidate(result).toastType,
      summary: errorValidate(result).summary,
      detail: errorValidate(result).message,
      life: 3000,
    });
    await userStore.requestTrainerList();
    selectedItemInstall['teamLabel'] = '';
    selectedItemInstall['adminId'] = '';
    selectedItemInstall['subSectionId'] = '';
    selectedItemInstall['file'] = '';
    selectedItemInstall['teamDesc'] = '';
    visible.value = false;
  }
}

async function addFranchiseFunction() {
  $vFranchise.value.$validate();
  if ($vFranchise.value.$errors.length <= 2) {
    const data = new FormData();
    data.append('label', selectedItemInstall['franchiseLabel']);
    data.append('file', selectedItemInstall['file']);
    data.append('description', selectedItemInstall['franchiseDescription']);

    const result = await categoryStore.createFranchise(data);

    toast.add({
      severity: errorValidate(result).toastType,
      summary: errorValidate(result).summary,
      detail: errorValidate(result).message,
      life: 3000,
    });

    selectedItemInstall['franchiseLabel'] = '';
    selectedItemInstall['file'] = '';
    selectedItemInstall['franchiseDescription'] = '';
    visible.value = false;
  }
}

async function addCategoryFunction() {
  $vCategory.value.$validate();
  if ($vCategory.value.$errors.length <= 1) {
    const data = new FormData();
    data.append('label', selectedItemInstall['categoryLabel']);

    const result = await categoryStore.createCategory(data);
    toast.add({ severity: 'success', summary: 'OK!', detail: 'Успешно' });
    // toast.add({ severity: errorValidate(result).toastType, summary: errorValidate(result).summary, detail: errorValidate(result).message, life: 3000 });

    selectedItemInstall['categoryLabel'] = '';
    visible.value = false;
  } else {
    toast.add({
      severity: errorValidate(result).toastType,
      summary: errorValidate(result).summary,
      detail: errorValidate(result).message,
      life: 3000,
    });
  }
}

async function createRubric() {
  $vRubric.value.$validate();
  if ($vRubric.value.$errors.length <= 1) {
    const data = new FormData();
    data.append('label', selectedItemInstall['rubricLabel']);

    const result = await categoryStore.createRubrics(data);
    toast.add({ severity: 'success', summary: 'OK!', detail: 'Успешно' });

    selectedItemInstall['rubricLabel'] = '';
    visible.value = false;
  } else {
    toast.add({
      severity: errorValidate(result).toastType,
      summary: errorValidate(result).summary,
      detail: errorValidate(result).message,
      life: 3000,
    });
  }
}

async function addSubSectionFunction() {
  $vSubSection.value.$validate();
  if ($vSubSection.value.$errors.length <= 1) {
    const data = new FormData();

    data.append('label', selectedItemInstall['subSectionLabel']);
    data.append('file', selectedItemInstall['file']);
    data.append('userId', selectedItemInstall['subSectionUserId']);

    const result = await categoryStore.createSubsection(data);

    toast.add({
      severity: errorValidate(result).toastType,
      summary: errorValidate(result).summary,
      detail: errorValidate(result).message,
      life: 3000,
    });

    selectedItemInstall['subSectionLabel'] = '';
    selectedItemInstall['file'] = '';
    selectedItemInstall['subSectionUserId'] = '';
    visible.value = false;
  }
}

async function addLinkFunction() {
  $vCoverage.value.$validate();
  if ($vCoverage.value.$errors.length <= 3) {
    const data = new FormData();

    data.append('label', selectedItemInstall['linkLabel']);
    data.append('url', selectedItemInstall['link']);
    data.append('type', selectedItemInstall['linksLocation']);
    const result = await categoryStore.createLink(data);
    await categoryStore.getAllLinks({ type: selectedItemInstall['linksLocation'] });
    toast.add({
      severity: errorValidate(result.status).toastType,
      summary: errorValidate(result.status).summary,
      detail: errorValidate(result.status).message,
      life: 3000,
    });
    selectedItemInstall['linkLabel'] = '';
    selectedItemInstall['link'] = '';
    selectedItemInstall['linksLocation'] = '';
    visible.value = false;
  }
}

const typeArr = [
  { id: 0, label: 'Обычная' },
  { id: 1, label: 'Элитная' },
];
</script>

<style lang="scss" scoped>
// .form__item {
//   display: flex;
//   flex-direction: column;
//   gap: 10px;
// }

.adminControl_btns_add_items {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.adminControl {
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 100%;
  .adminControl_btns {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
  }
  .adminControl_btns_item {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
  .p-dialog {
    width: 50vw;
  }
}
.category_content_item {
  button {
    background: transparent;
    box-shadow: none;
    background-image: url(~/assets/images/arrow_category.png);
    background-repeat: no-repeat;
    background-position: center center;
  }
}

.btn-active {
  background-color: #2ca8ff;
  color: white;
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

.btn_active {
  background: #2c96ea !important;
  border: 1px solid #2c96ea !important;
  color: white !important;
  transition: 0.3s !important;
}

.p-dialog-footer {
  padding-top: 10px !important;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.pagination_btns {
  display: flex;
  margin-top: 20px;
  gap: 20px;
}

.description_en {
  font-size: 12px;
}

.p-float-label {
  padding-bottom: 10px;
  margin-top: 13px;
}

@media (max-width: $medium) {
  .category_elements {
    min-width: 740px;
  }
}

@media (max-width: $small) {
  .adminControl {
    .adminControl_btns {
      flex-direction: column;
      gap: 20px;
      align-items: center;
    }
    .adminControl_btns_item {
      align-items: center;
    }
  }
}
@media (max-width: $x-small) {
  .adminControl_btns_add_items {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    .p-button {
      margin: 0 !important;
    }
  }
  .p-dialog {
    width: 90vw !important;
  }
}
</style>
