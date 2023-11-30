<template>
  <div id="resources" class="resources">
    <section>
      <form class="resource_form" action="#" method="get">
        <div class="resource_form_item">
          <h2 class="page-title">Ресурсы</h2>
          <div class="find">
            <InputText @input="search" v-model="formData.text" type="text" placeholder="Поиск" /><button
              class="find_btn"
              type="submit"
            ></button>
          </div>
          <!-- <Dropdown
                @change="search"
                v-model="formData.project.value"
                :options="getArr(getSortWhereLabel(projects), 'Все проекты')"
                option-label="label"
                option-value="value"
                placeholder="Проект"
            /> -->
          <Dropdown
            @change="search"
            v-model="formData.category.value"
            :options="getArr(getSortWhereLabel(categories), 'Все категории')"
            option-label="label"
            option-value="value"
            placeholder="Категория"
          />
          <!-- <Dropdown
                @change="search"
                v-model="formData.franchise.value"
                :options="getArr(getSortWhereLabel(franchises), 'Все франшизы')"
                optionLabel="label"
                option-value="value"
                placeholder="Франшиза"
            /> -->
          <Dropdown
            @change="search"
            v-model="formData.country.id"
            :options="getArr(getSortWhereLabel(countries), 'Все страны')"
            optionLabel="label"
            option-value="id"
            placeholder="Страна"
          />
          <Dropdown
            @change="search"
            v-model="formData.region.id"
            :options="getArr(filterRegionDropDown(regions), 'Все регионы')"
            :disabled="!formData.country.id"
            optionLabel="label"
            option-value="id"
            placeholder="Регион"
            filter
          />
          <Dropdown
            @change="search"
            v-model="formData.city.id"
            :options="getArr(filterCityDropDown(cities), 'Все города')"
            :disabled="!formData.region.id"
            optionLabel="label"
            option-value="id"
            placeholder="Город"
            filter
          />
        </div>
      </form>
      <div v-if="arrResource?.resources?.rows?.length">
        <div class="franchisingLeaders-cards">
          <div
            class="franchisingLeaders-card_container"
            v-for="(value, index) in getSortWhereLabel(arrResource?.resources?.rows)"
            :key="index"
          >
            <CardsResource :data="value" :showAllTxt="false" />
          </div>
        </div>
      </div>
      <div class="warning" v-if="warning">
        <h2 class="page-subtitle">Нет ресурсов</h2>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useResourceStore } from '@/store/resource';
import { useCountryStore } from '~/store/country';
import { useRegionStore } from '~/store/region';
import { useCityStore } from '~/store/city';
import { getSortWhereLabel } from '@/store/sort';
import { useCategoryStore } from '@/store/category';

const countryStore = useCountryStore();
const regionStore = useRegionStore();
const categoryStore = useCategoryStore();
const cityStore = useCityStore();
const resourceStore = useResourceStore();

await categoryStore.requestCategories();
await resourceStore.requestCategories();

const router = useRouter();
const route = useRoute();
let page = ref(route.query.page || 1);

let arrResource = ref([]);
let warning = ref(false);

const formData = reactive({
  text: route.query.text || null,
  country: {
    label: null,
    id: parseInt(route.query.country) || null,
  },
  region: {
    label: null,
    id: parseInt(route.query.region) || null,
  },
  city: {
    label: null,
    id: parseInt(route.query.city) || null,
  },
  project: {
    label: null,
    value: parseInt(route.query.project) || null,
  },
  franchise: {
    label: null,
    value: parseInt(route.query.franchise) || null,
  },
  category: {
    label: null,
    value: parseInt(route.query.category) || null,
  },
  amount: 24,
});

