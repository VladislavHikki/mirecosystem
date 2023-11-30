<template>
  <div class="category_container">
    <h1>Триады: {{ triadsStore.getTriads?.count }}</h1>
    <Toast />
    <div class="category_elements">
      <DataTable :value="triadsStore.getTriads?.rows" dataKey="id" tableStyle="min-width: 50rem">
        <Column field="label" header="Название"></Column>
        <Column field="createdAt" header="Дата создания">
          <template #body="slotProps">
            {{
              new Date(slotProps?.data?.createdAt)?.toLocaleString('locale', {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
                minute: 'numeric',
                hour: 'numeric',
              })
            }}
          </template>
        </Column>
        <Column field="id" header="Действия">
          <template #body="slotProps">
            <div class="category_content_btns">
              <Button @click="(visible = true), (currentTriad = slotProps.data)" class="red"></Button>
              <Button @click="(show_modal_del_triad = true), (currentTriad = slotProps.data)" class="delete"></Button>
            </div>
          </template>
        </Column>
      </DataTable>
      <Dialog v-model:visible="visible" :draggable="false" header="Редактировать триаду" modal :style="{ width: '50vw' }">
        <ModalsEditTriads @closeModal="(visible = false), show_toast($event)" :triad_info="currentTriad" />
      </Dialog>
      <Dialog
        v-model:visible="show_modal_del_triad"
        :draggable="false"
        header="Удалить триаду"
        modal
        :style="{ width: '50vw' }"
      >
        <h2>Вы уверены, что хотите удалить триаду?</h2>
        <template #footer>
          <Button
            label="Удалить"
            icon="pi pi-check"
            @click="deleteTriad(currentTriad?.id), (show_modal_del_triad = false)"
          />
          <Button label="Отмена" icon="pi pi-times" @click="show_modal_del_triad = false" />
        </template>
      </Dialog>
      <div class="pagination_btns">
        <Paginator
          v-if="triadsStore?.triads?.pages > 1"
          :template="{
            '640px': 'PrevPageLink CurrentPageReport NextPageLink',
            '960px': 'FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink',
            '1300px': 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink',
            default: 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink JumpToPageDropdown JumpToPageInput',
          }"
          v-model:first="page"
          :total-records="triadsStore?.triads?.pages"
          :rows="1"
          currentPageReportTemplate="{last} из {totalRecords}"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useTriadsStore } from '@/store/triads';
import { useToast } from 'primevue/usetoast';
import { useCategoryStore } from '~/store/category';
import { useUserStore } from '~/store/user';

const toast = useToast();
const userStore = useUserStore();
const triadsStore = useTriadsStore();
const categoryStore = useCategoryStore();
const emit = defineEmits(['closeModal']);
let visible = ref(false);
let show_modal_del_triad = ref(false);
let currentTriad = ref();

await categoryStore.requestListSubsections();
await userStore.requestUserList();

await triadsStore.requestTriads(1, { list: true });

let page = ref(0);

const deleteTriad = async (id) => {
  const result = await triadsStore.deleteTriad(id);
  show_toast(result);
};

const show_toast = (result) => {
  if (result == 'close') return true;
  toast.add({
    severity: errorValidate(result).toastType,
    summary: errorValidate(result).summary,
    detail: errorValidate(result).message,
    life: 3000,
  });
};

watch(page, async () => {
  await triadsStore.requestTriads(page.value + 1, { list: true });
});
</script>
