<template>
  <div class="adminLocation container">
    <div class="adminLocation_btns">
      <div class="adminLocation_btns_item">
        <div class="location">
          <h2 class="page-title">Местоположения</h2>
        </div>

        <!-- <Button>ИМПОРТ МЕСТОПОЛОЖЕНИЯ</Button> -->
      </div>
      <div class="adminLocation_btns_item btns_right">
        <!--                <Button label="Primary" severity="info" style="width: 109px">-->
        <!--                    <span style="margin-right: 5px" class="pi pi-search"></span>НАЙТИ</Button-->
        <!--                >-->
        <Button @click="changeCurrAction(addCountry, 'Добавить страну')" label="Success" severity="success"
          ><span style="margin-right: 5px"></span>Добавить страну
        </Button>
        <Button @click="changeCurrAction(addRegion, 'Добавить регион')" label="Success" severity="success"
          ><span style="margin-right: 5px"></span>Добавить регион
        </Button>
        <Button @click="changeCurrAction(addCity, 'Добавить город')" label="Success" severity="success"
          ><span style="margin-right: 5px"></span>Добавить город
        </Button>
        <FileUpload
          style="background-color: #18af10"
          accept=".xlsx"
          mode="basic"
          :auto="true"
          customUpload
          @uploader="customBase64Uploader"
          chooseLabel="Загрузить"
        />
      </div>
      <Dialog
        v-model:visible="visible"
        modal
        :formData="formData"
        :header="currentDialog.title"
        :draggable="false"
        :style="{ width: '50vw' }"
      >
        <component @sync="sync" :is="currentDialog.component" />
        <template #footer>
          <Button label="Сохранить" icon="pi pi-check" @click="submit" />
          <Button label="Отмена" icon="pi pi-times" @click="visible = false" />
        </template>
      </Dialog>
    </div>
    <div class="adminLocation_content">
      <div class="adminLocation_content_item">
        <h2>Страны</h2>
        <div class="adminLocation_content_items">
          <div
            class="adminLocation_content_item_info"
            v-for="(value, index) in getSortWhereLabel(countryStore.all)"
            :key="index"
          >
            <div class="country" @click="clickCountries(value.id)">
              {{ value.label }}
            </div>

            <div class="actions">
              <div class="category_content_btns">
                <Button @click="openEditLocation(value, 'Редактировать страну', 'editCountry')" class="red"></Button>
                <Button @click="openDelLocation(value.id, 'Удалить страну', 'country')" class="delete"></Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="adminLocation_content_item">
        <h2>Области</h2>
        <div class="adminLocation_content_items" v-if="selectedCountry && regionStore.all.length">
          <div
            class="adminLocation_content_item_info"
            v-for="(value, index) in filterRegionLocation(getSortWhereLabel(regionStore.all))"
            :key="index"
            @click="clickRegion(value.id)"
          >
            <div class="country">
              {{ value.label }}
            </div>
            <div class="actions">
              <div class="category_content_btns">
                <Button @click="openEditLocation(value, 'Редактировать область', 'editRegion')" class="red"></Button>
                <Button @click="openDelLocation(value.id, 'Удалить область', 'region')" class="delete"></Button>
              </div>
            </div>
          </div>
        </div>
        <div class="region_warning1" v-else-if="selectedCountry && !regionStore.all.length">Нет облстей</div>
        <div class="region_warning2" v-else>Выберите страну</div>
      </div>

      <div class="adminLocation_content_item">
        <h2>Города</h2>
        <div class="adminLocation_content_items" v-if="selectedRegion && cityStore.all.length">
          <div
            class="adminLocation_content_item_info"
            v-for="(value, index) in filterCityLocation(getSortWhereLabel(cityStore.all))"
            :key="index"
          >
            <div class="country">{{ value.label }}</div>
            <div class="actions">
              <div class="category_content_btns">
                <Button @click="openEditLocation(value, 'Редактировать город', 'editCity')" class="red"></Button>
                <Button @click="openDelLocation(value.id, 'Удалить город', 'city')" class="delete"></Button>
              </div>
            </div>
          </div>
        </div>
        <div class="city_warning1" v-else-if="selectedRegion && !cityStore.all.length">Нет городов</div>
        <div class="city_warning2" v-else>Выберите область</div>
      </div>
    </div>

    <!-- Редактировани местоположения -->
    <Dialog
      v-model:visible="visibleEditCountry"
      :draggable="false"
      modal
      header="Редактировать страну"
      :style="{ width: '50vw' }"
    >
      <div class="container">
        <div class="form__item">
          <InputText v-model.trim="selectedItem.countryLabel" type="text" placeholder="Название страны" />
        </div>
      </div>
      <template #footer>
        <Button label="Сохранить" icon="pi pi-check" @click="editLocationFunction('country')" />
        <Button label="Отмена" icon="pi pi-times" @click="visibleEditCountry = false" />
      </template>
    </Dialog>
    <Dialog
      v-model:visible="visibleEditRegion"
      :draggable="false"
      modal
      header="Редактировать регион"
      :style="{ width: '50vw' }"
    >
      <div class="container">
        <div class="form__item">
          <Dropdown
            v-model="selectedItem.countryId"
            option-label="label"
            option-value="id"
            :value="selectedItem.countryId"
            :options="countryStore.all"
            placeholder="Выберите город"
          />
        </div>
        <div class="form__item">
          <InputText v-model.trim="selectedItem.regionLabel" type="text" placeholder="Название региона" />
        </div>
      </div>
      <template #footer>
        <Button label="Сохранить" icon="pi pi-check" @click="editLocationFunction('region')" />
        <Button label="Отмена" icon="pi pi-times" @click="visibleEditRegion = false" />
      </template>
    </Dialog>
    <Dialog
      v-model:visible="visibleEditCity"
      :draggable="false"
      modal
      header="Редактировать город"
      :style="{ width: '50vw' }"
    >
      <div class="container">
        <div class="form__item">
          <Dropdown
            v-model="selectedItem.regionId"
            option-label="label"
            option-value="id"
            :value="selectedItem.regionId"
            :options="regionStore.all"
            placeholder="Выберите регион"
          />
        </div>
        <div class="form__item">
          <InputText v-model="selectedItem.cityLabel" type="text" placeholder="Название города" />
        </div>
      </div>
      <template #footer>
        <Button label="Сохранить" icon="pi pi-check" @click="editLocationFunction('city')" />
        <Button label="Отмена" icon="pi pi-times" @click="visibleEditCity = false" />
      </template>
    </Dialog>

    <!-- Удаление местоположения -->
    <Dialog
      v-model:visible="visibleDelLocation"
      :draggable="false"
      modal
      :header="currentDialog.title"
      :style="{ width: '50vw' }"
    >
      <h2>Вы уверены, что хотите {{ currentDialog.title.toLowerCase() }}</h2>
      <template #footer>
        <Button label="Удалить" icon="pi pi-check" @click="deleteLocation(selectedItem.type)" />
        <Button label="Отмена" icon="pi pi-times" @click="visibleDelLocation = false" />
      </template>
    </Dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useCountryStore } from '~/store/country';
