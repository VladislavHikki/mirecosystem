<template>
  <div class="slider" ref="slider" :style="{ width: '100%' }">
    <client-only>
      <div class="images" :style="{ left: currentPos + 'px', transition: 0.3 + 's' }">
        <img
          v-for="(value, index) in images"
          :key="index"
          :src="value"
          :style="{ width: GetTrueWidth(), height: 362 + 'px' }"
        />
      </div>

      <div class="slider_elements">
        <Button class="btn_left" @click="ScrollLeft()"></Button>
        <div class="slider_content">
          <IconsLogo style="margin-bottom: 24px" />
          <div class="slider_txt">
            Вместе!<br />
            <span>КОВОРКИНГ</span>
          </div>
          <nuxt-link to="/about-project"
            ><Button label="Success" severity="success" class="slider_content_btn button-ind">О проекте</Button></nuxt-link
          >
          <div class="images_count">
            <div
              class="img_num"
              v-for="(value, index) in images"
              :key="index"
              :style="{
                backgroundColor: index == indexLine ? '#18AF10' : 'white',
                transition: '0.3s',
              }"
            ></div>
          </div>
        </div>
        <Button class="btn_right" @click="ScrollRight()"></Button>
      </div>
    </client-only>
  </div>
</template>

<script>
export default {
  created() {
    if (process.client) {
      this.GetTrueWidth(false);
    }
  },
  data() {
    return {
      currentPos: 0,
      indexLine: 0,
      images: [
        new URL('~/assets/images/slider_item.png', import.meta.url).href,
        new URL('~/assets/images/advertising.png', import.meta.url).href,
        new URL('~/assets/images/slider_item.png', import.meta.url).href,
      ],
    };
  },
  methods: {
    ScrollLeft() {
      if (this.currentPos >= 0) {
        this.currentPos = -(window.innerWidth * (this.images.length - 1));
        this.indexLine = this.images.length - 1;
      } else {
        this.currentPos += window.innerWidth;
        this.indexLine--;
      }
    },
    ScrollRight() {
      if (this.currentPos <= -(window.innerWidth * (this.images.length - 1))) {
        this.currentPos = 0;
        this.indexLine = 0;
      } else {
        this.currentPos -= window.innerWidth;
        this.indexLine++;
      }
    },
    GetTrueWidth() {
      return window.innerWidth + 'px';
    },
  },
  computed: {
    GetImg(img) {
      return require(img);
    },
  },
};
</script>

<style lang="scss">
.slider {
  width: 100%;
  height: 362px;
  overflow: hidden;
  position: relative;
  .images {
    display: flex;
    position: absolute;
    height: 362px;
    align-items: center;
    left: 0;
  }

  .slider_elements {
    position: relative;
    z-index: 3;
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: space-between;
    align-items: center;
    background: rgba(0, 0, 0, 0.45);
    .btn_left {
      background-image: url(@/assets/images/arrow_left.png);
      background-position: center center;
      background-repeat: no-repeat;
      background-color: transparent;
      box-shadow: none;
      border: none;
      height: 100%;
    }
    .btn_right {
      background-image: url(@/assets/images/arrow_right.png);
      background-position: center center;
      background-repeat: no-repeat;
      background-color: transparent;
      box-shadow: none;
      border: none;
      height: 100%;
    }

    .slider_content {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      height: 100%;
      justify-content: center;
      .slider_txt {
        font-size: 30px;
        color: white;
        text-align: center;
        line-height: 17px;
        span {
          font-size: 15px;
        }
      }
      .slider_content_btn {
        position: relative;
        z-index: 5;
      }

      .images_count {
        display: flex;
        justify-content: center;
        margin-top: 49px;
        width: 100%;
        gap: 10px;
        .img_num {
          width: 50px;
          height: 2px;
          background-color: white;
        }
      }
    }
  }
}
</style>
