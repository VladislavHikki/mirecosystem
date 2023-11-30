<template>
  <div class="modal-window__container">
    <Dialog modal header="Редактировать аватарку" v-model:visible="cropper_show">
      <UICropper
        @get-image="(cropper_show = false), (formData['image'] = $event?.file), (image = $event?.url)"
        :image="formData['image']"
        isAvatar
      />
    </Dialog>
    <form method="post" @change="check()">
      <div class="form__item">
        <Dropdown
          v-model="formData.type"
          @change="v$['type'].$touch"
          :options="getSortWhereLabel(resourceStore.getTypes)"
          optionLabel="label"
          placeholder="Вид ресурса"
        />
        <div class="error" v-if="v$['type'].$error">
          {{ v$['type'].$errors[0].$message }}
        </div>
      </div>
      <div class="form__item form-input upload-file upload-file_indent form-item_indent">
        <label for="">Картинка</label>
        <div class="form-upload">
          <div class="out-choose-image">
            <img v-if="!image" loading="lazy" width="100" height="100" src="@/assets/images/avatar.svg" alt="" />
            <img v-else loading="lazy" width="100" height="100" :src="image" alt="" />
          </div>
          <FileUpload
            accept=".jpg, .png, .jpeg"
            mode="basic"
            :auto="true"
            @change="v$['image'].$touch"
            customUpload
            @uploader="customBase64Uploader"
            chooseLabel="Загрузить"
          />
          <Button icon="pi pi-user-edit" label="Изменить" @click="cropper_show = true" />
        </div>
        <div class="error" v-if="v$['image'].$error" style="margin-left: 0px; margin-top: 5px">
          {{ v$['image'].$errors[0].$message }}
        </div>
      </div>
      <div class="form__item">
        <InputText @change="v$['name'].$touch" v-model.trim="formData.name" type="text" placeholder="Название" />
        <div class="error" v-if="v$['name'].$error">
          {{ v$['name'].$errors[0].$message }}
        </div>
      </div>
      <div class="form__item">
        <InputText @change="v$['url'].$touch" v-model.trim="formData.url" type="text" placeholder="Ссылка" />
        <div class="error" v-if="v$['url'].$error">
          {{ v$['url'].$errors[0].$message }}
        </div>
      </div>
      <div class="form__item">
        <span class="p-float-label">
          <Textarea @change="v$['desc'].$touch" v-model.trim="formData.desc" rows="2" cols="45" />
          <label>Описание</label>
          <div class="error" v-if="v$['desc'].$error">
            {{ v$['desc'].$errors[0].$message }}
          </div>
        </span>
      </div>
      <div class="form__item">
        <Dropdown
          @change="
            v$['franchise'].$touch;
            check();
          "
          v-model="formData.franchise"
          :options="getSortWhereLabel(resourceStore.getList?.franchises)"
          optionLabel="label"
          placeholder="Франшиза"
        />
        <div class="error" v-if="v$['franchise'].$error">
          {{ v$['franchise'].$errors[0].$message }}
        </div>
      </div>
      <div class="form__item">
        <Dropdown
          @change="
            v$['coverage'].$touch;
          "
          v-model="formData.coverage"
          :options="coverageStore.coverages"
          optionLabel="label"
          placeholder="Охват"
        />
        <div class="error" v-if="v$['coverage'].$error">
          {{ v$['coverage'].$errors[0].$message }}
        </div>
      </div>
      <div class="form__item" v-if="!formData?.coverage?.nationality && formData?.coverage">
        <Dropdown
          @change="
            v$['region'].$touch;
            check();
          "
          v-model="formData.region"
          :options="regionStore?.regions"
          empty-filter-message="Нет результатов"
          optionLabel="label"
          placeholder="Регион"
          filter
        />
        <div class="error" v-if="errorRegion">Обязательно</div>
      </div>
      <div class="form__item" v-if="!formData?.coverage?.nationality && formData?.coverage">
        <Dropdown
          @change="
            v$['city'].$touch;
            check();
          "
          v-model="formData.city"
          :options="filterCityLocation(formData?.franchise?.label, getSortWhereLabel(cityStore.all))"
          :disabled="!formData.region"
          empty-filter-message="Нет результатов"
          optionLabel="label"
          placeholder="Город"
          filter
        />
        <div class="error" v-if="errorCity">Обязательно</div>
      </div>
      <!-- <pre>
        {{ getSortWhereLabel(resourceStore.getList?.categories) }}
      </pre> -->
      <div class="form__item">
        <Dropdown
          :disabled="!formData?.coverage"
          @change="
            v$['category'].$touch;
            check();
          "
          v-model="formData.category"
          :options="changePlaceCategory(getSortWhereLabel(resourceStore.list?.categories))"
          optionLabel="label"
          placeholder="Категория"
        />
        <div class="error" v-if="v$['category'].$error">
          {{ v$['category'].$errors[0].$message }}
        </div>
      </div>
      <div class="form__item">
        <Dropdown
          @change="
            v$['project'].$touch;
            check();
          "
          v-model="formData.project"
          :options="getSortWhereLabel(resourceStore.getList?.projects)"
          optionLabel="label"
          placeholder="Проект"
        />
        <div class="error" v-if="v$['project'].$error">
          {{ v$['project'].$errors[0].$message }}
        </div>
      </div>
      <div class="form__item">
        <Dropdown
          filter
          @change="
            v$['curator'].$touch;
            check();
          "
          empty-filter-message="Нет результатов"
          v-model="formData.curator"
          :options="getSortWhereLabel(userList?.data?.curators)"
          optionLabel="label"
          placeholder="Куратор"
        />
      </div>
    </form>
  </div>
