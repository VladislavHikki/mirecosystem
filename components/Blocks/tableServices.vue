<template>
  <div class="category_container">
    <h1>Сервисы: {{ servicesStore.services.map(({ serviceCount }) => serviceCount).reduce((a, b) => a + b, 0) }}</h1>
    <Dialog header="Добавить сервис" modal :draggable="false" v-model:visible="show_modal_add_services">
      <ModalsAddServices :typeId="current_type_id" @closeModal="(show_modal_add_services = false), show_toast($event)" />
    </Dialog>
    <Dialog header="Редактировать тип" modal :draggable="false" v-model:visible="show_modal_edit_type">
      <ModalsEditTypeByService :type="current_type" @closeModal="(show_modal_edit_type = false), show_toast($event)" />
    </Dialog>
    <Dialog header="Редактировать сервис" modal :draggable="false" v-model:visible="show_modal_edit_services">
      <ModalsEditServices
        :typeId="current_type_id"
        :service="current_service"
        @closeModal="(show_modal_edit_services = false), show_toast($event)"
      />
    </Dialog>
    <Dialog
      v-model:visible="show_modal_del_type"
      :draggable="false"
      header="Удалить тип сервиса"
      modal
      :style="{ width: '50vw' }"
    >
      <h2>Вы уверены, что хотите удалить тип сервиса?</h2>
      <template #footer>
        <Button label="Удалить" icon="pi pi-check" @click="deleteType(current_type?.id), (show_modal_del_type = false)" />
        <Button label="Отмена" icon="pi pi-times" @click="show_modal_del_type = false" />
      </template>
    </Dialog>
    <Dialog
      v-model:visible="show_modal_del_service"
      :draggable="false"
      header="Удалить сервис"
      modal
      :style="{ width: '50vw' }"
    >
      <h2>Вы уверены, что хотите удалить сервис?</h2>
      <template #footer>
        <Button
          label="Удалить"
          icon="pi pi-check"
          @click="deleteService(current_service?.id), (show_modal_del_service = false)"
        />
        <Button label="Отмена" icon="pi pi-times" @click="show_modal_del_service = false" />
      </template>
    </Dialog>
    <div class="category_elements">
      <DataTable v-model:expandedRows="expandedRows" :value="servicesStore.services">
        <Column v-model="expandedRows" expander style="width: 5rem" />
        <Column header="Название типа сервиса" field="label" />
        <Column header="Дата создания" field="createdAt">
          <template #body="slotProps">
            {{
              new Date(slotProps?.data?.createdAt).toLocaleString('locale', {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
                minute: 'numeric',
                hour: 'numeric',
              })
            }}
          </template>
        </Column>
        <Column header="Операции">
          <template #body="slotProps">
            <div class="category_content_btns">
              <Button class="red" @click="(current_type = slotProps?.data), (show_modal_edit_type = true)" />
              <Button class="delete" @click="(show_modal_del_type = true), (current_type = slotProps?.data)" />
              <Button
                icon="pi pi-plus"
                class="add"
                @click="(show_modal_add_services = true), (current_type_id = slotProps?.data?.id)"
              />
            </div>
          </template>
        </Column>
        <template #expansion="slotProps">
          <DataTable v-if="slotProps?.data?.services?.length" :value="slotProps?.data?.services">
            <Column header="Наименование сервиса" field="label">
              <template #body="service">
                <div
                  class="category_elements_status"
                  :class="service?.data?.active ? 'category_elements_status--active' : 'category_elements_status--disabled'"
                >
                  {{ service?.data?.label }}
                </div>
              </template>
            </Column>
            <Column header="Дата создания" field="createdAt">
              <template #body="service">
                <div
                  class="category_elements_status"
                  :class="service?.data?.active ? 'category_elements_status--active' : 'category_elements_status--disabled'"
                >
                  {{
                    new Date(service?.data?.createdAt).toLocaleString('locale', {
                      year: 'numeric',
                      month: 'numeric',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: 'numeric',
                    })
                  }}
                </div>
              </template>
            </Column>
            <Column header="Операции">
              <template #body="service">
                <div
                  class="category_content_btns category_elements_status"
                  :class="service?.data?.active ? 'category_elements_status--active' : 'category_elements_status--disabled'"
                >
                  <Button
                    class="red"
                    @click="
                      (current_type_id = slotProps?.data?.id),
                        (current_service = service?.data),
                        (show_modal_edit_services = true)
                    "
                  />
                  <Button class="delete" @click="(current_service = service?.data), (show_modal_del_service = true)" />
                </div>
              </template>
            </Column>
          </DataTable>
          <h2 v-else>Нет сервисов</h2>
        </template>
      </DataTable>
    </div>
  </div>
</template>

<script setup>
import { useServicesStore } from '~/store/services';
import { useToast } from 'primevue/usetoast';

const servicesStore = useServicesStore();
const toast = useToast();

await servicesStore.requestServicesWithType();

let show_modal_add_services = ref(false);
let show_modal_edit_services = ref(false);
let show_modal_edit_type = ref(false);
let show_modal_del_type = ref(false);
let show_modal_del_service = ref(false);

let current_type_id = ref();
let current_service = ref();
let current_type = ref();

const show_toast = (result) => {
  if (result == 'close') return true;
  toast.add({
    severity: errorValidate(result).toastType,
    summary: errorValidate(result).summary,
    detail: errorValidate(result).message,
    life: 3000,
  });
};

const deleteType = async (id) => {
  const result = await servicesStore.deleteType(id);
  show_toast(result);
};

const deleteService = async (id) => {
  const result = await servicesStore.deleteService(id);
  show_toast(result);
};

let expandedRows = ref();
</script>

<style lang="scss" scoped>
.category_elements {
  &_status {
    height: 4rem;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    &--active {
      background: #3b82f6 !important;
    }
    &--disabled {
      background-color: #16a34a !important;
    }
  }
}
</style>
