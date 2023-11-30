<template>
  <div class="category_container">
    <h1>Охваты</h1>
    <!-- <Toast/> -->
    <div class="category_elements">
      <!-- <div class="category_item" 
                    v-for="(value, index) in categoryStore?.categories?.categories?.rows" :key="index"
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
      <TabView>
        <TabPanel header="Городские">
          <DataTable :value="coverage" tableStyle="min-width: 50rem">
            <Column field="label" header="Название"></Column>
            <Column field="value" header="value(Просто пример)"></Column>
            <!-- <Column field="createdAt" header="Дата создания">
                                <template #body="slotProps">
                                    {{ new Date(slotProps.data.createdAt).toLocaleString() }}
                                </template>
                            </Column> -->
            <Column header="Действия">
              <template #body="slotProps">
                <div class="category_content_btns">
                  <!-- <Button @click="editCategory(slotProps.data.id, slotProps.data)" class="red"></Button>
                                       <Button @click="softDeleteInstall(slotProps.data.id, false)" class="pause"></Button>
                                        <Button @click="deleteInstall(slotProps.data.id, true)" class="delete"></Button> -->
                  <Button @click="editCoverage(slotProps.data.id, slotProps.data.label)" class="red"></Button>
                  <Button class="pause" />
                  <Button class="delete" />
                </div>
              </template>
            </Column>
          </DataTable>
          <div class="pagination_btns">
            <Paginator
              v-if="coverage?.length"
              :template="{
                '640px': 'PrevPageLink CurrentPageReport NextPageLink',
                '960px': 'FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink',
                '1300px': 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink',
                default: 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink JumpToPageDropdown JumpToPageInput',
              }"
              v-model:first="page"
              :total-records="1"
              :rows="1"
              currentPageReportTemplate="{last} из {totalRecords}"
            />
          </div>
        </TabPanel>
        <TabPanel header="Региональные">
          <DataTable :value="coverage" tableStyle="min-width: 50rem">
            <Column field="label" header="Название"></Column>
            <Column field="value" header="value(Просто пример)"></Column>
            <!-- <Column field="createdAt" header="Дата создания">
                                <template #body="slotProps">
                                    {{ new Date(slotProps.data.createdAt).toLocaleString() }}
                                </template>
                            </Column> -->
            <Column header="Действия">
              <template #body="slotProps">
                <div class="category_content_btns">
                  <!-- <Button @click="editCategory(slotProps.data.id, slotProps.data)" class="red"></Button>
                                       <Button @click="softDeleteInstall(slotProps.data.id, false)" class="pause"></Button>
                                        <Button @click="deleteInstall(slotProps.data.id, true)" class="delete"></Button> -->
                  <Button @click="editCoverage(slotProps.data.id, slotProps.data)" class="red"></Button>
                  <Button class="pause" />
                  <Button class="delete" />
                </div>
              </template>
            </Column>
          </DataTable>
          <div class="pagination_btns">
            <Paginator
              v-if="coverage?.length"
              :template="{
                '640px': 'PrevPageLink CurrentPageReport NextPageLink',
                '960px': 'FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink',
                '1300px': 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink',
                default: 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink JumpToPageDropdown JumpToPageInput',
              }"
              v-model:first="page"
              :total-records="1"
              :rows="1"
              currentPageReportTemplate="{last} из {totalRecords}"
            />
          </div>
        </TabPanel>
        <TabPanel header="Национально-Международные">
          <DataTable :value="coverage" tableStyle="min-width: 50rem">
            <Column field="label" header="Название"></Column>
            <Column field="value" header="value(Просто пример)"></Column>
            <!-- <Column field="createdAt" header="Дата создания">
                                <template #body="slotProps">
                                    {{ new Date(slotProps.data.createdAt).toLocaleString() }}
                                </template>
                            </Column> -->
            <Column header="Действия">
              <template #body="slotProps">
                <div class="category_content_btns">
                  <!-- <Button @click="editCategory(slotProps.data.id, slotProps.data)" class="red"></Button>
                                       <Button @click="softDeleteInstall(slotProps.data.id, false)" class="pause"></Button>
                                        <Button @click="deleteInstall(slotProps.data.id, true)" class="delete"></Button> -->
                  <Button @click="editCoverage(slotProps.data.id, slotProps.data)" class="red"></Button>
                  <Button class="pause" />
                  <Button class="delete" />
                </div>
              </template>
            </Column>
          </DataTable>
          <div class="pagination_btns">
            <Paginator
              v-if="coverage?.length"
              :template="{
                '640px': 'PrevPageLink CurrentPageReport NextPageLink',
                '960px': 'FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink',
                '1300px': 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink',
                default: 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink JumpToPageDropdown JumpToPageInput',
              }"
              v-model:first="page"
              :total-records="1"
              :rows="1"
              currentPageReportTemplate="{last} из {totalRecords}"
            />
          </div>
        </TabPanel>
      </TabView>

      <Dialog v-model:visible="visibleEdit" modal :draggable="false" header="Редактировать охват" :style="{ width: '50vw' }">
        <div>
          <div class="modal-window__content">
            <div class="modal-window__container">
              <div class="form__item">
                <div class="form__item">
                  <InputText
                    name="label"
                    id="label"
                    v-model="selectedItem.label"
                    type="text"
                    :class="{ 'p-invalid': $v['label'].$error }"
                    @change="$v['label'].$touch"
                    :value="selectedItem.label"
                    placeholder="Наименование охвата"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <template #footer>
          <Button label="Сохранить" icon="pi pi-check" />
          <Button label="Отмена" icon="pi pi-times" @click="visibleEdit = false" />
        </template>
      </Dialog>
      <!-- <Dialog v-model:visible="visibleSoftDel" header="Приостановить категорию" modal :style="{ width: '50vw' }">
                    <h2>Вы уверены, что хотите приостановить категорию?</h2>
                    <template #footer>
                        <Button label="Приостановить" icon="pi pi-check" @click="deleteInstallFunction()" />
                        <Button label="Отмена" icon="pi pi-times" @click="visibleSoftDel = false" />
                    </template>
                </Dialog> -->
      <!-- <Dialog v-model:visible="visibleDel" header="Удалить категорию" modal :style="{ width: '50vw' }">
                    <h2>Вы уверены, что хотите удалить категорию?</h2>
                    <template #footer>
                        <Button label="Удалить" icon="pi pi-check" @click="deleteInstallFunction()" />
                        <Button label="Отмена" icon="pi pi-times" @click="visibleDel = false" />
                    </template>
                </Dialog> -->
    </div>
    <!-- <div class="pagination_btns">
                <Paginator
                    v-if="categoryStore?.categories?.categories?.rows?.length"
                    :template="{
                        '640px': 'PrevPageLink CurrentPageReport NextPageLink',
                        '960px': 'FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink',
                        '1300px': 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink',
                        default: 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink JumpToPageDropdown JumpToPageInput'
                    }"
                    v-model:first="page"
                    :total-records="categoryStore.categories?.pages"
                    :rows="1"
                    currentPageReportTemplate="{last} из {totalRecords}"
                />
            </div> -->
  </div>
</template>

<script setup>
import { useVuelidate } from '@vuelidate/core';
import { required, helpers } from '@vuelidate/validators';

const visibleEdit = ref(false);
const selectedItem = reactive({
  id: '',
  ids: '',
  label: null,
  force: true,
});

const rules = computed(() => {
  return {
    label: {
      required: helpers.withMessage('Введите название', required),
    },
  };
});

const $v = useVuelidate(rules, selectedItem);

const page = ref(0);

function editCoverage(ids, label) {
  selectedItem['ids'] = ids;
  selectedItem.label = label;
  visibleEdit.value = !visibleEdit.value;
}

import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
let coverage = [
  { label: 'Россия-мир', value: 1, nationality: true },
  { label: 'Россия-регионы', value: 2, nationality: false },
  { label: 'Беларусь-мир', value: 5, nationality: true },
  { label: 'Беларусь-регионы', value: 4, nationality: false },
];
</script>
