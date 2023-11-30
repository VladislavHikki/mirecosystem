<template>
  <div class="container fooddeli" style="height: 100vh">
    <form method="post">
      <div class="fooddeli_btns">
        <Dropdown
          v-model="form.country"
          :options="getSortWhereLabel(countryStore?.countries)"
          optionLabel="label"
          option-value="id"
          placeholder="Страна"
        />
        <Dropdown
          v-model="form.region"
          :options="regionStore?.regions"
          optionLabel="label"
          option-value="id"
          :disabled="!form.country"
          placeholder="Регион"
          emptyFilterMessage="Нет результатов"
          filter
        />
        <Dropdown
          v-model="form.city"
          :options="cityStore?.cities"
          optionLabel="label"
          option-value="id"
          :disabled="!form.region"
          placeholder="Город"
          emptyFilterMessage="Нет результатов"
          filter
        />
      </div>
    </form>
  </div>
</template>

<script setup>
import { useCountryStore } from '~/store/country';
import { useRegionStore } from '~/store/region';
import { useCityStore } from '~/store/city';
import { getSortWhereLabel } from '@/store/sort';

const countryStore = useCountryStore();
const regionStore = useRegionStore();
const cityStore = useCityStore();

await countryStore.get();

let form = ref({
  country: null,
  region: null,
  city: null,
});

watch(
  () => form.value.country,
  async () => {
    await regionStore.get(form.value?.country);
  }
);

watch(
  () => form.value.region,
  async () => {
    await cityStore.get(form.value?.region);
  }
);
</script>

<style lang="scss" scoped>
.container {
  background-image: url(~/assets/images/taxi.jpg);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}

.fooddeli_btns {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
</style>
