<template>
  <div class="mirecosystem">
    <section class="main-content banner">
      <LazyBlocksBanner @toAnchorLink="toAnchorLink($event)" />
    </section>
    <section class="main-content container">
      <BlocksPostLast />
    </section>
    <section class="main-content container">
      <BlocksResourcesLast />
    </section>
    <section class="main-content container">
      <BlocksDerivesLast />
    </section>
    <section class="main-content banner">
      <LazyBlocksBannerMir />
    </section>
    <section class="main-content container">
      <BlocksDivisionsLast />
    </section>
    <section class="main-content container">
      <BlocksTeamsLast />
    </section>
    <section class="main-content container">
      <BlocksReferalsLeaders />
    </section>
    <section class="main-content container">
      <BlocksReferalsLast />
    </section>
    <section class="main-content container">
      <BlocksSponsorsLeaders />
    </section>
    <section class="main-content container">
      <BlocksSponsorsLast />
    </section>
    <section class="main-content banner">
      <LazyBlocksBannerSchema />
    </section>
    <section class="main-content container">
      <h1 class="page-title">Сервисы</h1>
      <div class="icon_info">
        <div class="icon_info_item">
          <nuxt-link class="icon-link" to="/news">
            <IconsVisitorBurgerMenuNews class="icon_icon" :color="'#01C314'" />
            <p>Новости</p>
          </nuxt-link>
        </div>
        <div class="icon_info_item">
          <nuxt-link class="icon-link" to="/weather">
            <IconsVisitorBurgerMenuWeather class="icon_icon" :color="'#01C314'" />
            <p>Погода</p>
          </nuxt-link>
        </div>
        <div class="icon_info_item">
          <nuxt-link class="icon-link" to="/tv">
            <IconsVisitorBurgerMenuTv class="icon_icon" :color="'#01C314'" />
            <p>Телевидение</p>
          </nuxt-link>
        </div>
        <div class="icon_info_item">
          <nuxt-link class="icon-link" to="/radio">
            <IconsVisitorBurgerMenuRadio class="icon_icon" :color="'#01C314'" />
            <p>Радио</p>
          </nuxt-link>
        </div>
        <div class="icon_info_item">
          <nuxt-link class="icon-link" to="/films-and-shows">
            <IconsVisitorBurgerMenuMovie class="icon_icon" :color="'#01C314'" />
            <p style="white-space: nowrap">Кино и сериалы</p>
          </nuxt-link>
        </div>
        <div class="icon_info_item">
          <nuxt-link class="icon-link" to="/events">
            <IconsVisitorBurgerMenuCalendar class="icon_icon" :color="'#01C314'" />
            <p>Афиша</p>
          </nuxt-link>
        </div>
        <div class="icon_info_item">
          <nuxt-link class="icon-link" to="/tvguide">
            <IconsVisitorBurgerMenuPk class="icon_icon" :color="'#01C314'" />
            <p>Телепрограмма</p>
          </nuxt-link>
        </div>
        <div class="icon_info_item">
          <nuxt-link class="icon-link" to="/travel">
            <IconsVisitorBurgerMenuAirplane class="icon_icon" :color="'#01C314'" />
            <p>Путешествия</p>
          </nuxt-link>
        </div>
        <div class="icon_info_item">
          <nuxt-link class="icon-link" to="/translate">
            <IconsVisitorBurgerMenuLanguage class="icon_icon" :color="'#01C314'" />
            <p>Переводчик</p>
          </nuxt-link>
        </div>
        <div class="icon_info_item">
          <nuxt-link class="icon-link" to="/ai">
            <IconsVisitorBurgerMenuAi class="icon_icon" :color="'#01C314'" />
            <p>Нейросети</p>
          </nuxt-link>
        </div>
      </div>
    </section>
    <section class="main-content container">
      <h1 class="page-title">Важное</h1>
      <div class="icon_info">
        <div class="icon_info_item">
          <nuxt-link class="icon-link" to="/about-project">
            <IconsInfo class="icon_icon" :color="'#019EC3'" />
            <p>О проекте</p>
          </nuxt-link>
        </div>
        <div class="icon_info_item">
          <nuxt-link class="icon-link" to="/earnmoney">
            <IconsUserBurgerMenuEarnMoney class="icon_icon" :color="'#019EC3'" />
            <p>Заработать</p>
          </nuxt-link>
        </div>
        <div class="icon_info_item">
          <nuxt-link class="icon-link" to="/academy">
            <IconsVisitorBurgerMenuKinderneo class="icon_icon" :color="'#019EC3'" />
            <p>Академия</p>
          </nuxt-link>
        </div>
        <div class="icon_info_item">
          <nuxt-link class="icon-link" to="/resources">
            <IconsUserBurgerMenuResource class="icon_icon" :color="'#019EC3'" />
            <p>Ресурсы</p>
          </nuxt-link>
        </div>
        <div class="icon_info_item">
          <nuxt-link class="icon-link" to="/kinderneo">
            <IconsVisitorBurgerMenuUniversityBlue class="icon_icon" />
            <p style="white-space: nowrap">Университет</p>
          </nuxt-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const emit = defineEmits(['toAnchorLink']);

