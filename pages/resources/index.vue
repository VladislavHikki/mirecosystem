<template>
  <div id="resources" class="resources container">
    <section>
      <form class="resource_form" action="#" method="get">
        <div class="resource_form_item">
          <h2 class="page-title">Ресурсы</h2>
          <div class="find">
            <InputText @input="search(1)" v-model.trim="formData.text" type="text" placeholder="Поиск" /><button
              class="find_btn"
              type="submit"
            ></button>
          </div>
          <Dropdown
            @change="getDataByCoverage(formData.coverageId)"
            v-model="formData.coverageId"
            :options="coverageStore?.coverages"
            option-label="label"
            option-value="value"
            placeholder="Охват"
          />
          <!-- <pre>
            {{ fun }}
          </pre> -->
          <template v-if="formData.coverageId">
            <Dropdown
              @change="search(1)"
              v-model="formData.category"
              :options="fun(categories)"
              option-label="label"
              option-value="value"
              placeholder="Категория"
            />
            <Dropdown
              @change="search(1), getRegion"
              v-model="formData.country"
              :options="countries"
              optionLabel="label"
              option-value="id"
              placeholder="Страна"
            />
            <template v-if="!isNationality(formData.coverageId)">
              <Dropdown
                @change="search(1)"
                v-model="formData.region"
                :options="getArr(filterRegionDropDown(regions), 'Все регионы')"
                :disabled="!formData.country"
                optionLabel="label"
                option-value="id"
                placeholder="Регион"
                empty-filter-message="Нет результатов"
                filter
              />
              <Dropdown
                @change="search(1)"
                v-model="formData.city"
                :options="getArr(filterCityDropDown(cities), 'Все города')"
                :disabled="!formData.region"
                optionLabel="label"
                option-value="id"
                placeholder="Город"
                empty-filter-message="Нет результатов"
                filter
              />
            </template>
          </template>
        </div>
      </form>
    </section>
    <template v-if="Object.keys(route.query)?.length || show_all_resources">
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
      <div class="warning" v-else>
        <h2 class="page-subtitle">Нет ресурсов</h2>
      </div>
      <div class="pagination_btns">
        <Paginator
          v-if="arrResource?.pages > 1"
          :template="{
            '640px': 'PrevPageLink CurrentPageReport NextPageLink',
            '960px': 'FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink',
            '1300px': ' PrevPageLink PageLinks NextPageLink ',
            default: 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink ',
          }"
          v-model:first="currentPage"
          :total-records="arrResource?.pages"
          :rows="1"
          currentPageReportTemplate="{last} из {totalRecords}"
        />
      </div>
    </template>
    <section>
      <div>
        <div style="padding-top: 0px" class="container resource-miro">
          <div class="content-resources">
            <div class="content_item" v-for="value in changePlaceRegAndNat(categoryStore?.categories?.subcategories?.rows)">
              <h2 style="font-size: 24px">{{ value?.label }}</h2>
              <div class="category_cont">
                <span>Категории ({{ value?.categories?.length }}) </span>
                <span>Ресурсы ({{ value?.rescount }})</span>
              </div>
              <ul v-if="value?.categories?.length">
                <li v-for="category in fun(value?.categories)">
                  <NuxtLink :to="`/resources/category/${category?.value}`"
                    >{{ category?.label }} ({{ category?.rescount }})</NuxtLink
                  >
                </li>
              </ul>
              <span v-else>Нет категорий</span>
            </div>
            <div class="content_item_second">
              <div
                class="content_item"
                v-for="value in getOtherAndCorporation(categoryStore?.categories?.subcategories?.rows)"
              >
                <h2 style="font-size: 24px">{{ value?.label }}</h2>
                <div class="category_cont">
                  <span>Категории ({{ value?.categories?.length }}) </span>
                  <span>Ресурсы ({{ value?.rescount }})</span>
                </div>
                <ul v-if="value?.categories?.length">
                  <li v-for="category in value?.categories">
                    <NuxtLink :to="`/resources/category/${category?.value}`"
                      >{{ category?.label }} ({{ category?.rescount }})</NuxtLink
                    >
                  </li>
                </ul>
                <span v-else>Нет категорий</span>
              </div>
            </div>
            <div class="container_miro">
              <div>
                <h2 style="font-size: 24px">Местоположение</h2>
                <div class="category_cont">
                  <span>
                    <nuxt-link>
                      Все ресурсы ({{
                        countResource(categoryStore?.categories?.subcategories?.rows)
                      }})
                    </nuxt-link>
                  </span>
                </div>
                <div class="content_miro content_item">
                  <ul>
                    <li>
                      <nuxt-link :to="`/resources/country/1`">
                        Россия и Мир ({{ getResourcesCount(categoryStore?.categories?.subcategories?.rows) }})
                      </nuxt-link>
                    </li>
                    <li v-for="(value, index) in resourceStore?.allResourcesByCity?.cities" :key="index">
                      <nuxt-link :to="`/resources/city/${value?.id}`"> {{ value.label }} ({{ value.rescount }}) </nuxt-link>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="pagination_btns">
                <Paginator
                  v-if="resourceStore?.allResourcesByCity?.pages > 1"
                  :template="{
                    default: 'PrevPageLink CurrentPageReport NextPageLink',
                  }"
                  v-model:first="currentPageCity"
                  :total-records="resourceStore?.allResourcesByCity?.pages"
                  :rows="1"
                  currentPageReportTemplate="{last} из {totalRecords}"
                />
              </div>
            </div>
          </div>
        </div>
        <BlocksResourcesLast @click_to_resources="clickShowAllResources" />
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
import { useCoverageStore } from '@/store/coverage';

