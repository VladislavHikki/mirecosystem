<template>
  <div class="profile_my-resource container">
    <div class="my-resource_tab_btns">
      <Button @click="tab = 1" :class="{ myresource_btn_active: tab === 1 }" class="button-resource">МОИ КАНАЛЫ</Button>
      <Button @click="tab = 2" :class="{ myresource_btn_active: tab === 2 }" class="button-resource">МОИ ЧАТЫ</Button>

      <Button @click="tab = 3" :class="{ myresource_btn_active: tab === 3 }" class="button-resource">МОИ БОТЫ</Button>
      <Button class="addResource" @click="visible = true"
        ><span style="margin-right: 5px" class="pi pi-plus"></span>ДОБАВИТЬ</Button
      >
      <Toast />
      <Dialog v-model:visible="visible" :draggable="false" header="Добавить ресурс" modal style="width: 90%">
        <ModalsAddResource :checkValidate="check" @update-formData="newFormData" :formData="formData" />
        <template #footer>
          <Button type="submit" label="Сохранить" icon="pi pi-check" @click="submit" />
          <Button label="Отмена" icon="pi pi-times" @click="visible = false" />
        </template>
      </Dialog>
    </div>

    <component :is="tab === 1 ? myChannel : tab === 2 ? myChat : tab === 3 ? myBots : null" />
  </div>
</template>

<script setup>
import myChannel from '~~/components/Blocks/myChannel.vue';
import myChat from '~~/components/Blocks/myChat.vue';
import myBots from '~~/components/Blocks/myBots.vue';
import editResource from '~~/components/modals/editResource.vue';
import { useResourceStore } from '~/store/resource';
import { useToast } from 'primevue/usetoast';

const toast = useToast();
const resourceStore = useResourceStore();
const tab = ref(1);
const isChannel = ref(true);
const modalWindow = ref(null);
const showModal = ref(false);
const isChat = ref(false);
const isBots = ref(false);
const visible = ref(false);
const check = ref(false);

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
  coverage: null,
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
    // formData.team = value[0].team;
    formData.image = value[0].image;
    formData.category = value[0].category;
    formData.coverage = value[0].coverage;
    formData.curator = value[0].curator?.value;
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
        error = false;
        data.append('countryId', formData.country?.id);
        data.append('regionId', formData.region?.id);
        data.append('cityId', formData.city?.id);
      }
    }

    data.append('projectId', formData.project?.value);
    data.append('categoryId', formData.category?.value);
    data.append('coverageId', formData.coverage?.value);
    data.append('franchiseId', formData.franchise?.value);
    // data.append('teamId', formData.team?.value);
    data.append('restypeId', formData.type?.id);

    if (!error) {
      const result = await resourceStore.requestCreate(data);

      toast.add({
        severity: errorValidate(result).toastType,
        summary: errorValidate(result).summary,
        detail: errorValidate(result).message,
        life: 3000,
      });

      visible.value = false;
    }
  }
};
</script>
