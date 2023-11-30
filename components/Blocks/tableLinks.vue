<template>
  <div class="category_container">
    <h1>Ссылки: {{ categoryStore?.links?.count }}</h1>
    <div class="links_elements">
      <Toast />
      <TabView v-model:activeIndex="tab">
        <TabPanel header="Ссылки в шапке">
          <DataTable :value="categoryStore?.links?.rows" tableStyle="min-width: 50rem">
            <Column field="label" header="Название"></Column>
            <Column field="url" header="Ссылка"></Column>
            <Column header="Действия">
              <template #body="slotProps">
                <div class="category_content_btns">
                  <Button
                    @click="
                      (visibleEdit = true),
                        (currentLink = slotProps?.data),
                        (selectedLink['url'] = slotProps?.data?.url),
                        (selectedLink['label'] = slotProps?.data?.label),
                        (selectedLink['type'] = slotProps?.data?.type)
                    "
                    class="red"
                  ></Button>
                  <Button @click="(visibleDel = true), (currentLink = slotProps?.data?.id)" class="delete"></Button>
                </div>
              </template>
            </Column>
          </DataTable>
          <div class="link_content_result" style="margin-top: 20px">
            {{ declOfNum(categoryStore?.links?.count, ['Показан', 'Показано', 'Показано']) }}
            {{ categoryStore?.links?.count }}
            {{ declOfNum(categoryStore?.links?.count, ['результат', 'результата', 'результатов']) }}
          </div>
        </TabPanel>
        <TabPanel header="Ссылки в подвале">
          <DataTable :value="categoryStore?.links?.rows" tableStyle="min-width: 50rem">
            <Column field="label" header="Название"></Column>
            <Column field="url" header="Ссылка"></Column>
            <Column header="Действия">
              <template #body="slotProps">
                <div class="category_content_btns">
                  <Button
                    @click="
                      (visibleEdit = true),
                        (currentLink = slotProps?.data),
                        (selectedLink['url'] = slotProps?.data?.url),
                        (selectedLink['label'] = slotProps?.data?.label),
                        (selectedLink['type'] = slotProps?.data?.type)
                    "
                    class="red"
                  ></Button>
                  <Button @click="(visibleDel = true), (currentLink = slotProps?.data?.id)" class="delete"></Button>
                </div>
              </template>
            </Column>
          </DataTable>
          <div class="link_content_result" style="margin-top: 20px">
            {{ declOfNum(categoryStore?.links?.count, ['Показан', 'Показано', 'Показано']) }}
            {{ categoryStore?.links?.count }}
            {{ declOfNum(categoryStore?.links?.count, ['результат', 'результата', 'результатов']) }}
          </div>
        </TabPanel>
      </TabView>
      <Dialog :draggable="false" v-model:visible="visibleDel" header="Удалить ссылку" modal>
        <h2>Вы уверены, что хотите удалить ссылку?</h2>
        <template #footer>
          <Button label="Удалить" icon="pi pi-check" @click="deleteLinkFunction()" />
          <Button label="Отмена" icon="pi pi-times" @click="(visibleDel = false), (currentLink = null)" />
        </template>
      </Dialog>
      <Dialog :draggable="false" v-model:visible="visibleEdit" header="Редактировать ссылку" modal>
        <div class="modal-window__container">
          <form method="post">
            <!-- <form method="post"> -->
            <div class="form__item">
              <Dropdown
                v-model="selectedLink['type']"
                option-label="label"
                option-value="value"
                placeholder="Местоположение ссылки"
                :class="{
                  'p-invalid': $vLink['type'].$error,
                }"
                @change="$vLink['type'].$touch"
                :options="locationsLinks"
              />
            </div>
            <div class="form__item">
              <InputText
                :value="selectedLink['label']"
                placeholder="Название ссылки"
                v-model="selectedLink['label']"
                :class="{
                  'p-invalid': $vLink['label'].$error,
                }"
                @change="$vLink['label'].$touch"
              />
              <span class="error" v-if="$vLink['label'].$error">
                {{ $vLink['label'].$errors[0].$message }}
              </span>
            </div>
            <div class="form__item">
              <InputText
                :value="selectedLink['url']"
                placeholder="Ссылка"
                v-model="selectedLink['url']"
                :class="{
                  'p-invalid': $vLink['url']?.$error,
                }"
                @change="$vLink['url'].$touch"
              />
              <span class="error" v-if="$vLink['url'].$error">
                {{ $vLink['url'].$errors[0].$message }}
              </span>
            </div>
            <!-- </form> -->
          </form>
        </div>
        <template #footer>
          <Button label="Сохранить" icon="pi pi-check" @click="editLinkFunction()" />
          <Button label="Отмена" icon="pi pi-times" @click="(visibleEdit = false), (currentLink = null)" />
        </template>
      </Dialog>
    </div>
  </div>
</template>

<script setup>
import { useCategoryStore } from '@/store/category';
import { useToast } from 'primevue/usetoast';
import { useVuelidate } from '@vuelidate/core';
import { required, helpers } from '@vuelidate/validators';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';

const categoryStore = useCategoryStore();
await categoryStore.getAllLinks();

let visibleDel = ref(false);
let visibleEdit = ref(false);
let currentLink = ref(null);
let tab = ref(0);
const locationsLinks = [
  { value: 1, label: 'Шапка' },
  { value: 2, label: 'Подвал' },
];

let selectedLink = reactive({
  label: null,
  url: null,
  type: null,
});

onMounted(async () => {
  await categoryStore.getAllLinks({ type: tab.value + 1 });
});

watch(tab, async () => {
  switch (tab.value) {
    case 0:
      await categoryStore.getAllLinks({ type: 1 });
      break;
    case 1:
      await categoryStore.getAllLinks({ type: 2 });
      break;
    default:
      break;
  }
});

const rules = computed(() => {
  return {
    label: {
      required: helpers.withMessage('Введите название ссылки', required),
    },
    url: {
      required: helpers.withMessage('Введите ссылку', required),
    },
    type: {
      required: helpers.withMessage('Введите ссылку', required),
    },
  };
});

const $vLink = useVuelidate(rules, selectedLink);

const toast = useToast();

async function editLinkFunction() {
  $vLink.value.$validate();
  if (!$vLink.value.$errors?.length) {
    let data = new FormData();
    data.append('label', selectedLink.label);
    data.append('url', selectedLink.url);
    data.append('type', selectedLink.type);
    const result = await categoryStore.editLink(currentLink.value.id, data);
    toast.add({
      severity: errorValidate(result.status).toastType,
      summary: errorValidate(result.status).summary,
      detail: errorValidate(result.status).message,
      life: 3000,
    });
    visibleEdit.value = false;
    currentLink.value = null;
    await categoryStore.getAllLinks({ type: tab.value + 1 });
  }
}

async function deleteLinkFunction() {
  const result = await categoryStore.deleteLink(currentLink.value);
  toast.add({
    severity: errorValidate(result.status).toastType,
    summary: errorValidate(result.status).summary,
    detail: errorValidate(result.status).message,
    life: 3000,
  });
  visibleDel.value = false;
  currentLink.value = null;
  await categoryStore.getAllLinks({type: tab.value + 1});
}
</script>

<style lang="scss">
.links_elements {
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
    .delete {
      background: #f81111;
      background-image: url(~/assets/images/delete.png);
      background-position: center center;
      background-repeat: no-repeat;
    }
  }
}
</style>