const countryStore = useCountryStore();
const regionStore = useRegionStore();
const categoryStore = useCategoryStore();
const cityStore = useCityStore();
const resourceStore = useResourceStore();
const coverageStore = useCoverageStore();
const router = useRouter();
const route = useRoute();
const isNationality = (value) => {
  return coverageStore?.coverages?.find((element, index, array) => {
    if (element?.value === value) return element;
  })?.nationality
    ? true
    : false;
};
const formData = reactive({
  text: route.query?.text,
  coverageId: route.query?.coverageId ? parseInt(route.query?.coverageId) : null,
  country: route.query?.country ? parseInt(route.query?.country) : null,
  region: route.query?.region ? parseInt(route.query?.region) : null,
  city: route.query?.city ? parseInt(route.query?.city) : null,
  category: route.query?.category ? parseInt(route.query?.category) : null,
});

const search = async (number = 1) => {
  let current_query = {};
  Object.keys(formData).map((key) => {
    if (formData[key]) current_query[key] = formData[key];
  });

  router.push({
    path: route.path,
    query: current_query,
  });
  if (number == 1) currentPage.value = 0;
  await resourceStore.searchResources(number, formData);
  arrResource.value = resourceStore?.resources;
};

let arrResource = ref([]);
let show_all_resources = ref(false);

onMounted(async () => {
  await resourceStore?.searchResources(1, formData);
  arrResource.value = resourceStore?.resources;
});

await categoryStore.requestCategories();
await resourceStore.requestCategories();
await resourceStore.requestLastResource(12);
await coverageStore.requestCoverage();
await countryStore.get(true);
await resourceStore.requestList(isNationality(route.query.coverageId ? parseInt(route.query.coverageId) : null) ? 1 : 2);

let amount = 24;
let currentPage = ref(0);
let currentPageCity = ref(0);
let allResourcesPage = ref(0);

async function clickShowAllResources() {
  Object.keys(formData).map((key) => (formData[key] = null));
  await search();
  show_all_resources.value = true;
  window.scrollTo(0, 0);
}

function getResourcesCount(arr) {
  if (arr?.length) {
    let arrNat = arr.filter((item) => item?.label == 'НАЦИОНАЛЬНЫЕ');
    if (arrNat?.length) return arrNat[0]?.rescount;
  }
  return null;
}

/**
 * Меняет местами "национальные" и "региональные" в массиве с категориями
 * @returns array - новый массив
 * @param {array} arr - массив с категориями
 */
function changePlaceRegAndNat(arr) {
  return [
    ...arr.filter((item) => item?.label == 'РЕГИОНАЛЬНЫЕ'),
    ...arr.filter((item) => item?.label == 'НАЦИОНАЛЬНЫЕ'),
    ...arr.filter(
      (item) =>
        item?.label != 'НАЦИОНАЛЬНЫЕ' &&
        item?.label != 'РЕГИОНАЛЬНЫЕ' &&
        item?.label != 'КОРПОРАТИВНЫЕ' &&
        item?.label != 'ДРУГИЕ'
    ),
  ];
}

/**
 * Возвращает массив из "ДРУГИЕ" и "КОРПОРАТИВНЫЕ"
 * @returns array - новый массив
 * @param {array} arr - массив с категориями
 */
function getOtherAndCorporation(arr) {
  return [...arr.filter((item) => item?.label == 'КОРПОРАТИВНЫЕ' || item?.label == 'ДРУГИЕ')];
}

const categories = ref(resourceStore.getList.categories);
const countries = ref(countryStore.all);
const regions = ref([]);
const cities = ref([]);

const selectPage = async (number) => {
  search(number);
};

async function changePageAllResources(number) {
  await resourceStore.requestResources(number, amount);
}

watch(allResourcesPage, async () => {
  let body = document.querySelector('body');
  body.scrollTop = 0;
  changePageAllResources(allResourcesPage.value + 1);
});

function countResource(resources) {
  let result = 0;
  for (const res of resources) {
    result += res.rescount;
  }
  return result;
}

watch(currentPage, () => {
  selectPage(currentPage.value + 1);
});

watch(currentPageCity, () => {
  changePageCity(currentPageCity.value + 1);
});

watch(
  () => formData?.coverageId,
  async () => {
    formData.category = null;
    formData.city = null;
    formData.country = null;
    formData.region = null;
    await search();
  }
);

watch(
  () => formData.country,
  async () => {
    if (!isNationality(formData.coverageId)) {
      await regionStore.get(formData['country']);
      regions.value = regionStore.all;
      regions.value.unshift({ label: 'Все регионы', id: null });
    }
    await search();
  }
);

watch(
  () => formData?.region,
  async () => {
    await cityStore.get(formData['region']);
    cities.value = cityStore.all;
    cities.value.unshift({ label: 'Все города', id: null });
  }
);

async function changePageCity(number) {
  await resourceStore.requestResourcesByCity(number);
}

const getDataByCoverage = async (value) => {
  await resourceStore.requestList(isNationality(value) ? 1 : 2);
  categories.value = resourceStore.getList.categories;
  await countryStore.get(true);
  countries.value = countryStore.all;
  if (isNationality(value)) {
    formData.region = null;
    formData.city = null;
  }
};

await resourceStore.requestResourcesByCity(currentPageCity.value + 1);

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

function getCityCount(cities) {
  let result = 0;
  for (const city of cities) {
    result += city.rescount;
  }
  return result;
}

const fun = (arr) => {
  return arr.find((item) => item.label == 'Новости региона') && arr.find((item) => item.label == 'Новости города')
    ? [
        arr.find((item) => item.label == 'Новости региона'),
        arr.find((item) => item.label == 'Новости города'),
        ...arr.filter((item) => item?.label != 'Новости региона' && item?.label != 'Новости города'),
      ]
    : arr;
};
</script>
