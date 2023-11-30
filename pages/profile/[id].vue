<template>
  <div class="profile container" v-if="userStore?.getProfile != 500">
    <section class="profile_container">
      <blocksProfile :data="userStore.getProfile" />
      <div class="profile_tabs">
        <button class="profile_tabs_btn" :class="{ profile_tabs_btn_active: tabs == 1 }" @click="tabs = 1">
          Ресурсы: {{ userStore.getProfileTotal?.resources }}
        </button>
        <button class="profile_tabs_btn" :class="{ profile_tabs_btn_active: tabs == 2 }" @click="tabs = 2">
          Команды:
          {{
            userStore.getProfileTotal?.teams?.user +
            userStore.getProfileTotal?.teams?.referrers +
            userStore.getProfileTotal?.teams?.referrals
          }}
        </button>
        <button class="profile_tabs_btn" :class="{ profile_tabs_btn_active: tabs == 3 }" @click="tabs = 3">
          Рефералы: {{ userStore.getProfileTotal?.referrals }}
        </button>
        <button class="profile_tabs_btn" :class="{ profile_tabs_btn_active: tabs == 4 }" @click="tabs = 4">
          Партнёры: 0
        </button>
        <button class="profile_tabs_btn" :class="{ profile_tabs_btn_active: tabs == 5 }" @click="tabs = 5">
          Я спонсор: {{ userStore.getProfileTotal?.students }}
        </button>
        <button class="profile_tabs_btn" :class="{ profile_tabs_btn_active: tabs == 6 }" @click="tabs = 6">
          Мой спонсор: {{ userStore.getProfileTotal?.sponsors }}
        </button>
      </div>
    </section>

    <component
      :is="
        tabs == 1
          ? resource
          : tabs == 2
          ? team
          : tabs == 3
          ? referalka
          : tabs == 5
          ? iSponsor
          : tabs == 6
          ? mySponsor
          : tabs == 4
          ? partner
          : null
      "
    />
  </div>
  <h2 class="container page-title" v-else>Такого профиля не существует</h2>
</template>

<script setup>
import resource from '@/components/cards/profileResource.vue';
import team from '@/components/cards/profileTeam.vue';
import referalka from '@/components/cards/profileReferalka.vue';
import mySponsor from '@/components/cards/profileSponsor.vue';
import iSponsor from '@/components/cards/profileStudent.vue';
import partner from '@/components/Blocks/profile/partner.vue';
import { useUserStore } from '@/store/user.js';
import { useRoute } from 'vue-router';
// import { getSortWhereLabel, getSortFranchise, getSortTeamFromProfile } from '@/store/sort';
// import url from '@/store/config';

const router = useRoute();
const userStore = useUserStore();
const tabs = ref(1);
const error = useError();

await userStore.requestProfile(router.params.id);

// let visibleModalWithAllTxt = ref(false);

// tabs.value == 1?  console.log("Hello World!") : console.log("g");
// if(tabs.value == 1) console.log("Hello World!");
// else console.log("g");

// function getLink(id) {
//   let link = `/resources?page=1&text=&project=&category=&franchise=${id}&country=&region=&city=`;
//   return link;
// }

// function getFranchiseWithoutNull(arr) {
//   let sortFranchise = [];
//   for (let i = 0; i < arr?.length; ++i) {
//     if (arr[i]?.franchise) sortFranchise.push(arr[i]);
//   }
//   return sortFranchise;
// }
</script>

<style lang="scss" scoped>
.profile {
  .profile_container {
    .profile_tabs {
      padding-top: 20px;
      display: flex;
      gap: 20px;
      flex-wrap: wrap;
      justify-content: flex-start;
      button {
        font-size: 20px;
        font-weight: bold;
        background: transparent;
        border: none;
      }
      &_btn {
        color: green;
        &_active {
          color: black;
        }
      }
    }
  }
}
</style>