function toAnchorLink(name) {
  emit('toAnchorLink', name);
}
</script>

<style lang="scss" scoped>
.icon_info {
  display: grid;
  grid-template-columns: repeat(5, 140px);
  justify-content: space-between;
  gap: 30px;
  @media (max-width: $large) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media (max-width: $medium) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: $small) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: $x-small) {
    grid-template-columns: repeat(1, 1fr);
  }
  .icon_info_item {
    .icon-link {
      font-weight: 400;
      font-size: 20px;
      display: flex;
      align-items: center;
      flex-direction: column;
      gap: 10px;

      .icon_icon {
        max-width: none;
        width: 80px;
        height: 80px;
      }
    }
  }
  .icon_icon {
    height: 40px;
    max-width: 50px;
  }
}
@media (max-width: $small) {
  .icon_info {
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 20px;
    &_item a {
      flex-direction: row !important;
      gap: 20px;
    }
  }
}
@media screen and (max-width: $x-small) {
  .icon_info {
    justify-content: flex-start;
  }
}
@media (max-width: 320px) {
  .icon-link {
    justify-content: flex-start;
    align-items: center !important;
    flex-direction: row !important;
    gap: 20px;
  }
  .icon_info {
    grid-template-columns: repeat(1, 1fr);
    gap: 30px;
  }
}
.allTxt {
  .p-dialog-content {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    h3 {
      font-size: 20px;
      text-align: left;
      color: #343a40;
    }
    .link,
    a {
      font-size: 18px;
    }
    .info,
    .link {
      width: 100%;
      font-size: 18px;
    }
    .data {
      color: #9b9b9b;
    }
  }
}
.item_count {
  display: flex;
  align-items: center;
  gap: 10px;
  p {
    display: block;
    margin-top: 40px;
  }
}

.d1 {
  display: flex;
  align-items: center;
  gap: 10px;
  p {
    display: block;
    margin-top: 40px;
  }
}
.button-ind {
  margin-top: 34px;
  color: white;
  background: #18af10;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.25);
  border-radius: 7px;
  font-size: 20px;
  padding: 15px 45px;
  @media screen and (max-width: $x-small) {
    width: 100%;
    display: flex;
    justify-content: center;
  }
}

.resource_form {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 50px;
  .resource_form_item {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
  }
  .sort__select {
    flex-wrap: wrap;
    @media (max-width: $x-small) {
      .p-dropdown {
        width: 100%;
      }
    }
  }
  .resource_form_item:nth-child(2) {
    gap: 26px;
  }
  .resource_form_item:nth-child(1) {
    gap: 39px;
    .find {
      display: flex;
      justify-content: center;
      input {
        max-width: 311px;
        width: 100%;
        padding-left: 15px;
        height: 43px;
        background: #ffffff;
        border-radius: 14px 0 0 14px;
        // box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.25);
        @media screen and (max-width: $x-small) {
          max-width: 100%;
        }
      }
      .find_btn {
        margin: 0 !important;
        padding: 0;
        background: #2c96ea;
        background-image: url(~/assets/images/find.png);
        background-size: 20px 20px;
        background-position: center center;
        background-repeat: no-repeat;
        width: 55px;
        height: 43px;
        border-radius: 0px 14px 14px 0px;
        box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.25);
      }
      @media screen and (max-width: $x-small) {
        margin-left: 0px;
      }
    }
  }
}

.content {
  margin: 40px 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 50px 20px;
  h2 {
    font-size: 32px;
    margin-bottom: 19px;
  }
}

@media (max-width: $large) {
  .content {
    grid-template-columns: repeat(3, 1fr);
  }
}
@media (max-width: $medium) {
  .content {
    grid-template-columns: repeat(2, 1fr);
  }
  .sort__select {
    align-items: center;
  }
}
@media (max-width: $x-small) {
  .content {
    grid-template-columns: 1fr;
  }
}

.card_h {
  margin-bottom: 34px;
}
.content_item {
  width: auto;
}

.last-posts-cards {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin-top: 30px;
  gap: 30px;
}
@media screen and (max-width: $large) {
  .last-posts-cards {
    grid-template-columns: 1fr;
  }
}
</style>
