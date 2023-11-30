<template>
  <div class="trainer" v-if="isTeam(teamStore?.userTeam?.myTeams?.rows)">
    <div class="trainer-cards" v-for="(value, index) in teamStore?.userTeam?.myTeams?.rows" :key="index">
      <div class="card">
        <CardsTeam :data="value" :isTrainerProfile="true" :teamImgInProfile="userStore?.profile?.user?.avatar" />
        <div class="myResourceCard_btn">
          <Button
            class="myResourceCard_operation_red"
            label="РЕДАКТИРОВАТЬ"
            @click="(visible = true), (editTeamInfo = value), editTeam()"
          />

          <Button class="myResourceCard_operation_del" label="УДАЛИТЬ" @click="(visibleDel = true), (idTeam = value.id)" />
        </div>
      </div>
    </div>
  </div>
  <div class="pagination_btns" v-if="isTeam(teamStore?.userTeam?.myTeams?.rows)">
    <Paginator
      v-if="teamStore?.userTeam?.myPages > 1"
      :template="{
        '640px': 'PrevPageLink CurrentPageReport NextPageLink',
        '960px': 'FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink',
        '1300px': 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink',
        default: 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink JumpToPageDropdown JumpToPageInput',
      }"
      v-model:first="page"
      :total-records="teamStore?.userTeam?.myPages"
      :rows="1"
      currentPageReportTemplate="{last} из {totalRecords}"
    />
  </div>
  <div class="message" v-if="!isTeam(teamStore?.userTeam?.myTeams?.rows)">
    <h2>Вы не являетесь владельцем ни в одной команде</h2>
  </div>
  <Toast />
  <Dialog modal header="Редактировать изображение команды" v-model:visible="cropper_visible">
    <UICropper
      @get-image="(cropper_visible = false), (selectedItem['trainer'].image = $event?.file), (image = $event?.url)"
      :image="selectedItem['trainer'].image"
      isAvatar
    />
  </Dialog>
  <Dialog v-model:visible="visible" :draggable="false" header="Редактировать команду" modal :style="{ width: '50vw' }">
    <div class="modal-window__container">
      <form method="post">
        <div class="form__item">
          <InputText
            v-model.trim="selectedItem['trainer'].label"
            :value="selectedItem['trainer'].label"
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
            v-model="selectedItem['trainer'].subSectionId"
            option-label="label"
            option-value="id"
            :options="categoryStore?.subsectionsList"
            placeholder="Дивизион"
            @change="check('subsection')"
          />
          <span class="error" v-if="$v['subSectionId'].$error">
            {{ $v['subSectionId'].$errors[0].$message }}
          </span>
        </div>
        <div class="form__item">
          <!-- <pre>
              {{ selectedItem['trainer'].type }}
            </pre> -->
          <Dropdown
            v-model="selectedItem['trainer'].type"
            option-label="label"
            option-value="id"
            :options="types"
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
                v-if="selectedItem['trainer'].type == 0"
                loading="lazy"
                width="100"
                height="100"
                :src="image"
                alt=""
              />
              <div
                v-else-if="selectedItem['trainer'].type == 1"
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
              v-model="selectedItem['trainer'].image"
              customUpload
              @uploader="customBase64UploaderTeam"
              chooseLabel="Загрузить"
            />
            <Button icon="pi pi-user-edit" label="Изменить" @click="cropper_visible = true" />
            <span class="error" v-if="$v['image'].$error">
              {{ $v['image'].$errors[0].$message }}
            </span>
          </div>
        </div>
        <div class="form__item p-float-label">
          <span class="p-float-label">
            <Textarea
              v-model.trim="selectedItem['trainer'].description"
              :value="selectedItem['trainer'].description"
              rows="5"
              cols="45"
            />
            <label>Введите описание</label>
          </span>
        </div>
      </form>
    </div>
    <template #footer>
      <Button label="Сохранить" icon="pi pi-check" @click="submit()" />
      <Button label="Отмена" icon="pi pi-times" @click="visible = false" />
    </template>
  </Dialog>

  <Dialog v-model:visible="visibleDel" :draggable="false" header="Удалить команду" modal :style="{ width: '50vw' }">
    <h2>Вы уверены, что хотите удалить команду?</h2>
    <template #footer>
      <Button label="Удалить" icon="pi pi-check" @click="deleteInstallFunction()" />
      <Button label="Отмена" icon="pi pi-times" @click="visibleDel = false" />
    </template>
  </Dialog>
</template>

