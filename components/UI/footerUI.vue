<template>
  <footer>
    <div class="footer_item">
      <div class="footer_logo_container">
        <a href="/">
          <div class="footer_logo">
            <IconsLogo style="width: 60px; height: 60px" />
          </div>
          <div class="name_web">МИР</div>
          <div class="platforms"> СОЦИАЛЬНАЯ<br>ЭКОСИСТЕМА</div>
        </a>
      </div>
    </div>
    <div class="footer_item">
      <div class="linkTg">
        <a target="_blank" v-for="value in links" :href="value?.url" class="linkTg_item">
          {{ value?.label }}
        </a>
        <!-- <a target="_blank" class="linkTg_item" href="https://t.me/+8At_r2oEtg4wZTQy">Льготы и поддержка</a>
                <a target="_blank" class="linkTg_item" href="https://t.me/+qBlXwZ5t3gcwMzFi">Чат игры «Вместе!»</a>
                <a target="_blank" class="linkTg_item" href="https://t.me/+c3Tfq-8X72tjOGFi">Курсы токенов МИРа</a>
                <a target="_blank" class="linkTg_item" href="https://t.me/Neyrobotor_bot">ChatGPT (бесплатно)</a>
                <a target="_blank" class="linkTg_item" href="https://t.me/+--_Aej59u7FlYzNi">Искусственный Интеллект</a>
                <a target="_blank" class="linkTg_item" href="https://t.me/+tStM-BQMgaljMzMy">Кино и Сериалы</a>
                <a target="_blank" class="linkTg_item" href="https://t.me/+nLW0BY4BYqEzMTYy">Горячая десятка Рунета!</a>
                <a target="_blank" class="linkTg_item" href="https://t.me/+jzo0CQ70Z3o5M2Fi">Справочник каналов UD</a>
                <a target="_blank" class="linkTg_item" href="https://t.me/Gorodigest_bot">Подбор Телеграм-каналов</a> -->
      </div>
    </div>
    <div class="footer_item">
      <div class="copyright">
        <p>
          ©2023 by 2geza <br />
          All rights reserved
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { useCategoryStore } from '@/store/category';

const categoryStore = useCategoryStore();
let links = ref(null);
onMounted(async () => {
  await categoryStore.getAllLinks({type: 2});
  links.value = categoryStore.links.rows;
});

</script>

<style lang="scss" scoped>
footer {
  width: 100%;
  height: 150px;
  background: #151922;
  padding: 0 100px;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .footer_item {
    .footer_logo_container {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
      a {
        display: flex;
        flex-direction: column;
        align-items: center;
        color: white;
        .name_web {
          font-size: 24px;
        }
        .platforms {
          font-size: 13px;
        }
        .footer_logo {
          img {
            width: 60px;
            height: 60px;
          }
        }
      }
    }

    .linkTg {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 25px 100px;
      @media screen and (max-width: $medium) {
        justify-items: center;
        grid-template-columns: 1fr;
      }
      &_item {
        color: #fff;
      }
    }

    .social_media_footer {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      align-items: center;
      @media screen and (max-width: $x-small) {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
      }
    }
    .social_media_item {
      width: 33%;
      &:nth-child(even) {
        @media screen and (max-width: $x-small) {
          margin-left: 0;
        }
      }
      img {
        width: 34px;
      }
      a {
        text-decoration: none;
        color: white;
        display: flex;
        align-items: center;
        gap: 20px;
      }
    }

    .margin_top {
      margin-top: 43px;
    }

    .copyright {
      color: #bcbcbc;
    }
  }
}

@media (max-width: $x-large) {
  footer {
    height: auto;
    padding: 20px 20px;
    align-items: center;
    gap: 20px;
    flex-direction: column;
    .footer_item {
      justify-content: center;
      //flex-wrap: wrap;
      .social_media_footer {
        justify-content: center;
        flex-wrap: wrap;

        a {
          justify-content: center;
        }
      }
    }
  }
}
@media (max-width: $x-small) {
  .social_media_footer {
    flex-direction: column;
    align-items: flex-start;
    align-items: normal !important;
    //justify-content: space-between;
    gap: 20px;
    a {
      justify-content: space-between !important;
    }
  }
  footer .footer_item .margin_top {
    margin-top: 0;
  }
}
</style>
