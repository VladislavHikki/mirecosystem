<template>
  <div class="convertPoints container">
    <div class="convertPoints_item">
      <profile />
    </div>
    <div class="convertPoints_item">
      <div class="convertPoints_form">
        <select name="" id="">
          <option value="">Выберете человека</option>
        </select>
        <div class="selectPointsCount">Выберете количество баллов</div>
        <input class="pointsCount" type="number" value="0" min="0" />
      </div>
    </div>
  </div>
</template>

<script setup>
import profile from '~~/components/Blocks/profile.vue';
</script>

<style lang="scss">
.convertPoints {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 94px;
  font-size: 20px;
  .convertPoints_item:nth-child(1) {
    width: 50%;
  }
  .convertPoints_item:nth-child(2) {
    display: flex;
    justify-content: center;
    .convertPoints_form {
      display: flex;
      flex-direction: column;
      //width: 216px;
      gap: 25px;
      padding: 20px;
      border-width: 1px;
      border-style: solid;
      border: 1px solid transparent;
      border-image: linear-gradient(to bottom, #18af10, #2c96ea) 1 100%;
      border-image-slice: 1;
      select {
        background: transparent;
        padding: 18px 0;
        border-bottom: 1px solid transparent;
        border-image: linear-gradient(to bottom, #18af10, #2c96ea) 1 100%;
        border-image-slice: 1;
      }
      input {
        text-align: center;
        background: transparent;
        padding: 18px 0;
        border: 1px solid transparent;
        font-size: 20px;
        border-image: linear-gradient(to bottom, #18af10, #2c96ea) 1 100%;
        border-image-slice: 1;
      }
      .pointsCount {
        margin: 0 auto;
        height: 33px;
        width: 100px;
        padding: 10px;
      }
    }
  }
}

@media (max-width: $large) {
  .convertPoints {
    .convertPoints_item:nth-child(1) {
      width: 100%;
    }
    .personalArea {
      padding: 19px 15px !important;
    }
  }
}
</style>
