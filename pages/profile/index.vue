<template>
  <div class="profile container">
    <section class="profile_container">
      <BlocksProfile :data="userStore?.profile" />
      <BlocksCounter :data="userStore?.profile" />
      <BlocksReferal class="referral-code_margin" />
      <div class="adminCode" style="font-weight: bold" v-if="userStore?.user?.isAdminHelper"></div>
    </section>
    <section>
      <div class="users_info">
        <div class="users_info_item">
          <nuxt-link class="user-link" to="/profile/resources">
            <img loading="lazy" src="@/assets/images/resource.svg" />
            <p>Ресурсы</p>
          </nuxt-link>
        </div>
        <div class="users_info_item">
          <nuxt-link class="user-link" to="/profile/teams">
            <img loading="lazy" src="@/assets/images/team.svg" />
            <p>Команды</p>
          </nuxt-link>
        </div>
        <div class="users_info_item">
          <nuxt-link class="user-link" to="/profile/referals">
            <img loading="lazy" src="@/assets/images/referal.svg" />
            <p>Рефералка</p>
          </nuxt-link>
        </div>
        <div class="users_info_item">
          <nuxt-link class="user-link" to="/profile/sponsorship">
            <IconsSponsorship style="fill: #01c314" />
            <p>Спонсорство</p>
          </nuxt-link>
        </div>
        <div class="users_info_item">
          <nuxt-link class="user-link" to="/profile/curating">
            <IconsCuratorship :color="'#01C314'"></IconsCuratorship>
            <p>Кураторство</p>
          </nuxt-link>
        </div>
        <div class="users_info_item">
          <nuxt-link class="user-link" to="/profile/finances">
            <img loading="lazy" src="@/assets/images/pointsTransfer.svg" />
            <p>Перевести роллары</p>
          </nuxt-link>
        </div>
        <div class="users_info_item" v-if="checkRoles(userStore?.user?.roles, 1)">
          <nuxt-link class="user-link" to="/profile/blog">
            <IconsVisitorBurgerMenuBlog :color="'#01C314'" />
            <p>Блог</p>
          </nuxt-link>
        </div>
        <!-- <div class="users_info_item">
          <nuxt-link class="user-link" to="/dev">
            <IconsVisitorBurgerMenuParther color="#9B9B9B" />
            <img loading="lazy"  src="@/assets/images/partners.svg" />
            <p>Партнерка</p>
          </nuxt-link>
        </div> -->
      </div>
    </section>

    <section v-if="CheckOnNull(userStore.getProfileResources)">
      <h1 class="page-title">Мои ресурсы</h1>
      <div class="last-resource-cards">
        <div
          class="last-resource-card_container"
          v-for="(value, index) in getSortWhereLabel(userStore.getProfileResources)"
          :key="index"
        >
          <CardsResource :data="value" />
        </div>
      </div>
    </section>
    <section v-if="userStore?.getProfile?.teams?.user?.length">
      <h1 class="page-title">Мои команды</h1>
      <div class="last-command-cards">
        <div class="last-command-card_container" v-for="(value, index) in userStore?.getProfile?.teams?.user" :key="index">
          <CardsTeam :data="value" />
        </div>
      </div>
    </section>

    <section v-if="getFranchiseWithoutNull(userStore?.getFranchises)?.length">
      <h1 class="page-title">Мои франшизы</h1>
      <div class="last-franchise-cards">
        <div
          class="last-franchise-card_container"
          v-for="(value, index) in getFranchiseWithoutNull(userStore?.getFranchises)"
          :key="index"
        >
          <nuxt-link :to="`/channels/${value?.franchise?.id}`">
            <CardsFranchise :data="value?.franchise" />
          </nuxt-link>
        </div>
      </div>
    </section>

    <section
      v-if="
        !CheckOnNull(userStore?.getProfileResources) &&
        !CheckOnNull(userStore?.getTeams) &&
        !CheckOnNull(userStore?.getFranchises)
      "
    >
      <div class="message">
        <h2 class="page-subtitle">Вы ничего не публиковали</h2>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useUserStore } from '@/store/user.js';
import { getSortWhereLabel, getSortFranchise, getSortTeamFromProfile } from '@/store/sort';
import url from '@/store/config';
import { useAdminListStore } from '~/store/adminList.js';
const userStore = useUserStore();
await userStore.requestProfile(userStore.data.id);

let visibleModalWithAllTxt = ref(false);
const adminListStore = useAdminListStore();
function getFranchiseWithoutNull(arr) {
  let sortFranchise = [];
  for (let i = 0; i < arr?.length; ++i) {
    if (arr[i]?.franchise) sortFranchise.push(arr[i]);
  }
  return sortFranchise;
}

function getTeamsWithoutNull(arr) {
  let sortTeams = [];
  for (let i = 0; i < arr?.length; ++i) {
    if (arr[i].team) sortTeams.push(arr[i]);
  }
  return sortTeams;
}

function CheckOnNull(value) {
  if (!value?.length) {
    return false;
  }
  return true;
}
function getLink(id) {
  let link = `/resources?page=1&text=&project=&category=&franchise=${id}&country=&region=&city=`;
  return link;
}
</script>
