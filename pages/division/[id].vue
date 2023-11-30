<template>
  <div class="division container">
    <!-- <section class="division_cards"> -->
    <div class="header_container">
      <div class="avatar_container">
        <img
          loading="lazy"
          v-if="division?.data?.subsection?.picture"
          class="division_avatar avatar"
          :src="`${url}/api/public${division?.data?.subsection?.picture}`"
        />
      </div>
      <div class="text_container">
        <div class="name_container">Дивизион {{ division.data?.subsection?.label }}</div>
        <div class="team_container">
          <div class="team_contain">Команд: {{ division.data?.subsection?.teamsCount }},</div>
          <div class="team_contain">Уровней: {{ maxLevel }}</div>
        </div>
      </div>
    </div>
    <!-- 
      <div
        class="franchisingLeaders-card_container"
        v-for="(value, index) in getSortWhereLabel(resourceStore?.resources?.resources?.rows)"
        :key="index"
      >
        <CardsResource :data="value" :showAllTxt="false" />
      </div> -->
    <!-- <CardsDivisions one="true" style="width: 494px; width: 100%" :data="division?.data?.subsection" /> -->
    <!-- </section> -->
    <section class="division_teams">
      <h2 class="page-subtitle" style="margin-bottom: 0">Команды дивизиона</h2>
      <div v-if="division.data?.teams?.length" class="division_card_cont" v-for="level in maxLevel">
        <div>
          <div v-if="getTeams(division.data?.teams, level)?.length">
            <h2 class="page-subtitle" v-if="getTeams(division.data?.teams, level)?.length">
              Уровень {{ level }} ({{ userLevel(division.data?.teams, level) }})
            </h2>
          </div>
        </div>
        <div style="padding-top: 32px;">
          <div class="division_card_item">
            <CardsTeam userIdOne="true" v-for="item in getTeams(division.data?.teams, level)" :data="item" />
          </div>
        </div>
      </div>
      <h2 class="page-subtitle" v-else>Команд нет</h2>
    </section>
  </div>
</template>

<script setup>
import { getSortWhereLabel } from '@/store/sort';
import { useCategoryStore } from '@/store/category';
import { useUserStore } from '@/store/user';
import url from '@/store/config.js';

const router = useRoute();
const userStore = useUserStore();
const categoryStore = useCategoryStore();

let division = ref();
division.value = await categoryStore.requestOneSubsection(router.params.id);

let maxLevel = ref(max(division.value.data?.teams));

function getTeams(arr, level) {
  return arr.filter((item) => {
    if (item.level == level) return item;
  });
}

function userLevel(arr, level) {
  return arr.filter((item) => item.level == level).length;
}

// function userLevel(arr, level) {
//   return arr.filter((userCount)=> {
//     if (item.userCount == level) return length
//   });
// }

function max(arr) {
  let max = 1;
  arr.map((item) => {
    if (max < item.level) max = item.level;
  });
  return max;
}
// let teams = ref([...getArr([...division.value?.data?.subsection?.teams,...division.value.data.teamsLevel])]);

//sdfsdf

// function getArr(arr) {
//   for(let item of arr) {
//     if(!item.level)  item.level = 1;
//     else  item.level = ++item.level;
//   }
//   return arr;
// }

// function getTeams(arr, level) {
//   let newArr = [];
//   newArr = arr.filter((item) => item.level == level);
//   return newArr;
// }
</script>
