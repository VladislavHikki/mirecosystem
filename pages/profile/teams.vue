<template>
  <div class="container">
    <div class="profile_teams">
      <!-- <pre>
      {{ userStore?.data?.roles }}
    </pre> -->
      <h2 class="page-title">Мои команды</h2>
      <div class="team" v-if="checkRoles(userStore?.data?.roles, 2)">
        <div class="team_tab_btns">
          <Button class="team_btn" @click="tab = 1" :class="{ team_btn_active: tab === 1 }">ВЛАДЕЛЕЦ</Button>
          <Button class="team_btn" @click="tab = 2" :class="{ team_btn_active: tab === 2 }">ИГРОК</Button>
          <Button class="addTeam_btn" @click="visible = true"
            ><span style="margin-right: 5px" class="pi pi-plus"></span>ДОБАВИТЬ</Button
          >
        </div>
        <component :is="tab === 1 ? trainer : tab === 2 ? player : null" />
      </div>
      <div class="player" v-else>
        <player />
      </div>
      <Toast />
      <Dialog modal header="Редактировать изображение команды" v-model:visible="cropper_visible">
        <UICropper
          @get-image="(cropper_visible = false), (selectedItem['file'] = $event?.file), (image = $event?.url)"
          :image="selectedItem['file']"
          isAvatar
        />
      </Dialog>
      <Dialog v-model:visible="visible" :draggable="false" header="Добавить команду" modal :style="{ width: '50vw' }">
        <div class="modal-window__container">
          <form method="post">
            <div class="form__item">
              <InputText
                name="teamLabel"
                type="text"
                v-model.trim="selectedItem['teamLabel']"
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
                name="subsectionId"
                option-label="label"
                option-value="id"
                v-model="selectedItem['subsectionId']"
                :class="{ 'p-invalid': $vTeam['subsectionId'].$error }"
                @change="$vTeam['subsectionId'].$touch"
                :options="categoryStore?.subsectionsList"
                placeholder="Дивизион"
              />
              <span class="error" v-if="$vTeam['subsectionId'].$error">
                {{ $vTeam['subsectionId'].$errors[0].$message }}
              </span>
            </div>
            <div class="form__item">
              <Dropdown
                name="subsectionId"
                option-label="label"
                option-value="id"
                v-model="selectedItem['type']"
                :options="types"
                placeholder="Тип"
              />
              <span class="error" v-if="$vTeam['subsectionId'].$error">
                {{ $vTeam['subsectionId'].$errors[0].$message }}
              </span>
            </div>
            <div class="form__item">
              <div class="form-upload">
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
                  mode="basic"
                  :auto="true"
                  name="demo[]"
                  accept="image/*"
                  customUpload
                  v-model="selectedItem['file']"
                  @uploader="customBase64Uploader"
                  chooseLabel="Загрузить"
                />
                <Button icon="pi pi-user-edit" label="Изменить" @click="cropper_visible = true" />
                <span class="error" v-if="$vTeam['file'].$error">
                  {{ $vTeam['file'].$errors[0].$message }}
                </span>
              </div>
            </div>
            <div class="form__item">
              <span class="p-float-label">
                <Textarea name="teamDesc" v-model.trim="selectedItem['teamDesc']" rows="5" cols="45" />
                <label>Введите описание</label>
              </span>
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
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import trainer from '~~/components/Blocks/trainer.vue';
import player from '~~/components/Blocks/player.vue';
import { useUserStore } from '~/store/user';
import { useVuelidate } from '@vuelidate/core';
import { required, helpers } from '@vuelidate/validators';
import { useTeamStore } from '~/store/team';
import { useToast } from 'primevue/usetoast';
import { useCategoryStore } from '~/store/category';

const userStore = useUserStore();
const categoryStore = useCategoryStore();
const teamStore = useTeamStore();
const types = [
  { label: 'Обычная', id: 0 },
  { label: 'Элитная', id: 1 },
];
let visible = ref(false);
const selectedItem = reactive({
  file: '',
  categoryLabel: '',
  teamLabel: '',
  userId: '',
  teamDesc: '',
  subsectionId: '',
  type: 0,
});
const cropper_visible = ref(false);

await teamStore.requestUsersTeam(1);
await userStore.requestProfile(userStore.data.id);

let tab = ref(1);

const toast = useToast();
const image = ref('/_nuxt/assets/images/avatar.svg');

const ruleTeam = computed(() => {
  return {
    teamLabel: {
      required: helpers.withMessage('Введите название команды', required),
    },
    subsectionId: {
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

await categoryStore.requestListSubsections();

const $vTeam = useVuelidate(ruleTeam, selectedItem);

const customBase64Uploader = (event) => {
  const file = event.files[0];
  if (document.querySelector(`.out-choose-image > img`)) {
    document.querySelector(`.out-choose-image > img`).src = file.objectURL;
  } else {
    document.querySelector(`.team-picture`).src = file.objectURL;
  }
  selectedItem['file'] = file;
};

async function addTeamFunction() {
  $vTeam.value.$validate();
  if ($vTeam.value.$errors.length <= 4) {
    const data = new FormData();

    data.append('label', selectedItem['teamLabel']);
    data.append('userId', userStore?.profile?.user?.id);
    data.append('subsectionId', selectedItem['subsectionId']);
    data.append('file', selectedItem['file']);
    data.append('description', selectedItem['teamDesc']);
    data.append('type', selectedItem['type']);
    const result = await teamStore.createTeam(data);
    toast.add({
      severity: errorValidate(result).toastType,
      summary: errorValidate(result).summary,
      detail: errorValidate(result).message,
      life: 3000,
    });
    await teamStore.requestUsersTeam(1);

    selectedItem['teamLabel'] = '';
    selectedItem['adminId'] = '';
    selectedItem['subSectionId'] = '';
    selectedItem['file'] = '';
    selectedItem['teamDesc'] = '';
    visible.value = false;
  }
}
</script>