import { useRegionStore } from '~/store/region';
import { useCityStore } from '~/store/city';
import addCountry from '~/components/modals/location/addCountry.vue';
import addRegion from '~/components/modals/location/addRegion.vue';
import addCity from '~/components/modals/location/addCity.vue';
import { getSortWhereLabel } from '@/store/sort';

const countryStore = useCountryStore();
const regionStore = useRegionStore();
const cityStore = useCityStore();
const selectedItem = ref({});
const formData = reactive({});
const visible = ref(false);
const visibleEditCountry = ref(false);
const visibleEditRegion = ref(false);
const visibleEditCity = ref(false);
const visibleDelLocation = ref(false);
let selectedCountry = ref(0);
let selectedRegion = ref(0);

const customBase64Uploader = async (event) => {
  const file = event.files[0];
  let form = new FormData();
  form.append('file', file);
  const result = await countryStore.addFromExcel(form);
};

onMounted(async () => {
  await countryStore.get();
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

function filterCityLocation(city) {
  let filterCity = [];
  for (let i = 0; i < city?.length; ++i) {
    if (city[i].label == 'Все города') {
      filterCity.push(city[i]);
      break;
    }
  }
  for (let i = 0; i < city?.length; ++i) {
    if (city[i].label == 'Все города') {
      continue;
    }
    filterCity.push(city[i]);
  }
  return filterCity;
}

function clickCountries(id) {
  selectedCountry.value = id;
  selectedRegion.value = false;
  regionStore.get(selectedCountry.value);
}

function clickRegion(id) {
  selectedRegion.value = id;
  cityStore.get(selectedRegion.value);
}

const currentAction = ref(null);
const currentDialog = ref({
  title: null,
  component: null,
});

const changeCurrAction = (dialog, name) => {
  currentDialog.value.title = name;
  currentDialog.value.component = dialog;
  visible.value = true;
};

const sync = (value) => {
  const type = value.component;
  formData[type] = value.data;
};
const submit = async () => {
  if (formData.country) {
    let country = new FormData();
    country.append('label', formData.country.country);
    country.append('slug', formData.country.country);
    await countryStore.requestCreate(country);
    formData.country = null;
    formData.region = null;
    formData.city = null;
  }
  if (formData.region) {
    let region = new FormData();
    region.append('label', formData.region.region);
    region.append('slug', formData.region.region);
    region.append('countryId', formData.region.country.id);
    await regionStore.requestCreate(region);
    formData.country = null;
    formData.region = null;
    formData.city = null;
  }
  if (formData.city) {
    let city = new FormData();
    city.append('label', formData.city.city);
    city.append('slug', formData.city.city);
    city.append('regionId', formData.city.region.id);
    await cityStore.requestCreate(city);
    formData.country = null;
    formData.region = null;
    formData.city = null;
  }
  // let region = new FormData()
  // region.append('label', formData.region)
  // region.append('slug', formData.region)
  // await regionStore.requestCreate(region)
  // let city = new FormData()
  // city.append('label', formData.city)
  // city.append('slug', formData.city)
  // await cityStore.requestCreate(city)
  visible.value = false;
};

const openEditLocation = (data, name, component) => {
  if (component == 'editCountry') {
    selectedItem.value.countryId = data.id;
    selectedItem.value.countryLabel = data.label;
    visibleEditCountry.value = true;
  } else if (component == 'editRegion') {
    selectedItem.value.regionId = data.id;
    selectedItem.value.countryId = data.countryId;
    selectedItem.value.regionLabel = data.label;
    visibleEditRegion.value = true;
  } else if (component == 'editCity') {
    selectedItem.value.cityId = data.id;
    selectedItem.value.regionId = data.regionId;
    selectedItem.value.cityLabel = data.label;
    visibleEditCity.value = true;
  }
  currentDialog.value.title = name;
  currentDialog.value.component = component;
};

const editLocationFunction = async (type) => {
  const data = new FormData();
  if (type == 'country') {
    data.append('label', selectedItem.value.countryLabel);
    await countryStore.updateCountry(data, selectedItem.value.countryId);
    visibleEditCountry.value = false;
  }
  if (type == 'region') {
    data.append('label', selectedItem.value.regionLabel);
    data.append('countryId', selectedItem.value.countryId);
    await regionStore.updateRegion(data, selectedItem.value.regionId);
    visibleEditRegion.value = false;
  }
  if (type == 'city') {
    data.append('label', selectedItem.value.cityLabel);
    data.append('regionId', selectedItem.value.regionId);
    await cityStore.updateCity(data, selectedItem.value.cityId);
    visibleEditCity.value = false;
  }
  selectedItem.value = {};
};

const openDelLocation = (data, name, type) => {
  currentDialog.value.title = name;
  selectedItem.value.id = data;
  selectedItem.value.type = type;
  visibleDelLocation.value = true;
};

const deleteLocation = async (type) => {
  const data = new FormData();
  data.append('ids', selectedItem.value.id);
  if (type == 'country') await countryStore.deleteCountry(data);
  if (type == 'region') {
    await regionStore.deleteRegion(data);
    regionStore.get(selectedCountry.value);
  }
  if (type == 'city') {
    await cityStore.deleteCity(data);
    cityStore.get(selectedRegion.value);
  }
  selectedItem.value = {};
  visibleDelLocation.value = false;
};
</script>

<style lang="scss" scoped>
.adminLocation {
  display: flex;
  flex-direction: column;
  gap: 42px;
  .adminLocation_btns {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 45px;
    .btns_right {
      align-items: flex-end;
    }
    .adminLocation_btns_item {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      //height: 100px;
      gap: 15px;
      .location {
        height: 53px;
      }
      button {
        margin: 0;
      }
      .importLocation {
        background: #2ca8ff;
        box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.25);
        border-radius: 7px;
      }
      .find_btn {
        background: #2ca8ff;
        box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.25);
        border-radius: 7px;
        background-image: url(~/assets/images/find.png);
        background-repeat: no-repeat;
        background-position: left 10px center;
        padding-left: 40px;
        padding-right: 14px;
        width: 150px;
      }
      .add_btn {
        background: #18af10;
        box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.25);
        border-radius: 7px;
      }
    }
  }
  ::-webkit-scrollbar {
    width:5px;
    height: 5px; /* ширина для вертикального скролла */ /* высота для горизонтального скролла */
    background-color: #ffffff;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #ffffff;
    border-radius: 9em;
    box-shadow: inset 1px 1px 10px #000000;
}
  .adminLocation_content {
    display: flex;
    align-items: flex-start;
    // justify-content: space-around;
    flex-wrap: nowrap;
    gap: 20px;
    scrollbar-width: thin;
    .adminLocation_content_items {
      min-width: 400px;
    }
    .adminLocation_content_item {
      background: #ffffff;
      box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.25);
      border-radius: 7px;
      padding: 5px;
      display: inline-block;
      overflow-x: scroll;
      .adminLocation_content_item_info {
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-top: 1px solid #d9d9d9;
        border-bottom: 1px solid #d9d9d9;
        background: #ffffff;
        border: none;
        .country {
          padding: 15px 13px;
          width: 100% !important;
        }
        .adminLocation_content_item_btns {
          display: flex;
          gap: 10px;
          width: 33%;
          margin-left: 78px;
          button {
            width: 32px;
            height: 32px;
            margin: 0;
            padding: 0;
          }
          .delete {
            background: #f81111;
            background-image: url(~/assets/images/delete.png);
            background-position: center center;
            background-repeat: no-repeat;
          }
          .red_btn {
            background: #ff8a00;
            background-image: url(~/assets/images/pen.png);
            background-position: center center;
            background-repeat: no-repeat;
          }
          .arrow_btn {
            background-image: url(~/assets/images/arrow_adminControl.png);
            background-position: center center;
            background-repeat: no-repeat;
          }
          .arrow_btn_color {
            background-color: #2ca8ff;
          }
        }

        input {
          width: 26px;
          height: 26px;
          margin-right: 25px;
        }
        .country {
          width: 33%;
          font-size: 15px;
          color: #757575;
          white-space: nowrap;
        }
      }
      .adminLocation_content_item_info:nth-child(2n) {
        background: #f6f6f6;
        border-top: 1px solid #d9d9d9;
        border-bottom: 1px solid #d9d9d9;
      }
    }
  }
  .category_content_btns {
    display: flex;
    gap: 10px;
    button {
      width: 32px;
      height: 32px;
      border-radius: 5px;
      padding: 0;
    }
    .p-button {
      border: 0px;
    }
    .red {
      background: #ff8a00;
      background-image: url(~/assets/images/pen.png);
      background-position: center center;
      background-repeat: no-repeat;
    }
    .delete {
      background: #f81111;
      background-image: url(~/assets/images/delete.png);
      background-position: center center;
      background-repeat: no-repeat;
    }
  }
}

@media (max-width: $x-small) {
  .adminLocation_content_item_info {
    width: 100%;
    input {
      margin: 0 !important;
    }
    .adminLocation_content_item_btns {
      margin: 0 !important;
    }
  }
}
</style>
