<template>
  <div class="wrap-modal">
    <div class="modal-window__content">
      <div class="container">
        <div class="form__item">
          <Dropdown
            @change="emit('sync', { data: formData, component: 'city' })"
            v-model="formData.country"
            placeholder="Страна"
            :options="countryStore.all"
            optionLabel="label"
          />
        </div>
        <div class="form__item">
          <Dropdown
            @change="emit('sync', { data: formData, component: 'city' })"
            v-model="formData.region"
            placeholder="Регион"
            :options="filterRegionLocation(getSortWhereLabel(regionStore.all))"
            optionLabel="label"
            :disabled="!formData.country"
          />
        </div>
        <div class="form__item">
          <InputText
            v-model.trim="formData.city"
            @change="emit('sync', { data: formData, component: 'city' })"
            type="text"
            placeholder="Город"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRegionStore } from '~/store/region';
import { useCountryStore } from '~/store/country';
import { getSortWhereLabel } from '~/store/sort';

const emit = defineEmits(['sync']);

const countryStore = useCountryStore();
const regionStore = useRegionStore();

const formData = reactive({
  country: null,
  region: null,
  city: null,
});

function filterRegionLocation(regions) {
  let filterReg = [];
  for (let i = 0; i < regions?.length; ++i) {
    if (regions[i].label == 'Все регионы') {
      filterReg.push(regions[i]);
      break;
    }
  }
  for (let i = 0; i < regions?.length; ++i) {
    if (regions[i].label == 'Все регионы') {
      continue;
    }
    filterReg.push(regions[i]);
  }
  return filterReg;
}

onMounted(async () => {
  await countryStore.get();
});

watch(
  () => formData.country,
  async () => {
    await regionStore.get(formData.country.id);
  }
);
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