</template>

<script setup>
import { useVuelidate } from '@vuelidate/core';
import { required, helpers } from '@vuelidate/validators';

import { useResourceStore } from '@/store/resource';
import { useCategoryStore } from '@/store/category';
import { useCountryStore } from '@/store/country';
import { useRegionStore } from '@/store/region';
import { useCityStore } from '@/store/city';
import { useCoverageStore } from '@/store/coverage';
import { getSortWhereLabel } from '@/store/sort';
import { useUserStore } from '@/store/user';

const props = defineProps(['closeModal', 'formData']);
const emit = defineEmits(['closeModal', 'update-formData']);

const countryStore = useCountryStore();
const regionStore = useRegionStore();
const categoryStore = useCategoryStore();
const cityStore = useCityStore();
const coverageStore = useCoverageStore();
const userStore = useUserStore();
const cropper_show = ref(false);

await coverageStore.requestCoverage();

let userList = ref(await userStore.getTutorsList());

const resourceStore = useResourceStore();

onMounted(async () => {
  await categoryStore.requestListSubsections();
});

function check() {
  v$.value.$validate();
  emit('update-formData', [formData, v$.value.$error]);
}

let errorCountry = ref(false);
let errorRegion = ref(false);
let errorCity = ref(false);
let image = ref();

const formData = reactive({
  type: null,
  name: null,
  url: null,
  desc: null,
  country: null,
  region: null,
  city: null,
  project: null,
  franchise: null,
  // team: null,
  curator: null,
  image: null,
  category: null,
  coverage: null,
});

watch(
  () => formData.coverage,
  async () => {
    if (!formData.coverage.nationality) {
      await regionStore.get(formData?.coverage?.countryId);
      errorCountry.value = false;
      formData.country = { id: formData?.coverage?.countryId };
      emit('update-formData', [formData, v$.value.$error]);
      await resourceStore.requestList(2);
    } else {
      formData.country = null;
      formData.city = null;
      formData.region = null;
      emit('update-formData', [formData, v$.value.$error]);
      await resourceStore.requestList(1);
    }
  }
);

