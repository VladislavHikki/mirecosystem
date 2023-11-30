<template>
  <div>
    <div class="modal-window__container">
      <form action="" method="post" @submit.prevent="submit">
        <div class="form__item">
          <InputText
            v-model.trim="data.label"
            placeholder="Наименование категории"
            :class="{ 'p-invalid': v$['label'].$error }"
          />
          <div class="error" v-if="v$['label'].$error">
            {{ v$['label'].$errors[0].$message }}
          </div>
        </div>
        <div class="form__item_end-flex">
          <Button type="submit" class="form__button" label="Сохранить" />
          <Button @click="$emit('closeModal', false)" class="form__button" label="Отмена" />
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { useServicesStore } from '~/store/services';
import { useToast } from 'primevue/usetoast';
import { useVuelidate } from '@vuelidate/core';
import { required, helpers } from '@vuelidate/validators';

const toast = useToast();
const rules = computed(() => {
  return {
    label: {
      required: helpers.withMessage('Обязательно', required),
    },
  };
});
const servicesStore = useServicesStore();
const emit = defineEmits(['closeModal']);
const data = shallowReactive({
  label: null,
});
const v$ = useVuelidate(rules, data);

const submit = async () => {
  v$.value.$validate();
  if (!v$.value?.$error) {
    let form = new FormData();
    form.append('label', data?.label);
    const result = await servicesStore.createType(form);
    emit('closeModal', false);
    toast.add({ severity: 'success', summary: 'OK!', detail: 'Успешно', life: 3000 });
  }
};
</script>