<script setup>
import { useTeamStore } from '~/store/team';
import { useUserStore } from '~/store/user';
import { useVuelidate } from '@vuelidate/core';
import { required, helpers } from '@vuelidate/validators';
import { useToast } from 'primevue/usetoast';
import { useCategoryStore } from '~/store/category';

let page = ref(0);
const userStore = useUserStore();
const teamStore = useTeamStore();
const categoryStore = useCategoryStore();
let visible = ref(false);
let visibleDel = ref(false);
let idTeam = ref(null);
const cropper_visible = ref(false);
const selectedItem = reactive({
  trainer: {
    label: null,
    description: null,
    userId: null,
    subSectionId: null,
    image: null,
    id: null,
    type: null,
  },
});
const toast = useToast();
const image = ref('@/assets/avatar.svg');
const editTeamInfo = ref(null);
const types = [
  { id: 0, label: 'Обычная' },
  { id: 1, label: 'Элитная' },
];
const rules = computed(() => {
  return {
    label: {
      required: helpers.withMessage('Введите название', required),
    },
    subSectionId: {
      required: helpers.withMessage('Выберете дивизион', required),
    },
    // description: {
    //   required: helpers.withMessage('Введите описание', required),
    // },
    image: {
      required: helpers.withMessage('Картинка обязательна', required),
    },
  };
});

await teamStore.requestUsersTeam(1);
await userStore.requestProfile(userStore.data.id);
await categoryStore.requestListSubsections();

const $v = useVuelidate(rules, selectedItem['trainer']);

async function submit() {
  $v.value.$validate();
  if ($v.value.$error == 0) {
    const data = new FormData();
    typeof selectedItem['trainer'].image == 'object'
      ? data.append('file', selectedItem['trainer'].image)
      : data.append('file', null);

    if (selectedItem['trainer'].label) data.append('label', selectedItem['trainer'].label);
    if (selectedItem['trainer'].userId) data.append('userId', selectedItem['trainer'].userId);
    if (selectedItem['trainer'].subSectionId) data.append('subsectionId', selectedItem['trainer'].subSectionId);
    if (selectedItem['trainer'].description) data.append('description', selectedItem['trainer'].description);
    if (selectedItem['trainer'].type || selectedItem['trainer'].type == 0) data.append('type', selectedItem['trainer'].type);
    data.append('userId', userStore?.user?.id);
    const result = await teamStore.updateTeam(selectedItem['trainer'].id, data, page.value + 1);
    await teamStore.requestUsersTeam(page.value + 1);

    toast.add({
      severity: errorValidate(result).toastType,
      summary: errorValidate(result).summary,
      detail: errorValidate(result).message,
      life: 3000,
    });

    selectedItem['trainer'] = {};
    visible.value = !visible.value;
  }
}

const customBase64UploaderTeam = (event) => {
  const file = event.files[0];
  selectedItem['trainer'].image = file;
  image.value = getImageUrl(selectedItem['trainer'].image);
};

function editTeam() {
  selectedItem['trainer'].label = editTeamInfo.value.label;
  selectedItem['trainer'].description = editTeamInfo.value.description;
  selectedItem['trainer'].userId = editTeamInfo.value.userId;
  selectedItem['trainer'].subSectionId = editTeamInfo.value.subsectionId;
  selectedItem['trainer'].image = editTeamInfo.value.picture;
  selectedItem['trainer'].id = editTeamInfo.value.id;
  selectedItem['trainer'].type = editTeamInfo.value.type;
  image.value = getImageUrl(editTeamInfo.value.picture);
}

let selectPage = async (value) => {
  await teamStore.requestUsersTeam(value);
};

function isTeam(team) {
  if (team?.length) {
    return true;
  }
  return false;
}

async function deleteInstallFunction() {
  const data = new FormData();
  data.append('ids', idTeam.value);

  const result = await teamStore.deleteTeam(data, page.value + 1);

  toast.add({ severity: 'success', summary: 'ОК!', detail: 'Команда удалена', life: 3000 });
  selectedItem.value = {};

  if (visibleDel.value) visibleDel.value = !visibleDel.value;
  selectPage(page.value + 1);
}

function check(inputName) {
  if (inputName == 'subsection') {
    selectedItem.value.subSectionId = editTeamInfo.value.subsectionId;
  }
}
</script>

<style lang="scss" scoped>
.p-dropdown {
  margin-bottom: 0 !important;
}
.trainer {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.trainer-cards {
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

.pagination_btns {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

@media (max-width: $large) {
  .trainer_card {
    width: 100%;
  }
}
</style>