watch(
  () => formData.region,
  () => {
    if (!formData.coverage.nationality) {
      if (!formData.region) {
        errorRegion.value = true;
      } else {
        errorRegion.value = false;
        emit('update-formData', [formData, v$.value.$error]);
      }
    }
  }
);

watch(
  () => formData.city,
  () => {
    if (!formData.coverage.nationality) {
      if (!formData.city) {
        errorCity.value = true;
      } else {
        errorCity.value = false;
        emit('update-formData', [formData, v$.value.$error]);
      }
    }
  }
);

onMounted(async () => {
  await countryStore.get();
  await resourceStore.requestTypeResources();
});

const rules = computed(() => {
  return {
    type: {
      required: helpers.withMessage('Обязательно', required),
    },
    name: {
      required: helpers.withMessage('Обязательно', required),
    },
    url: {
      required: helpers.withMessage('Обязательно', required),
    },
    desc: {
      required: helpers.withMessage('Обязательно', required),
    },
    country: {
      // required: helpers.withMessage('Обязательно', required),
    },
    region: {
      // required: helpers.withMessage('Обязательно', required),
    },
    city: {
      // required: helpers.withMessage('Обязательно', required),
    },
    project: {
      required: helpers.withMessage('Обязательно', required),
    },
    franchise: {
      required: helpers.withMessage('Обязательно', required),
    },
    coverage: {
      required: helpers.withMessage('Обязательно', required),
    },
    // team: {
    //   required: helpers.withMessage('Обязательно', required),
    // },
    curator: {},
    category: {
      required: helpers.withMessage('Обязательно', required),
    },
    image: {
      required: helpers.withMessage('Картинка обязательна', required),
    },
  };
});

const v$ = useVuelidate(rules, formData);

const customBase64Uploader = (event) => {
  const file = event.files[0];
  image.value = file.objectURL;
  formData.image = file;
  v$.value.$validate();
  emit('update-formData', [formData, v$.value.$error]);
};

watch(
  () => formData['region'],
  async () => {
    await cityStore.get(formData['region']?.id);
  }
);

// async function checkCoverage() {
//   if (formData.coverage.label.indexOf('Мир') > -1) {
//     await resourceStore.requestList(1);
//   } else {
//     await resourceStore.requestList(2);
//   }
//   if (!formData.coverage.nationality) {
//     if (formData.country && formData.city && formData.region) {
//       v$.value.$validate();
//       emit('update-formData', [formData, v$.value.$error]);
//     } else {
//       if (!formData.country) {
//         errorCountry.value = true;
//       }
//       if (!formData.region) {
//         errorRegion.value = true;
//       }
//       if (!errorCity.value) {
//         errorCity.value = true;
//       }
//     }
//   } else {
//     formData.city = null;
//     formData.country = null;
//     formData.region = null;
//     v$.value.$validate();
//     emit('update-formData', [formData, v$.value.$error]);
//   }
// }

function changePlaceCategory(arr) {
  let newArr = [];
  if (arr) {
    arr.map((item) => {
      if (item?.label == 'Новости региона') {
        newArr.unshift(item);
      }
      if (item?.label == 'Новости города') newArr.push(item);
    });

    return [
      ...newArr,
      ...arr.filter((item) => {
        if (item?.label != 'Новости региона' && item?.label != 'Новости города') return item;
      }),
    ];
  } else {
    return null;
  }
}

function filterCityLocation(franchiseName, city) {
  if (franchiseName == 'Национальная') {
    let filterLocation = [];
    for (let i = 0; i < city?.length; ++i) {
      if (city[i].label == 'Все города') {
        filterLocation.push(city[i]);
        break;
      }
    }
    for (let i = 0; i < city?.length; ++i) {
      if (city[i].label == 'Все города') {
        continue;
      }
      filterLocation.push(city[i]);
    }
    return filterLocation;
  }
  return city;
}
</script>
