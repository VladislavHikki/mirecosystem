<template>
  <div class="wrap-modal">
    <div class="modal-window__content">
      <div class="container">
        <div class="form__item">
          <Dropdown
            @change="emit('sync', { data: formData, component: 'region' })"
            v-model="formData.country"
            placeholder="Страна"
            :options="countryStore.all"
            optionLabel="label"
          />
        </div>
        <div class="form__item">
          <InputText
            v-model.trim="formData.region"
            @change="emit('sync', { data: formData, component: 'region' })"
            type="text"
            placeholder="Регион"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCountryStore } from '~/store/country';

const emit = defineEmits(['sync']);

const countryStore = useCountryStore();

const formData = reactive({
  country: null,
  region: null,
});

onMounted(async () => {
  await countryStore.get();
});
</script>

<style lang="scss">
.modal-window__content {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.container {
  width: 100%;
}
</style>