const search = async () => {
  // await resourceStore.searchResourcesComp(page.value, formData);
  arrResource.value = resourceStore.searchResources;
  if (
    formData?.text?.trim?.() ||
    formData.project.value ||
    formData.category.value ||
    formData.franchise.value ||
    formData.country.id ||
    formData.region.id ||
    formData.city.id
  ) {
    // alert("Что то есть");
    router.push(
      `${route.path}?page=1&text=${formData.text || ''}&project=${formData.project?.value || ''}&category=${
        formData.category?.value || ''
      }&franchise=${formData.franchise?.value || ''}&country=${formData?.country?.id || ''}&region=${
        formData.region?.id || ''
      }&city=${formData.city?.id || ''}&amount=${formData.amount}`
    );
    // await resourceStore.searchResourcesComp(page.value, formData);
    // arr.value = regionStore.resources;
    await resourceStore.searchResourcesComp(page.value, formData);
    arrResource.value = resourceStore.searchResources;
    if (arrResource.value?.pages) warning.value = false;
    else warning.value = true;
  } else {
    router.push(
      `${route.path}?page=1&text=${''}&project=${formData.project?.value || ''}&category=${
        formData.category?.value || ''
      }&franchise=${formData.franchise?.value || ''}&country=${formData?.country?.id || ''}&region=${
        formData.region?.id || ''
      }&city=${formData.city?.id || ''}&amount=${formData.amount}`
    );
    warning.value = false;
    arrResource.value = null;
  }
};

const projects = ref([]);
const categories = ref([]);
const franchises = ref([]);
const countries = ref([]);
const regions = ref([]);
const cities = ref([]);

onMounted(async () => {
  await countryStore.get();
  await resourceStore.requestList();
  formData?.country.id ? await regionStore.get(formData['country'].id) : null;
  formData.region.id ? await cityStore.get(formData['region'].id) : null;
  projects.value = resourceStore.getList.projects;
  projects.value.unshift({ label: 'Все проекты', value: null });
  categories.value = resourceStore.getList.categories;
  categories.value.unshift({ label: 'Все категории', value: null });
  franchises.value = resourceStore.getList.franchises;
  franchises.value.unshift({ label: 'Все франшизы', value: null });
  countries.value = countryStore.all;
  countries.value.unshift({ label: 'Все страны', value: null });
  // await resourceStore.searchResourcesComp(page.value, formData);
  // await resourceStore.requestResources(1, formData.amount);
  if (
    formData?.text?.trim?.() ||
    formData.project.value ||
    formData.category.value ||
    formData.franchise.value ||
    formData.country.id ||
    formData.region.id ||
    formData.city.id
  ) {
    arrResource.value = resourceStore.searchResources;
    if (!arrResource.value?.pages) warning = true;
  }
});

watch(
  () => ({ ...formData['country'].id }),
  async () => {
    formData.region.label = null;
    formData.region.id = null;
    formData.city.label = null;
    formData.city.id = null;
    await regionStore.get(formData['country'].id);
    regions.value = regionStore.all;
    regions.value.unshift({ label: 'Все регионы', value: null });
  }
);

watch(
  () => ({ ...formData['region'].id }),
  async () => {
    await cityStore.get(formData['region'].id);
    cities.value = cityStore.all;
    cities.value.unshift({ label: 'Все города', value: null });
  }
);

function filterRegionDropDown(regions) {
  let filterRegion = [];
  for (let i = 0; i < regions?.length; ++i) {
    if (regions[i].label == 'Все регионы') {
      if (!regions[i]?.id) filterRegion.push(regions[i]);
      continue;
    }
    filterRegion.push(regions[i]);
  }
  return filterRegion;
}

function filterCityDropDown(city) {
  let filterCity = [];
  for (let i = 0; i < city?.length; ++i) {
    if (city[i].label == 'Новости регионов') {
      if (!city[i]?.id) filterCity.push(city[i]);
      continue;
    }
    filterCity.push(city[i]);
  }
  return filterCity;
}

function getArr(arr, str) {
  let newArr = [];
  for (let i = 0; i < arr?.length; ++i) {
    if (str == arr[i].label) {
      newArr.push(arr[i]);
      break;
    }
  }
  for (let i = 0; i < arr?.length; ++i) {
    if (str == arr[i].label) continue;
    else newArr.push(arr[i]);
  }
  return newArr;
}
</script>
