<template>
  <div class="modal-window__body">
    <div class="modal-window__content">
      <div class="modal-window__container">
        <form method="post" @submit.prevent="editType">
          <div class="form__item">
            <InputText v-model="data.label" placeholder="Название" />
          </div>
          <div class="form__item_end-flex">
            <Button type="submit" class="form__button" label="Сохранить" />
            <Button @click="$emit('closeModal', 'close')" class="form__button" label="Отмена" />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useServicesStore } from '~/store/services';
import url from '@/store/config';

const servicesStore = useServicesStore();
const cropper_show = ref(false);
const props = defineProps({
  type: {
    type: Object,
    default: null,
  },
});
const emit = defineEmits(['closeModal']);
const data = shallowReactive({
  label: props?.type?.label,
});

const editType = async () => {
  let form = new FormData();
  form.append('label', data.label);
  const result = await servicesStore.editType(props?.type?.id, form);
  emit('closeModal', result);
};
</script>
