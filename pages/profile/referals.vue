<template>
  <div class="myReferal container">
    <div style="margin-bottom: 0" class="myReferal_btns">
      <Button class="button-myRefer" @click="OnClick(myReferal)" :class="{ active_myReferal_btn: isActiveReferal }"
        >МОИ РЕФЕРАЛЫ</Button
      >
      <Button class="button-myRefer" @click="OnClick(myReferer)" :class="{ active_myReferal_btn: isActiveReferer }"
        >МОИ РЕФЕРЕРЫ</Button
      >
      <BlocksReferal />
    </div>
    <ul class="referal_programm_info">
      <h3><b>Приглашай и зарабатывай!</b></h3>
      <li>
        <b>1.</b> На социальной экосистеме МИР работают 2 многоуровневые реферальные программы: «<NuxtLink
          class="referal_info_link"
          to="https://earn.mirecosystem.ru/moy_limon"
          target="_blank"
          >Мой лимон!</NuxtLink
        >» и «<NuxtLink class="referal_info_link" to="https://earn.mirecosystem.ru/rodoslovnaya" target="_blank"
          >Родословная</NuxtLink
        >».
      </li>
      <li>
        <b>2.</b> Программы выплачивают разные вознаграждения за одних и тех же рефералов по 10-ти («Мой лимон!») и всем
        («Родословная») реферальным уровням.
      </li>
      <li>
        <b>3.</b> «Мой лимон!» выплачивает «лимоны» (1 лимон = 1 рубль РФ), их можно выводить в деньги на банковские карты и
        электронные кошельки.
      </li>
      <li>
        <b>4.</b> «Родословная» выплачивает «роллары» (1 роллар = 1 доллар США), их возможности см. во втором видео ниже.
      </li>
      <li>
        <b>5.</b> Участвуй в обеих программах абсолютно бесплатно – просто приглашай друзей и зарабатывай! Узнай подробности
        в двух видео ниже.
      </li>
    </ul>
    <div class="referal_programm">
      <div class="referal_programm_content referal_programm_frame">
        <iframe
          height="315px"
          style="max-height: 315px; width: 100%"
          src="https://www.youtube.com/embed/ADUlP_XYq8c?si=vZ8ssRJtcOsUFObS"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        >
        </iframe>
      </div>
      <div class="referal_programm_content">
        <div class="referal_programm_name">Выплаты программы «Мой лимон!»</div>
        <div class="referal_programm_statistics">
          <div class="referal_programm_level">
            <h3 class="referal_programm_subtitle">Уровень</h3>
            <h3>1</h3>
            <h3>2</h3>
            <h3>3</h3>
            <h3>4</h3>
            <h3>5</h3>
            <h3>6</h3>
            <h3>7</h3>
            <h3>8</h3>
            <h3>9</h3>
            <h3>10</h3>
          </div>
          <div class="referal_programm_level">
            <h3 class="referal_programm_subtitle">Лимоны</h3>
            <h3>От 5 до 185 (<NuxtLink
          class="referal_info_link"
          to="https://earn.mirecosystem.ru/moy_limon"
          target="_blank"
          > подробности </NuxtLink
        >)</h3>
            <h3>2</h3>
            <h3>2</h3>
            <h3>2</h3>
            <h3>2</h3>
            <h3>2</h3>
            <h3>2</h3>
            <h3>2</h3>
            <h3>2</h3>
            <h3>17</h3>
          </div>
        </div>
      </div>
    </div>
    <NuxtLink class="link_referal_more" to="https://earn.mirecosystem.ru/moy_limon" target="_blank">ПОДРОБНОСТИ</NuxtLink>
    <div class="referal_programm">
      <div class="referal_programm_content referal_programm_frame">
        <iframe
          height="315px"
          style="max-height: 315px; width: 100%"
          src="https://www.youtube.com/embed/HyabkJ_W1k4?si=RcvGQ0S2kLBp6NAF"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        >
        </iframe>
      </div>
      <div class="referal_programm_content">
        <div class="referal_programm_name">Выплаты программы «Родословная»</div>
        <div class="referal_programm_statistics">
          <h3>2 роллара за каждого реферала на всех уровнях</h3>
        </div>
      </div>
    </div>
    <NuxtLink class="link_referal_more" to="https://earn.mirecosystem.ru/rodoslovnaya" target="_blank">ПОДРОБНОСТИ</NuxtLink>
    <div class="myReferal_content">
      <div class="referal_list">
        <div class="myAchievements">
          <BlocksAchievement
            v-if="currentTab.__name == 'myReferer'"
            label="Рефереры"
            :data="`${userStore.referees?.referrers?.length}`"
          />
          <BlocksAchievement
            v-else
            label="Рефералы"
            :data="`${userStore.referrals?.count ?? userStore.referrals?.total?.count}`"
          />
          <BlocksAchievement label="Роллары" :data="`${userStore.referrals?.pointsAmount || 0}`" />
          <!-- <div class="myAchievements_item">
                        <span> Рефералы </span>
                        <Chip :label="`${}`" />
                    </div> -->
          <!-- <div class="myAchievements_item">
                        <span> Баллы </span>
                        <Chip :label="`${userStore.user?.points}`" />
                    </div> -->
        </div>
        <div class="referal_list_content">
          <component :is="currentTab"></component>
          <!--                    <div class="btns_pagination">-->
          <!--                        <button class="arrow_left_pagination"></button>-->
          <!--                        <button class="arrow_right_pagination"></button>-->
          <!--                    </div>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import myReferer from '~~/components/Blocks/myReferer.vue';
import myReferal from '~~/components/Blocks/myReferal.vue';
import { useUserStore } from '~/store/user';

const userStore = useUserStore();
await userStore.requestReferees(userStore.user.id);

const isActiveReferal = ref(true);
const isActiveReferer = ref(false);

const currentTab = ref(myReferal);

const OnClick = (btnName) => {
  if (btnName.__name == 'myReferal') {
    currentTab.value = btnName;
    isActiveReferal.value = true;
    isActiveReferer.value = false;
  } else if (btnName.__name == 'myReferer') {
    currentTab.value = btnName;
    isActiveReferal.value = false;
    isActiveReferer.value = true;
  }
};
</script>

<style lang="scss" scoped>
.myReferal_btns {
  .active_myReferal_btn,
  .button-myRefer:focus {
    background: transparent !important;
    color: #2c96ea;
  }
}

.referal_programm {
  display: flex;
  gap: 50px;
  @media (max-width: $large) {
    flex-direction: column;
  }
}
.referal_programm_statistics {
  display: flex;
  gap: 50px;
  font-size: 20px;
}
.referal_programm_level {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.referal_programm_name {
  font-size: 24px;
  color: #2c96ea;
}
.referal_programm_subtitle {
  text-decoration: underline;
}

.referal_programm_frame {
  max-width: 560px;
  width: 100%;
}

.referal_programm_info {
  line-height: 1.3;
  font-size: 18px;
}

.referal_info_link {
  text-decoration: underline;
}

.link_referal_more {
  background: linear-gradient(90.25deg, #2c96ea 9.03%, #00d1ff 98.03%);
  max-width: 200px;
  color: #fff;
  font-size: 20px;
  padding: 10px 15px;
  text-align: center;
  border-radius: 23.5px;
  transition: 0.3s;
}
a{
  color:#2c96ea;
}
</style>
