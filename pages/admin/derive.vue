<template>
  <div class="derive container">
    <Toast />
    <Dialog :draggable="false" v-model:visible="visibleAddDerive" header="Создать Валюту">
      <ModalsAddDerive @closeModal="showToast($event), (visibleAddDerive = false)" />
    </Dialog>
    <Dialog :draggable="false" v-model:visible="visibleEditDerive" header="Изменить Валюту">
      <ModalsEditDerive :derive="selectedDerive" @closeModal="showToast($event), (visibleEditDerive = false)" />
    </Dialog>
    <div class="my-blog_header">
      <Button @click="visibleAddDerive = true" severity="success"
        ><span style="margin-right: 5px" class="pi pi-plus"></span>ДОБАВИТЬ</Button
      >
    </div>
    <div class="derive_tab">
      <h1 class="page-title">Валюта</h1>
      <DataTable style="padding-top: 32px" :value="deriveStore.derives?.currency">
        <Column field="label" header="Картинка">
          <template #body="slotProps">
            <img class="avatar" :src="`${url}/api/${slotProps?.data?.image}`" alt="" />
          </template>
        </Column>
        <Column field="label" header="Название"></Column>
        <Column field="description" header="Описание"></Column>
        <Column field="currentRate" header="Текущий курс"></Column>
        <Column field="createdAt" header="Дата создания">
          <template #body="slotProps">
            {{
              new Date(slotProps?.data?.createdAt).toLocaleString('locale', {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
              })
            }}
          </template>
        </Column>
        <Column field="createdAt" header="Действия">
          <template #body="slotProps">
            <div class="category_content_btns">
              <Button @click="(selectedDerive = slotProps?.data), (visibleEditDerive = true)" class="red"></Button>
              <Button @click="deleteDerive(slotProps?.data?.id)" class="delete"></Button>
            </div>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<script setup>
import { useDeriveStore } from '@/store/derive';
import { useToast } from 'primevue/usetoast';
import url from '@/store/config';

const toast = useToast();
const deriveStore = useDeriveStore();

await deriveStore.getAllDerive();

let visibleAddDerive = ref(false);
let visibleEditDerive = ref(false);
let selectedDerive = ref(null);

async function deleteDerive(id) {
  const result = await deriveStore.deleteDerive(id);
  toast.add({
    severity: errorValidate(result?.status).toastType,
    summary: errorValidate(result?.status).summary,
    detail: errorValidate(result?.status).message,
    life: 3000,
  });
  await deriveStore.getAllDerive();
}

async function showToast(event) {
  toast.add({
    severity: event.toastType,
    summary: event.summary,
    detail: event.message,
    life: 3000,
  });
  await deriveStore.getAllDerive();
}
</script>
