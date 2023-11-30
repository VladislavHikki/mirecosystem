<template>
  <div class="visitor_burger_menu burger_menu">
    <div class="burger_item">
      <nuxt-link @click="$emit('closeMenu')" to="/"> <IconsVisitorBurgerMenuHome :color="'#019EC3'" />Главная </nuxt-link>
      <!-- <nuxt-link @click="$emit('closeMenu')" to="/blogs"> <IconsInfo :color="'#01C314'" />Блог </nuxt-link> -->
      <nuxt-link @click="$emit('closeMenu')" to="/about-project"> <IconsInfo :color="'#01C314'" />О проекте </nuxt-link>
      <nuxt-link @click="$emit('closeMenu')" to="/benefits">
        <IconsVisitorBurgerMenuBenefits :color="'#01C314'" />Льготы
      </nuxt-link>
      <div class="blogPK">
        <nuxt-link @click="$emit('closeMenu')" to="/blogs">
          <IconsVisitorBurgerMenuBlog :color="'#01C314'" />Блог
        </nuxt-link>
      </div>
      <div class="blogPK">
        <nuxt-link @click="$emit('closeMenu')" to="/derive"> <IconsCourse color="#01C314" />Курсы </nuxt-link>
      </div>
      <!-- <div class="blog" id="blog">
        <div style="display: flex; align-items: center">
          <IconsVisitorBurgerMenuGame class="burger_game_icon" :color="'#01C314'" />Блог
        </div>
      </div> -->
      <!-- <div id="blogs" v-if="clickBlog">
        <BlocksBlog @closeMenu="$emit('closeMenu')" />
      </div> -->
      <nuxt-link @click="$emit('closeMenu')" to="/games"> <IconsVisitorBurgerMenuGames :color="'#01C314'" />Игры </nuxt-link>
      <nuxt-link @click="$emit('closeMenu')" to="/earnmoney">
        <IconsUserBurgerMenuEarnMoney :color="'#01C314'" />Заработать
      </nuxt-link>
      <nuxt-link @click="$emit('closeMenu')" to="/orders">
        <IconsVisitorBurgerMenuOrders :color="'#01C314'" /> Стол заказов
      </nuxt-link>
      <nuxt-link @click="$emit('closeMenu')" to="/fooddeli">
        <IconsVisitorBurgerMenuFood class="burger_menu_icon" :color="'#01C314'" /> Доставка еды
      </nuxt-link>
      <nuxt-link @click="$emit('closeMenu')" to="/taxi">
        <IconsVisitorBurgerMenuTaxi class="burger_menu_icon" :color="'#01C314'" /> Такси
      </nuxt-link>
      <nuxt-link @click="$emit('closeMenu')" to="/academy">
        <IconsVisitorBurgerMenuKinderneo :color="'#01C314'" class="burger_menu_icon" /> Академия
      </nuxt-link>
      <!-- <nuxt-link to="/dev">
            <IconsVisitorBurgerMenuBlog/>Блог
        </nuxt-link>
        <nuxt-link to="/dev">
            <IconsVisitorBurgerMenuPrivilegies/>Льготы
        </nuxt-link>
        <nuxt-link @click="$emit('closeMenu')" to="/about-project">
            <IconsInfoMenu />О проекте
        </nuxt-link> -->
      <nuxt-link @click="$emit('closeMenu')" to="/resources"> <IconsUserBurgerMenuResource />Ресурсы </nuxt-link>
      <!-- <nuxt-link @click="$emit('closeMenu')" to="/announcements/">
            <IconsUserBurgerMenuAdvertising />Объявления
        </nuxt-link> -->
      <!-- <nuxt-link @click="$emit('closeMenu')" to="/teams"> <IconsUserBurgerMenuTeam />Команды </nuxt-link> -->
      <!-- <nuxt-link @click="$emit('closeMenu')" to="/franchises">
            <IconsUserBurgerMenuFranchises />Франшизы
        </nuxt-link> -->
      <!-- <nuxt-link @click="$emit('closeMenu')" to="/referals"> <IconsUserBurgerMenuReferalka />Рефералка </nuxt-link> -->
      <!-- <nuxt-link to="/dev">
            <IconsVisitorBurgerMenuBlog :color="'#9B9B9B'" />Блог
        </nuxt-link> -->
      <!-- <nuxt-link to="/dev">
            <IconsVisitorBurgerMenuPrivilegies :color="'#9B9B9B'" />Льготы
        </nuxt-link> -->
      <!-- <nuxt-link @click="$emit('closeMenu')" to="/sponsorship">
        <IconsSponsorship class="burger_menu_icon" :color="'#01C314'" />Спонсоры
      </nuxt-link> -->
      <!-- <nuxt-link target="_blank" to="https://t.me/Neyrobotor_bot">
      <IconsVisitorBurgerMenuNetwork class="burger_menu_icon" :color="'#01C314'" /> Нейросети
    </nuxt-link>
    <nuxt-link target="_blank" to="https://t.me/Teledigest_AL_bot">
      <IconsVisitorBurgerMenuChannels class="burger_menu_icon" :color="'#01C314'" /> Каналы
    </nuxt-link> -->

      <!-- <div class="game" @click="clickGame = !clickGame" id="game">
        <NuxtLink to="/the_game/structure" v-if="clickGame">
          <div style="display: flex; align-items: center">
            <IconsVisitorBurgerMenuGame class="burger_game_icon" :color="'#01C314'" />Большая игра
          </div>
        </NuxtLink>
        <div v-else style="display: flex; align-items: center">
            <IconsVisitorBurgerMenuGame class="burger_game_icon" :color="'#01C314'" />Большая игра
        </div>
      </div>
      <div id="games" v-if="clickGame">
        <BlocksGame @closeMenu="$emit('closeMenu')" />
      </div> -->
      <NuxtLink @click="$emit('closeMenu')" to="/the_game/structure">
        <IconsVisitorBurgerMenuGame :color="'#01C314'" class="burger_menu_icon" /> Большая игра
      </NuxtLink>
      <NuxtLink @click="$emit('closeMenu')" to="/kinderneo">
        <IconsVisitorBurgerMenuUniversityGreen class="burger_menu_icon" /> Университет
      </NuxtLink>
      <NuxtLink @click="$emit('closeMenu')" to="/news">
        <IconsVisitorBurgerMenuNews class="burger_menu_icon" :color="'#01C314'" /> Новости
      </NuxtLink>
      <NuxtLink @click="$emit('closeMenu')" to="/sport">
        <IconsVisitorBurgerMenuSport class="burger_menu_icon" :color="'#01C314'" /> Спорт
      </NuxtLink>
      <NuxtLink @click="$emit('closeMenu')" to="/weather">
        <IconsVisitorBurgerMenuWeather class="burger_menu_icon" :color="'#01C314'" /> Погода
      </NuxtLink>
      <NuxtLink @click="$emit('closeMenu')" to="/tv">
        <IconsVisitorBurgerMenuTv class="burger_menu_icon" :color="'#01C314'" /> Телевидение
      </NuxtLink>
      <NuxtLink @click="$emit('closeMenu')" to="/radio">
        <IconsVisitorBurgerMenuRadio class="burger_menu_icon" :color="'#01C314'" /> Радио
      </NuxtLink>
      <NuxtLink @click="$emit('closeMenu')" to="/films-and-shows">
        <IconsVisitorBurgerMenuMovie class="burger_menu_icon" :color="'#01C314'" /> Кино и сериалы
      </NuxtLink>
      <NuxtLink @click="$emit('closeMenu')" to="/events">
        <IconsVisitorBurgerMenuCalendar class="burger_menu_icon" :color="'#01C314'" /> Афиша
      </NuxtLink>
      <NuxtLink @click="$emit('closeMenu')" to="/tvguide">
        <IconsVisitorBurgerMenuPk class="burger_menu_icon" :color="'#01C314'" /> Телепрограмма
      </NuxtLink>
      <NuxtLink @click="$emit('closeMenu')" to="/travel">
        <IconsVisitorBurgerMenuAirplane class="burger_menu_icon" :color="'#01C314'" /> Путешествия
      </NuxtLink>
      <NuxtLink @click="$emit('closeMenu')" to="/translate">
        <IconsVisitorBurgerMenuLanguage class="burger_menu_icon" :color="'#01C314'" /> Переводчик
      </NuxtLink>
      <NuxtLink @click="$emit('closeMenu')" to="/ai">
        <IconsVisitorBurgerMenuAi class="burger_menu_icon" :color="'#01C314'" /> Нейросети
      </NuxtLink>
      <!-- <nuxt-link to="/dev">
        <IconsVisitorBurgerMenuParther class="burger_menu_icon burger_menu_icon_disabled" /> Партнерка
      </nuxt-link> -->
      <!-- <nuxt-link @click="$emit('closeMenu')" to="/division">
      <IconsVisitorBurgerMenuDivisions class="burger_menu_icon" :color="'#01C314'" />Дивизионы
    </nuxt-link> -->
      <!-- <nuxt-link to="/dev">
            <IconsUserBurgerMenuTheBest :color="'#9B9B9B'" />Лучший!
        </nuxt-link> -->
      <!-- <nuxt-link to="/dev">
            <IconsUserBurgerMenuShop :color="'#9B9B9B'" />Магазины
        </nuxt-link> -->
      <!-- <nuxt-link to="/dev">
            <IconsVisitorBurgerMenuLeadGeneration :color="'#9B9B9B'" />Лидогенерация
        </nuxt-link> -->
      <!-- <nuxt-link to="/dev">
        <IconsUserBurgerMenuPost class="burger_menu_icon burger_menu_icon_disabled" /> Реклама
      </nuxt-link> -->
      <!-- <nuxt-link to="/dev">
            <IconsInvestment :color="'#9B9B9B'" />Инвестиции
        </nuxt-link> -->
      <!-- <nuxt-link to="/dev">
            <IconsVisitorBurgerMenuAnalytics :color="'#9B9B9B'" />Аналитика
        </nuxt-link> -->
    </div>
  </div>
</template>

<script setup>

</script>

<style lang="scss">
.visitor_burger_menu {
  .burger_item {
    width: 100%;

    a {
      display: flex;
      justify-content: flex-start;

      .burger_menu_icon {
        width: 40px;
        height: 40px;

        // path, svg, circle {
        //   fill: #01c314;
        // }

        &_disabled {
          path {
            fill: #9b9b9b;
          }
        }
      }
    }
  }
}

// .games{
//   margin-left:20px;
//   // margin-top:20px;
// }
.burger_game_icon {
  width: 40px;
  height: 40px;
  margin-right: 17px;
  align-items: center;
}

.game,
.blog {
  display: grid;
  align-items: center;
  font-size: 20px;
  cursor: pointer;
}
.blog {
  @media (min-width: $medium) {
    display: none;
  }
}

.games,
.blogs {
  display: grid;
}
// .blogs {
//   @media (min-width: $medium) {
//     display: none;
//   }
// }
// .blogPK {
//   @media (max-width: $medium) {
//     display: none;
//   }
// }
</style>
