<template>
  <div class="global-search">
    <div class="global-search_text">
      <InputText
        style="border-color: #01c314"
        @focus="focusSearch = true"
        @focusout="focusSearch = false"
        placeholder="Поиск по сайту"
        v-model.trim="txt"
      />
      <div
        @mousemove="moveList = true"
        @mouseleave="moveList = false"
        v-if="(txt && focusSearch) || moveList"
        class="global-search_text_list"
      >
        <div
          v-if="delEmptyArr(result, Object.keys(result ?? {}))?.length"
          v-for="value in delEmptyArr(result, Object.keys(result ?? {}))"
          class="global-search_text_list_group"
        >
          <div class="global-search_text_list_group_container" v-if="result[value]?.value?.length">
            <p class="global-search_text_list_group_container_title">{{ getLabel(value) }}</p>
            <NuxtLink
              class="global-search_text_list_group_container_card"
              v-for="item in result[value]?.value"
              :to="`/${getLink(value, item?.id)}`"
              style="display: flex; gap: 20px"
            >
              <!-- <pre>
                {{ item?.picture }}
              </pre> -->
              <div class="global-search_text_list_group_container_card_picture">
                <template v-if="value == 'profile'">
                  <div class="avatar_container">
                    <BlocksUserAvatar
                      size="min"
                      :status="item?.status"
                      :img="item?.picture || item?.avatar || item?.preview || item?.image"
                      :roleId="checkRoles(item?.roles, 2)"
                    />
                  </div>
                </template>
                <template v-else-if="value != 'teams'">
                  <img
                    v-if="item?.picture || item?.avatar || item?.preview || item?.image"
                    width="50"
                    height="50"
                    :src="getImage(value, item?.picture || item?.avatar || item?.preview || item?.image)"
                  />
                  <img v-else src="~/assets/images/avatar.svg" alt="" />
                </template>
                <template v-else-if="value == 'teams'">
                  <img
                    v-if="item?.picture && item?.type == 0"
                    width="50"
                    height="50"
                    :src="getImage(value, item?.picture)"
                  />
                  <div
                    v-else-if="item?.type == 1"
                    class="avatar-elite"
                    style="
                      width: 60px;
                      height: 60px;
                      background-image: url(/border.png);
                      background-position: center;
                      background-size: cover;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                    "
                  >
                    <img
                      v-if="item?.picture"
                      style="width: 45px; height: 45px"
                      class="avatar"
                      :src="getImage(value, item?.picture)"
                      alt=""
                    />
                    <img v-else style="width: 45px; height: 45px" class="avatar" src="~/assets/images/avatar.svg" alt="" />
                  </div>
                  <img width="50" height="50" v-else src="~/assets/images/avatar.svg" alt="" />
                </template>
              </div>
              <div class="global-search_text_list_group_container_card_label">
                {{ item?.label || item?.name || item?.title }}
              </div>
            </NuxtLink>
          </div>
        </div>
        <div v-else class="global-search_text_list_group_empty">
          <p>Нет результатов</p>
        </div>
      </div>
    </div>
    <Button
      @focusin="focusSearch = true"
      @focusout="focusSearch = false"
      v-if="supportSpeechRecognition && !props?.phone"
      @click="startVoiceSearch"
      rounded
      outlined
      aria-label="Search"
      style="padding: 5px; border: 1px solid #01c314; background-color: #01c314"
    >
      <i style="font-size: 20px; color: #fff" class="pi pi-microphone" />
    </Button>
  </div>
</template>

<script setup>
import { useGlobalStore } from '@/store/global';
import url from '~/store/config';

const props = defineProps(['phone']);

const globalStore = useGlobalStore();
const recognition = ref(null);
const result = ref({});
const nuxtApp = useNuxtApp();

let supportSpeechRecognition = ref(false);
let txt = ref(null);
let focusSearch = ref(false);
let moveList = ref(false);

nuxtApp.hook('page:finish', () => {
  focusSearch.value = false;
});

onMounted(() => {
  if (process.client) {
    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (typeof window.SpeechRecognition === 'undefined') console.error('Speech recognition not supported');
    else {
      supportSpeechRecognition.value = true;
      recognition.value = new window.SpeechRecognition();
      recognition.value.continuous = true;

      recognition.value.interimResults = true;

      recognition.value.maxAlternatives = 3;

      recognition.value.lang = 'ru-RU';
    }
  }
});

watch(txt, async () => {
  result.value = await globalStore.sendText(txt.value);
});

async function startVoiceSearch() {
  recognition.value.start();
  let isSpeak = true;
  recognition.value.onresult = (e) => {
    txt.value = e.results[0][0].transcript;
    isSpeak = true;
    setTimeout(() => {
      if (!isSpeak) recognition.value.stop();
      else isSpeak = false;
    }, 2000);
  };

  recognition.value.onstop = () => clearTimeout();

  recognition.value.onerror = ({ error }) => {
    console.error(error);
  };
}

const user_status = defineAsyncComponent({
  loader: () => import(`../Icons/status/${getUserStatus()}.vue`),
  errorComponent: () => null,
});

function getLink(keyName, id) {
  if (keyName == 'blogs') return keyName + '/post/' + id;
  else if (keyName == 'currencys') return 'derive';
  else if (keyName == 'rubrics') return `blogs/rubric/${id}`;
  else if (keyName == 'category') return `resources/category/${id}`;
  else return keyName + '/' + id;
}

function delEmptyArr(arr, keys) {
  let newArr = [];
  if (keys?.length) {
    for (let key of keys) {
      if (arr[key]?.value?.length) newArr.push(key);
    }
  }
  return newArr;
}

function getLabel(label) {
  let entity = {
    profile: 'Пользователи',
    teams: 'Команды',
    resources: 'Ресурсы',
    blogs: 'Посты',
    currencys: 'Курсы',
    rubrics: 'Рубрики',
    category: 'Категории',
    division: 'Дивизионы',
  };
  return entity[label];
}

function getImage(keyName, picture) {
  if (keyName == 'blogs' || keyName == 'currencys') return `${url}/api/${picture}`;
  else return `${url}/api/public${picture}`;
}
</script>

<style lang="scss" scoped>
.global-search {
  display: flex;
  max-width: 100%;
  width: 60%;
  gap: 15px;
  align-items: center;
  position: relative;
  // width: clamp(50%, 50%, 100%);
  &_text {
    flex: 1 1 auto;
    & > input {
      width: 100%;
      border-radius: 2em;
      padding: 5px 10px;
      font-size: 14px;
    }
    &_list {
      position: absolute;
      background: white;
      max-height: 400px;
      width: 100%;
      overflow-y: scroll;
      padding: 12px;
      display: flex;
      flex-direction: column;
      border-radius: 0 0 8px 8px;
      top: 33px;
      gap: 16px;
      &_group {
        &_container {
          display: flex;
          flex-direction: column;
          gap: 2em;
          &_title {
            font-weight: bold;
          }
          &_card {
            display: flex;
            cursor: pointer;
            gap: 10px;
            &_picture > img {
              width: 50px;
              height: 50px;
              border-radius: 50%;
              object-fit: cover;
            }
            &_label {
              font-weight: bold;
            }
          }
        }
      }
    }
  }
}
@media screen and (max-width: $x-large) {
  .global-search {
    width: 80%;
  }
}
@media screen and (max-width: $medium) {
  .global-search {
    width: 100%;
  }
}
</style>
